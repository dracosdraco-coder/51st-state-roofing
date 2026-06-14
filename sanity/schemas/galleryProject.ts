export default {
  name: 'galleryProject',
  title: 'Gallery Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      options: {
        list: [
          { title: 'Commercial Roofing', value: 'commercial-roofing' },
          { title: 'Metal Roofing', value: 'metal-roofing' },
          { title: 'TPO Roofing', value: 'tpo-roofing' },
          { title: 'Roof Inspection', value: 'roof-inspection' },
          { title: 'Concrete Restoration', value: 'concrete-restoration' },
          { title: 'General Contracting', value: 'general-contracting' },
        ],
      },
    },
    {
      name: 'market',
      title: 'Market',
      type: 'string',
      options: {
        list: [
          { title: 'Florida', value: 'FL' },
          { title: 'North Carolina', value: 'NC' },
          { title: 'Both Markets', value: 'NATIONAL' },
        ],
      },
    },
    {
      name: 'location',
      title: 'Location (City, State)',
      type: 'string',
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'beforeImage',
      title: 'Before Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'afterImage',
      title: 'After Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
  },
};
