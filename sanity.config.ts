import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/schemaTypes';

// Use a specific Sanity project ID
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'e6yjw47z';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

export default defineConfig({
  basePath: '/admin',
  name: 'default',
  title: 'KUKA Home Admin',

  projectId,
  dataset,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
