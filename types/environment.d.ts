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
