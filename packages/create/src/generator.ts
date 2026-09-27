import fs from 'fs';
import path from 'path';
import copy from 'recursive-copy';
import { Transform } from 'stream';
import { ClassDeclaration, Project, Statement, SyntaxKind } from 'ts-morph';
import { Properties, Property } from './properties';

export interface data {
  cliSource: string;
  name: string;
  primitiveTypes: string[];
  properties: Properties;
  seedSource: string;
  tag: string;
}

// Name/tag of the real, buildable/testable example component that ships as
// `@nutmeg/element-template`; copied wholesale and then customized below.
const originName = 'ExampleComponent';
const originTag = 'example-component';
const exampleProperties = [
  'exampleNumber',
  'exampleString',
  'exampleBoolean',
  'exampleProperty',
];

export class Generator {
  private workingDir: string;
  private tag: string;
  private data: data | undefined;

  constructor(_nutmegDir: string, workingDir: string, tag: string) {
    this.workingDir = workingDir;
    this.tag = tag;
  }

  public get destinationDirExists(): boolean {
    return fs.existsSync(this.destinationDir);
  }

  public async execute(data: data): Promise<void> {
    this.data = data;
    const results = await copy(this.templateDir, this.destinationDir, {
      overwrite: true,
      dot: true,
      filter: [
        '**/*',
        '!node_modules',
        '!node_modules/**',
        '!dist',
        '!dist/**',
      ],
      rename: this.rename.bind(this),
      transform: this.transform.bind(this),
    });
    console.info(`🖨️  Generating component with ${results.length} files`);
    this.rewritePackageJson();
    this.rewriteComponentSource();
    this.rewriteComponentTest();
  }

  /** Resolve `@nutmeg/element-template`'s installed location via normal Node resolution. */
  private get templateDir(): string {
    return path.dirname(
      require.resolve('@nutmeg/element-template/package.json'),
    );
  }

  private get destinationDir(): string {
    return path.resolve(this.workingDir, this.tag);
  }

  private rename(filePath: string): string {
    return filePath.replace(originTag, this.tag);
  }

  /** Swap the example component's name/tag for the requested ones in every copied file. */
  private transform(): Transform {
    const tag = this.tag;
    const name = (this.data as data).name;
    return new Transform({
      transform(chunk: Buffer, _enc, done) {
        const content = chunk
          .toString()
          .split(originTag)
          .join(tag)
          .split(originName)
          .join(name);
        done(null, content);
      },
    });
  }

  /** Patch the fields a plain rename can't compute: package name, dependency versions. */
  private rewritePackageJson(): void {
    const data = this.data as data;
    const packagePath = path.resolve(this.destinationDir, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(packagePath).toString());
    pkg.name = data.tag;
    pkg.version = '0.1.0';
    delete pkg.publishConfig;
    pkg.scripts.prepare = 'npm run build';
    pkg.dependencies['@nutmeg/seed'] = data.seedSource;
    pkg.devDependencies['@nutmeg/cli'] = data.cliSource;
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');
  }

  /** Replace the example component's demo properties with the requested ones. */
  private rewriteComponentSource(): void {
    const data = this.data as data;
    const sourcePath = path.resolve(
      this.destinationDir,
      'src',
      `${data.tag}.ts`,
    );
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(sourcePath);
    const classDeclaration = sourceFile.getClassOrThrow(data.name);

    exampleProperties.forEach((name) => {
      classDeclaration.getPropertyOrThrow(name).remove();
    });
    data.properties.properties
      .slice()
      .reverse()
      .forEach((property) => {
        classDeclaration.insertMember(0, propertySource(property));
      });

    this.rewriteDemoList(classDeclaration, data.properties);

    project.saveSync();
  }

  /** Rebuild the `<ul>` demo list inside `template` to list the requested primitive properties. */
  private rewriteDemoList(
    classDeclaration: ClassDeclaration,
    properties: Properties,
  ): void {
    const template = classDeclaration
      .getGetAccessorOrThrow('template')
      .getFirstDescendantByKindOrThrow(SyntaxKind.TaggedTemplateExpression);
    const items = properties.primitive
      .map(
        (property) =>
          `          <li>${property.name}: \${this.${property.name}}</li>`,
      )
      .join('\n');
    const newText = template
      .getText()
      .replace(/<ul>[\s\S]*?<\/ul>/, `<ul>\n${items}\n        </ul>`);
    template.replaceWithText(newText);
  }

  /** Replace the example component's demo tests with ones for the requested properties. */
  private rewriteComponentTest(): void {
    const data = this.data as data;
    const testPath = path.resolve(
      this.destinationDir,
      'test',
      `${data.tag}.test.ts`,
    );
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(testPath);
    const outerDescribe = sourceFile
      .getDescendantsOfKind(SyntaxKind.CallExpression)
      .find((call) => call.getExpression().getText() === 'describe');
    const body = outerDescribe!
      .getArguments()[1]
      .asKindOrThrow(SyntaxKind.ArrowFunction)
      .getBody()
      .asKindOrThrow(SyntaxKind.Block);

    const statements = body.getStatements();
    const exampleStatements = exampleProperties
      .map((name) =>
        statements.find((statement: Statement) =>
          statement.getText().includes(`describe('${name}'`),
        ),
      )
      .filter((statement): statement is NonNullable<typeof statement> =>
        Boolean(statement),
      );
    const insertIndex = exampleStatements[0].getChildIndex();
    exampleStatements.forEach((statement) => statement.remove());

    const blocks = data.properties.properties
      .map((property) => propertyTestSource(property, data.tag))
      .join('');
    if (blocks) {
      body.insertStatements(insertIndex, blocks);
    }

    project.saveSync();
  }
}

/** Class member source for a requested property, matching the example component's style. */
function propertySource(property: Property): string {
  if (property.primitive) {
    const ctor = { boolean: 'Boolean', number: 'Number', string: 'String' }[
      property.type
    ];
    return `  @property({ type: ${ctor} }) accessor ${property.name}: ${property.type} = ${property.tmplValue};\n`;
  }
  return `  @property() accessor ${property.name}: ${property.type} | undefined;\n`;
}

/** Test block source for a requested property, matching the example component's style. */
function propertyTestSource(property: Property, tag: string): string {
  let attribute = '';
  if (property.type === 'boolean') {
    attribute = ` ${property.attribute}`;
  } else if (property.type === 'number' || property.type === 'string') {
    attribute = ` ${property.attribute}="${property.value}"`;
  }
  const complexNote = property.primitive
    ? ''
    : `\n      /** Set typical complex property. */\n      // component.${property.name} = ${property.type}`;
  const assertionPrefix = property.primitive ? '' : '// ';
  return `
  describe('${property.name}', () => {
    beforeEach(async () => {
      component = fixture('<${tag}${attribute}></${tag}>');${complexNote}
      await component.updateComplete;
    });

    it('is rendered', () => {
      ${assertionPrefix}expect(component.$('.content').innerText).toContain('${property.name}: ${property.value}');
    });
  });
`;
}
