export const productSchema = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Model',
      type: 'string',
    },
    {
      name: 'sku',
      title: 'SKU / ID',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Sofa', value: 'sofa' },
          { title: 'Bed', value: 'bed' },
          { title: 'Dining', value: 'dining' },
          { title: 'Lounge', value: 'lounge' },
        ],
      },
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'material_en',
      title: 'Material (EN)',
      type: 'string',
    },
    {
      name: 'material_uz',
      title: 'Material (UZ)',
      type: 'string',
    },
    {
      name: 'material_ru',
      title: 'Material (RU)',
      type: 'string',
    },
    {
      name: 'material_kz',
      title: 'Material (KZ)',
      type: 'string',
    },
    {
      name: 'material_zh',
      title: 'Material (ZH)',
      type: 'string',
    },
    {
      name: 'description_en',
      title: 'Description (EN)',
      type: 'text',
    },
    {
      name: 'description_uz',
      title: 'Description (UZ)',
      type: 'text',
    },
    {
      name: 'description_ru',
      title: 'Description (RU)',
      type: 'text',
    },
    {
      name: 'description_kz',
      title: 'Description (KZ)',
      type: 'text',
    },
    {
      name: 'description_zh',
      title: 'Description (ZH)',
      type: 'text',
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0'
    }
  }
};

export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
    },
    {
      name: 'homeHeroTitle',
      title: 'Home Hero Title',
      type: 'string',
    },
    {
      name: 'homeHeroSubtitle',
      title: 'Home Hero Subtitle',
      type: 'string',
    },
    {
      name: 'homeHeroImage',
      title: 'Home Banner Image',
      type: 'image',
    },
    {
      name: 'aboutUsText',
      title: 'About Us Text',
      type: 'text',
    }
  ]
};

export const schemaTypes = [productSchema, siteSettingsSchema];
