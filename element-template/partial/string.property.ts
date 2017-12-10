  get <%= name %>(): string | null {
    return this.getAttribute('<%= name %>');
  }

  set <%= name %>(value: string | null) {
    if (value) {
      this.setAttribute('<%= name %>', value);
    } else {
      this.removeAttribute('<%= name %>');
    }
  }
