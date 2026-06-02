export default {
  name: 'serviceArea',
  title: 'Service Area',
  type: 'document',
  fields: [
    {
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'state',
      title: 'State',
      type: 'string',
      initialValue: 'FL',
    },
    {
      name: 'market',
      title: 'Market',
      type: 'string',
      options: {
        list: [
          { title: 'Florida', value: 'FL' },
          { title: 'North Carolina', value: 'NC' },
          { title: 'National', value: 'NATIONAL' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'googleBusinessLocationId',
      title: 'Google Business Location ID',
      type: 'string',
      description: 'From GBP dashboard → Business info. Used to attribute leads to the correct listing.',
    },
    {
      name: 'county',
      title: 'County',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'city' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    },
    {
      name: 'bodyContent',
      title: 'Body Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'city',
      subtitle: 'market',
    },
  },
};
