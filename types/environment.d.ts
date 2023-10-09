export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      maxid: number;
      totalPokemon: number;
      ENV: "test" | "dev" | "prod";
    }
  }
}

declare global {
  interface Window {
    env: any
  }
}
