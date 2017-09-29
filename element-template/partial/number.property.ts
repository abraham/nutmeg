  get <%= name %>(): number {
    if (this.hasAttribute('<%= name %>')) {
      return Number(this.getAttribute('<%= name %>'));
    } else {
      return null;
    }
  }

  set <%= name %>(value: number) {
    if (value) {
      this.setAttribute('<%= name %>', String(value));
    } else {
      this.removeAttribute('<%= name %>');
    }
  }
