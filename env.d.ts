declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string;
      DB_HOST: string;
      DB_DATABASE: string;
    }
  }
}

export {};
