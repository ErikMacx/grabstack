// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://grabstack.com',
  integrations: [react(), sitemap(), mdx()],

  vite: {
    plugins: [tailwindcss()]
  }
});