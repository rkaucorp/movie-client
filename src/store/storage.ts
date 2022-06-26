import cookie from "js-cookie";

export const setCookie = (key: string, value: string): void => {
  cookie.set(key, value, {
    expires: 1
  });
};

export const removeCookie = (key: string): void => {
  cookie.remove(key, {
    expires: 1
  });
};

export const getCookie = (key: string): string => {
  return cookie.get(key) || "";
};

export const setLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

export const authenticate = (response: any, next: () => void) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

export const isAuth = () => {
  const cookieChecked = getCookie("token");
  if (cookieChecked) {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } else {
      return false;
    }
  }
};

export const signout = () => {
  removeCookie("token");
  removeLocalStorage("user");
  window.location.href = "/";
};
