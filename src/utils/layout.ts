import { lazy } from "react";

export const lazyImport = (module: any) => {
  return lazy(() =>
    Promise.all([
      module,
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]).then(([moduleExports]) => moduleExports)
  );
};
