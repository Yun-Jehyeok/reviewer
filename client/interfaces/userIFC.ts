export interface userIFC {
  name: string;
  email: string;
  id: string;
  token: string;
}

export interface signinIFC {
  email: string;
  password: string;
}

export interface signupIFC {
  email: string;
  password: string;
  name: string;
  phone: string;
  nickname: string;
}

export interface authIFC {
  id: string;
}
