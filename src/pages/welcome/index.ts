import { lazyImport } from "@thor/utils/layout";

const Welcome = lazyImport(import("./welcome.container"));

export default Welcome;
