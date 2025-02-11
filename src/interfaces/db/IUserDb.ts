import { IDbDocumentDefault } from "./defaultDbProperties";

export default interface IUserDb extends IDbDocumentDefault {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  photo?: string;
}

export interface INewUserPost {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword?: string;
}
