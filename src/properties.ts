export interface Property {
  name: string;
  type: Primative;
  value: string | number | boolean | null;
}

export type Primative = 'boolean' | 'number' | 'string';

export class Properties {
  public properties: Property[];
  public primitiveTypes: Primative[] = ['boolean', 'number', 'string'];
  private defaultValues = {
    string: 'Pickle',
    number: 42,
    boolean: true
  }

  constructor(requestedProperties: string[]) {
    this.properties = this.parseProperties(requestedProperties);
  }

  public get complex(): Property[] {
    return this.properties.filter(attr => !this.primitiveTypes.includes(attr.type));
  }

  public get primitive(): Property[] {
    return this.properties.filter(attr => this.primitiveTypes.includes(attr.type));
  }

  public get valid(): boolean {
    return this.properties.every(this.validProperty);
  }

  private validProperty(property: Property): boolean {
    return typeof property.name === 'string' && typeof property.type === 'string'
      && property.name.length > 0 && property.type.length > 0;
  }

  private split(property: string): [string, Primative] {
    return property.split(':') as [string, Primative];
  }

  private parseProperties(properties: string[]): Property[] {
    return properties.map((property) => {
      const [name, type] = this.split(property);
      return {
        name: name,
        type: type,
        value: this.defaultValues[type],
      };
    })
  }
}
