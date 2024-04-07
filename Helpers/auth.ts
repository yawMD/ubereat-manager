import cookie from "js-cookie";

export const setCookie = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key: string) => {
  if (typeof window !== "undefined") {
    cookie.remove(key);
  }
};

export const getCookie = (key: string) => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
};

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const authenticate = (response: any, next: any) => {
  setCookie("jwt-session", response.token);
  setLocalStorage("admin", response); // Assuming user data is directly in the response
  next();
};

export const signout = (next: any) => {
  removeCookie("jwt-session");
  removeLocalStorage("admin");
  next();
};

export const isAuth = () => {
  if (typeof window !== "undefined") {
    const cookieChecked = getCookie("jwt-session");
    if (cookieChecked) {
      if (localStorage.getItem("admin")) {
        return JSON.parse(localStorage.getItem("admin")!);
      } else {
        return false;
      }
    }
  }
};

export const updateUser = (response: any, next: any) => {
  if (typeof window !== "undefined") {
    const userData = JSON.parse(localStorage.getItem("admin")!);
    userData.token = response.token;
    localStorage.setItem("admin", JSON.stringify(userData));
  }
  next();
};
