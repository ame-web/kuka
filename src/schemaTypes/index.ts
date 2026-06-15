export const productSchema = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'model',
      title: 'Model',
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
  ],
};

export const schemaTypes = [productSchema];
