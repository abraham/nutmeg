import pascalCase = require('pascal-case')
import path = require('path');

export class Component {
  public tag: string;

  constructor(tag: string) {
      this.tag = tag;
  }

  public static tagFromPath(workingDir: string): string {
    return workingDir.split(path.sep)[workingDir.split(path.sep).length - 1];
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
