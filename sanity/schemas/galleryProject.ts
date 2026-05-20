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
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'TPO Roofing', value: 'tpo' },
          { title: 'Metal Roofing', value: 'metal' },
          { title: 'Flat Roof', value: 'flat' },
          { title: 'Inspection', value: 'inspection' },
        ],
      },
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
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
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
    },
  ],
};
