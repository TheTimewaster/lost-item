import type * as AppWrite from 'appwrite';

export enum ItemStatus {
  ACTIVE,
  LOST,
  LOST_FOREVER,
  FOUND,
}

export interface Item extends AppWrite.Models.Document {
  status: ItemStatus
  name: string
  description?: string
}
