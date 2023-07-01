import { defineConfig } from 'astro/config';


// https://astro.build/config
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: node({
    mode: 'standalone'
  })
});