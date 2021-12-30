declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      CLIENT_ID: string;
      OWNER_ID: string;
    }
  }
}

export {};
