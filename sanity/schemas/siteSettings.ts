export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Contact & Business' },
    { name: 'homepage', title: 'Homepage Copy' },
    { name: 'services', title: 'Service Sections' },
    { name: 'social', title: 'Social & Links' },
  ],
  fields: [
    // ── Contact & Business ──────────────────────────────────────
    {
      name: 'phone',
      title: 'Phone Number (Florida)',
      type: 'string',
      group: 'contact',
    },
    {
      name: 'phoneNC',
      title: 'Phone Number (North Carolina)',
      type: 'string',
      group: 'contact',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
    },
    {
      name: 'address',
      title: 'Physical Address (Florida)',
      type: 'string',
      group: 'contact',
    },
    {
      name: 'addressNC',
      title: 'Physical Address (North Carolina)',
      type: 'string',
      group: 'contact',
    },
    {
      name: 'licenseNumber',
      title: 'License Number (Florida)',
      type: 'string',
      group: 'contact',
    },
    {
      name: 'licenseNumberNC',
      title: 'License Number (North Carolina)',
      type: 'string',
      group: 'contact',
    },
    {
      name: 'googleReviewLink',
      title: 'Google Review Link',
      type: 'url',
      group: 'contact',
    },

    // ── Homepage Copy ───────────────────────────────────────────
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      group: 'homepage',
      description: 'Main headline shown on the homepage hero.',
    },
    {
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 3,
      group: 'homepage',
    },
    {
      name: 'heroPrimaryCTALabel',
      title: 'Hero Primary CTA Label',
      type: 'string',
      group: 'homepage',
    },
    {
      name: 'heroSecondaryCTALabel',
      title: 'Hero Secondary CTA Label',
      type: 'string',
      group: 'homepage',
    },
    {
      name: 'servicesSectionTitle',
      title: 'Services Section Title',
      type: 'string',
      group: 'homepage',
    },
    {
      name: 'servicesSectionBody',
      title: 'Services Section Body',
      type: 'text',
      rows: 3,
      group: 'homepage',
    },
    {
      name: 'whyChooseTitle',
      title: '"Why Choose Us" Section Title',
      type: 'string',
      group: 'homepage',
    },
    {
      name: 'whyChooseBody',
      title: '"Why Choose Us" Body',
      type: 'text',
      rows: 3,
      group: 'homepage',
    },

    // ── Service Page Copy ───────────────────────────────────────
    {
      name: 'servicePages',
      title: 'Service Page Copy',
      type: 'array',
      group: 'services',
      description: 'Hero and CTA copy for each service page. Add one entry per page.',
      of: [
        {
          type: 'object',
          name: 'servicePage',
          title: 'Service Page',
          fields: [
            {
              name: 'pageKey',
              title: 'Page Key',
              type: 'string',
              description: 'Matches the URL slug (e.g. "commercial-roofing", "concrete-restoration")',
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
              name: 'heroHeadline',
              title: 'Hero Headline',
              type: 'string',
            },
            {
              name: 'heroSubheadline',
              title: 'Hero Subheadline',
              type: 'text',
              rows: 3,
            },
            {
              name: 'ctaLabel',
              title: 'Primary CTA Label',
              type: 'string',
            },
            {
              name: 'bodyCopy',
              title: 'Body Copy',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
          preview: {
            select: { title: 'pageKey', subtitle: 'heroHeadline' },
          },
        },
      ],
    },

    // ── Social & Links ──────────────────────────────────────────
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      group: 'social',
      fields: [
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'googleBusiness', type: 'url', title: 'Google Business Profile' },
      ],
    },
  ],
};
