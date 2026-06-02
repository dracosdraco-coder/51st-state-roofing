export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'pageKey',
      title: 'Page',
      type: 'string',
      description: 'Which page this FAQ appears on.',
      options: {
        list: [
          { title: 'TPO Roofing', value: 'tpo-roofing' },
          { title: 'Metal Roofing', value: 'metal-roofing' },
          { title: 'Commercial Roofing', value: 'commercial-roofing' },
          { title: 'Roof Inspection', value: 'roof-inspection' },
          { title: 'Concrete Restoration', value: 'concrete-restoration' },
          { title: 'Millwork & Interiors', value: 'millwork-interiors' },
          { title: 'General Contracting', value: 'general-contracting' },
          { title: 'Florida', value: 'florida' },
          { title: 'North Carolina', value: 'north-carolina' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first.',
    },
  ],
  orderings: [
    {
      title: 'Page, then Order',
      name: 'pageOrder',
      by: [
        { field: 'pageKey', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'question', subtitle: 'pageKey' },
  },
};
