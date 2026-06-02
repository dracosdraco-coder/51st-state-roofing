import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import schemas from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: '51st State Construction',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'eofbn9x8',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemas },
  basePath: '/studio',
});
