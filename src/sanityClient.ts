import { Product } from './types';
import { products as fallbackProducts } from './products';

export async function getSanityProducts(): Promise<Product[]> {
  const projectId = import.meta.env?.VITE_SANITY_PROJECT_ID || 'e6yjw47z';
  const dataset = import.meta.env?.VITE_SANITY_DATASET || 'production';

  try {
    const query = '*[_type=="product"]{...,images[]->,category->}';
    const baseUrl = `https://${projectId}.api.sanity.io/v2023-05-03/data/query/${dataset}`;
    const url = `${baseUrl}?query=${encodeURIComponent(query)}`;

    // Note: We bypass Vercel's /api/products function directly here to avoid caching issues.
    // Making the cross-origin request directly to Sanity's global CDN is faster and avoids 500 errors.
    const rawResponse = await fetch(url, {
      cache: 'reload'
    });
    
    if (!rawResponse.ok) {
      throw new Error(`Failed to fetch from Sanity API: ${rawResponse.statusText}`);
    }
    
    const json = await rawResponse.json();
    const rawProducts = json.result || [];

    if (!Array.isArray(rawProducts) || rawProducts.length === 0) {
      return fallbackProducts;
    }

    const mapped = rawProducts.map((p: any) => {
      const fallback = fallbackProducts.find(fp => 
        (p.model && fp.model.includes(p.model.trim())) || 
        fp.id === p.sku || 
        fp.id === p._id ||
        (p._id && p._id.includes(fp.id.toLowerCase()))
      );
      const images: string[] = [];
      if (p.images && p.images.length > 0) {
        for (const img of p.images) {
          if (img?.asset?._ref) {
            const [, id, dimension, extension] = img.asset._ref.split('-');
            images.push(`https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimension}.${extension}`);
          }
        }
      } else if (p.image?.asset?._ref) {
        const [, id, dimension, extension] = p.image.asset._ref.split('-');
        images.push(`https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimension}.${extension}`);
      }
      
      let category = p.category || 'sofa';
      if (p.category?.slug?.current === 'krovatlar') category = 'bed';
      if (p.category?.slug?.current === 'divanlar') category = 'sofa';
      if (p.category?.slug?.current === 'oshxona') category = 'dining';
      
      return {
        id: p.sku || p._id || 'Unknown',
        model: p.title || p.model || p.name?.uz || p.sku || 'Unknown',
        category: category,
        images: images.length > 0 ? images : fallback?.images || [],
        dimensions: p.dimensions ?? fallback?.dimensions ?? 'Unknown',
        price: p.price ?? fallback?.price ?? 0,
        featured: p.hero ?? false,
        newArrival: true,
        material: {
          uz: p.material_uz ?? fallback?.material?.uz ?? '',
          kz: p.material_kz ?? fallback?.material?.kz ?? '',
          ru: p.material_ru ?? fallback?.material?.ru ?? '',
          en: p.material_en ?? fallback?.material?.en ?? '',
          zh: p.material_zh ?? fallback?.material?.zh ?? ''
        },
        info: {
          uz: p.description_uz ?? fallback?.info?.uz ?? '',
          kz: p.description_kz ?? fallback?.info?.kz ?? '',
          ru: p.description_ru ?? fallback?.info?.ru ?? '',
          en: p.description_en ?? fallback?.info?.en ?? '',
          zh: p.description_zh ?? fallback?.info?.zh ?? ''
        }
      };
    });
    
    return mapped;
  } catch (error) {
    console.error('Failed to fetch from API:', error);
    return fallbackProducts;
  }
}
