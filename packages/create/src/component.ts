import path from 'path';
import { loadPackageJson } from './utils';
import { pascalCase } from 'pascal-case';

export class Component {
  public tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  public static tagFromPackage(workingDir: string): string {
    const { main } = loadPackageJson(workingDir);
    return path.parse(main).name;
  }

  public get valid(): boolean {
    return (
      0 < this.tag.indexOf('-') &&
      this.tag.indexOf('-') < this.tag.length - 1 &&
      this.tag === this.tag.toLowerCase()
    );
  }

  public get name(): string {
    return pascalCase(this.tag);
  }
}
