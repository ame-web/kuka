import { products as fallbackProducts } from '../src/products';

export default async function handler(req: any, res: any) {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e6yjw47z';
  const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

  try {
    const rawResponse = await fetch(`https://${projectId}.api.sanity.io/v2023-05-03/data/query/${dataset}?query=*%5B_type%3D%3D%22product%22%5D%7B...%2Cimages%5B%5D-%3E%2Ccategory-%3E%7D`);
    const json = await rawResponse.json();
    const rawProducts = json.result || [];
    
    if (rawProducts.length === 0) {
      return res.status(200).json(fallbackProducts);
    }

    const mapped = rawProducts.map((p: any) => {
      const fallback = fallbackProducts.find(fp => fp.id.replace('-', '.') === p.sku || fp.model.includes(p.sku) || fp.id === p._id);
      const images: string[] = [];
      if (p.image?.asset?._ref) {
        const [, id, dimension, extension] = p.image.asset._ref.split('-');
        images.push(`https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimension}.${extension}`);
      }
      
      let category = 'sofa';
      if (p.category?.slug?.current === 'krovatlar') category = 'bed';
      if (p.category?.slug?.current === 'divanlar') category = 'sofa';
      if (p.category?.slug?.current === 'oshxona') category = 'dining';
      
      return {
        id: p.sku || p._id,
        model: p.name?.uz || p.sku || 'Unknown',
        category: category,
        images: images.length > 0 ? images : fallback?.images || [],
        dimensions: p.dimensions || fallback?.dimensions || 'Unknown',
        price: p.price || fallback?.price || 0,
        featured: p.hero || false,
        newArrival: true,
        material: {
          uz: (p.materials?.uz || []).join(', ') || fallback?.material?.uz || '',
          kz: (p.materials?.kz || []).join(', ') || fallback?.material?.kz || '',
          ru: (p.materials?.ru || []).join(', ') || fallback?.material?.ru || '',
          en: (p.materials?.en || []).join(', ') || fallback?.material?.en || '',
          zh: (p.materials?.cn || []).join(', ') || fallback?.material?.zh || ''
        },
        info: {
          uz: p.description?.uz || fallback?.info?.uz || '',
          kz: p.description?.kz || fallback?.info?.kz || '',
          ru: p.description?.ru || fallback?.info?.ru || '',
          en: p.description?.en || fallback?.info?.en || '',
          zh: p.description?.cn || fallback?.info?.zh || ''
        }
      };
    });
    
    res.status(200).json(mapped);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
