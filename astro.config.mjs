import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  buildOptions: {
    site: "https://emmayuel80.github.io",
    base: "new-tab",
  },
});
