export interface IRegister {
  name: string | null;
  email: string | null;
  password: string | null;
  repassword: string | null;
}
export interface ILogin {
  email: string | null;
  password: string | null;
}
