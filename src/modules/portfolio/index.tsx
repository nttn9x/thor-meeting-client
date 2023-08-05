import { lazyImport } from "@thor/utils/layout";

const Portfolio = lazyImport(import("./portfolio-main.container"));

export default Portfolio;
