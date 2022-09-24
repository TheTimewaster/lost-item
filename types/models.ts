import type * as AppWrite from 'appwrite';

declare namespace QuyModels {
  export enum ItemStatus {
    ACTIVE,
    LOST,
    LOST_FOREVER,
    FOUND,
  }

  export interface Item extends AppWrite.Models.Document {
    oid: string
    status: ItemStatus
    name: string
  }
}

export default QuyModels;
