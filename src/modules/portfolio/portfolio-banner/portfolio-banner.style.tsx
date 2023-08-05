import clsx from "clsx";

export const getContainerStyle = (mask?: boolean) => {
  return clsx(
    "w-full px-20 lg:px-44 py-52 flex flex-col items-center justify-center",
    {
      "bg-stone-200 dark:bg-stone-950/50": !mask,
    }
  );
};

export const body = "flex flex-col md:flex-row gap-6 w-full h-full";

// Info
export const infoContainer =
  "flex-auto lg:w-64 xl:w-72 flex flex-col gap-3 justify-center";
export const infoContent =
  "text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold";
export const infoContentHover = `${infoContent} text-white`;
