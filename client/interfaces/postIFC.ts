export interface postIFC {
  _id: string;
  title: string;
  content: string;
  register_date: string;
  lang: string[];
  price: Number;
  creator: string;
}

export interface registerPostIFC {
  userId: string;
  title: string;
  content: string;
  lang: string[];
  price: number;
}