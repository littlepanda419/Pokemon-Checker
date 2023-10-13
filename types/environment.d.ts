export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MAXID: number;
      ENV: "test" | "dev" | "prod";
    }
  }
}
