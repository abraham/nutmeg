declare module 'latest-version' {
  declare const latestVersion: (name: string, options?: any) => Promise<string>;
  export = latestVersion;
}
