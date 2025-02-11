export interface IDbDocumentDefault {
  _id: string;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted?: Boolean;
  createdBy?: string;
  updatedBy?: string;
}
