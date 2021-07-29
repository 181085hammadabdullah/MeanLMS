export class UserModel {
  // tslint:disable-next-line: variable-name
  _id: string;
  email: string;
  password: string;

}

export class LoginResponse {
  // tslint:disable-next-line: variable-name
  _id: string;
  success: boolean;
  message: string;
  user: string;
  token: string;
  email: string;
  name: string;
}

export class UserModels {
  // tslint:disable-next-line: variable-name
  _id: string;
  email: string;
  password: string;
}

export class SignupResponse {
  success: boolean;
  message: string;
}

