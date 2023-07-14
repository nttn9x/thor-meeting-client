export enum ThemMode {
  Dark = "dark",
  Light = "light",
}

export const getMode = () => {
  return localStorage.getItem("theme_mode") || ThemMode.Dark;
};

export const setMode = (value: string) => {
  return localStorage.setItem("theme_mode", value);
};
