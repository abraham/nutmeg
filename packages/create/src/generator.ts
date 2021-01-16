import fs from 'fs';
import path from 'path';
import copy from 'recursive-copy';
import through from 'through2';
import { Properties } from './properties';
import template = require('lodash.template');

export interface data {
  name: string;
  tag: string;
  properties: Properties;
  primitiveTypes: string[];
}

export class Generator {
  private nutmegDir: string;
  private workingDir: string;
  private tag: string;
  private data: data | undefined;
  private originTag = 'element-template';
  private fileFilter = ['**/*', '!partial', '!partial/*'];

  constructor(nutmegDir: string, workingDir: string, tag: string) {
    this.nutmegDir = nutmegDir;
    this.workingDir = workingDir;
    this.tag = tag;
  }

  public get destinationDirExists(): boolean {
    return fs.existsSync(this.destinationDir);
  }

  public execute(data: data) {
    this.data = data;
    return copy(this.templateDir, this.destinationDir, this.copyOptions)
      .on(copy.events.COPY_FILE_START, (_copyOperation: any) => {
        // console.info('Copying file ' + this.trimFilename(copyOperation.dest));
      })
      .on(copy.events.ERROR, (_error: object, copyOperation: any) => {
        console.error(
          'Unable to copy ' + this.trimFilename(copyOperation.dest)
        );
      })
      .then((results: object[]) => {
        console.info(`🖨️  Generating component with ${results.length} files`);
      });
  }

  private get copyOptions(): {} {
    return {
      overwrite: true,
      dot: true,
      filter: this.fileFilter,
      rename: this.rename.bind(this),
      transform: this.transform.bind(this),
    };
  }

  private get templateOptions(): {} {
    return {
      interpolate: /<%=([\s\S]+?)%>/g,
      imports: {
        partial: (partialName: string, data: object) => {
          let partial = fs
            .readFileSync(this.partialPath(partialName))
            .toString();
          return template(partial, this.templateOptions)(data);
        },
      },
    };
  }

  private partialPath(partialName: string) {
    return path.resolve(this.templateDir, 'partial', partialName);
  }

  private get templateDir(): string {
    return path.resolve(this.nutmegDir, this.originTag);
  }

  private get destinationDir(): string {
    return path.resolve(this.workingDir, this.tag);
  }

  private trimFilename(filePath: string): string {
    return filePath.split(`${this.workingDir}${path.sep}`)[1];
  }

  private transform(_src: string, _dest: string, _stats: object) {
    return through((chunk: string, _enc: string, done: any) => {
      done(null, template(chunk, this.templateOptions)(this.data));
    });
  }

  private dotFile(filePath: string): boolean {
    return ['gitignore', 'travis.yml', 'appveyor.yml'].includes(filePath);
  }

  private rename(filePath: string) {
    if (this.dotFile(filePath)) {
      return `.${filePath}`;
    }
    return filePath.replace(this.originTag, this.tag);
  }
}
