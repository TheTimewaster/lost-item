declare module 'nuxt/schema' {
  interface AppConfigInput {
    appwrite: {
      endpoint: string
      application: string
      databaseId: string
      collectionId: string
    }
  }
}

export {};