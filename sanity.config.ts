import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/schemaTypes';

// Use a specific Sanity project ID
const projectId = 'e6yjw47z';
const dataset = 'production';

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
