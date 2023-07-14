export enum ThemMode {
  Dark = "dark",
  Light = "light",
}

export const getThemeMode = () => {
  return localStorage.getItem("theme_mode") || ThemMode.Dark;
};

export const setThemeMode = (value: string) => {
  return localStorage.setItem("theme_mode", value);
};
