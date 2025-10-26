import type { Config } from "tailwindcss";

// eslint-disable-next-line @typescript-eslint/no-var-requires -- rely on compiled tailwind config
const baseConfig = require("./tailwind.config");

export default baseConfig as Config;
