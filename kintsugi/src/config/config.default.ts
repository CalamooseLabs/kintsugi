export const defaultConfig: KintsugiConfig.DefaultAppConfig = {
  version: "1.0.0",
  remoteMap: {},
  basePath: "/_federation",
  skipConsumer: false,
  skipProvider: false,
  cacheTime: 60000,
  hostname: "localhost",
  port: 8000,
  imports: [],
  importMap: {},
  compilerOptions: {},
  configLocation: "./deno.json",
  federation: {
    nexus: "",
    autoDiscovery: true,
    apiKey: "",
    name: "",
  },
  plugins: [],
};