declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MAXID: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};