  get <%= name %>(): string {
    return this.getAttribute('<%= name %>');
  }

  set <%= name %>(value: string) {
    if (value) {
      this.setAttribute('<%= name %>', value);
    } else {
      this.removeAttribute('<%= name %>');
    }
  }
