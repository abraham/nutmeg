import pascalCase = require('pascal-case')
import path = require('path');

import { loadPackageJson } from './utils';

export class Component {
  public tag: string;

  constructor(tag: string) {
      this.tag = tag;
  }

  public static tagFromPackage(workingDir: string): string {
    const meta = loadPackageJson(workingDir);
    return path.parse(meta.main).name;
  }

  public get valid(): boolean {
    return 0 < this.tag.indexOf('-')
      && this.tag.indexOf('-') < this.tag.length - 1
      && this.tag === this.tag.toLowerCase();
  }

  public get name(): string {
    return pascalCase(this.tag);
  }
}
