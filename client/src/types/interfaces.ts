export interface TamplateI {
  _id?: string;
  imageBuffer?: ArrayBuffer;
  name: string;
  imageUrl?: string;
}

export interface UserI {
  email: string;
  isAuthenticated: boolean;
  token: string | null;
}
