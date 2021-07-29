export class AdminModel {
  // tslint:disable-next-line: variable-name
  _id: string;
  email: string;
  password: string;

}

export class AdminLoginResponse {
  // tslint:disable-next-line: variable-name

  success: boolean;
  message: string;
  user: {
    email: string;
    name: string;
    _id: string;
  };
  token: string;

}

export class AdminModels {
  // tslint:disable-next-line: variable-name
  _id: string;
  email: string;
  password: string;
}

export class AdminSignupResponse {
  success: boolean;
  message: string;
}
