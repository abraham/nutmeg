  get <%= name %>(): boolean {
    return this.hasAttribute('<%= name %>');
  }

  set <%= name %>(value: boolean) {
    if (value) {
      this.setAttribute('<%= name %>', '');
    } else {
      this.removeAttribute('<%= name %>');
    }
  }
