  get <%= name %>(): number | null {
    if (this.hasAttribute('<%= name %>')) {
      return Number(this.getAttribute('<%= name %>'));
    } else {
      return null;
    }
  }

  set <%= name %>(value: number | null) {
    if (value) {
      this.setAttribute('<%= name %>', String(value));
    } else {
      this.removeAttribute('<%= name %>');
    }
  }
