// @ts-self-types="./loader.d.ts"

/**
 * The Loader class is responsible for loading the modules from the producer servers.
 * It will try to determine the best way to load the modules based on the configuration.
 */
class Loader {
  #aliasMap: Map<string, Loader.AliasMapKey>;

  constructor() {
    // this.#islandRegistry = new Map();
    this.#aliasMap = new Map();
  }
}

export { Loader };
