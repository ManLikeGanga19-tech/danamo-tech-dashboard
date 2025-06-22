import { Client, Account, Databases } from 'appwrite'

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // https://fra.cloud.appwrite.io/v1
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!) // 683f526a00026ee792d0

export const account = new Account(client)
export const databases = new Databases(client)
