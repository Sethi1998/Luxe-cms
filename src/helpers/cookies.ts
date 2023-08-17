import Cookies from "universal-cookie";
const cookies = new Cookies();
export const setCookies = (name: string, value: string) => {
  cookies.set(name, value);
};
export const getCookies = (name:string)=>{
return cookies.get(name)
}