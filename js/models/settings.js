export class Settings {
  constructor(theme, firstRun) {
    this.theme = theme;
    this.firstRun = firstRun;
  }

  toJson() {
    return {
      theme: this.theme,
      firstRun: this.firstRun,
    }
  }
}