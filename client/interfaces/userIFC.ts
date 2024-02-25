export interface userIFC {
  _id: string;
  reputation: number;
  register_date: string;
  profile_img: string;
  posts: string[];
  point: number;
  phone: string;
  nickname: string;
  name: string;
  login_way: string;
  lang: string[];
  isSubmit: boolean;
  grade: string;
  getApplications: string[];
  email: string;
  applications: string[];
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

export interface phoneIFC {
  phone: string;
}
