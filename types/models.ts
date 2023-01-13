import type * as AppWrite from 'appwrite';

export enum ItemStatus {
  ACTIVE,
  LOST,
  FOUND,
  LOST_FOREVER,
}

export interface Item extends AppWrite.Models.Document {
  status: ItemStatus
  name: string
  description?: string
}
