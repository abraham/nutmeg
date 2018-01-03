import pascalCase = require('pascal-case')

export class Component {
  public tag: string;

  constructor(tag: string) {
      this.tag = tag;
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
