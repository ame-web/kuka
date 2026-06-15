export default async function handler(req: any, res: any) {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e6yjw47z';
  const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

  try {
    const query = '*[_type=="product"]{...,images[]->,category->}';
    const baseUrl = `https://${projectId}.api.sanity.io/v2023-05-03/data/query/${dataset}`;
    const url = `${baseUrl}?query=${encodeURIComponent(query)}`;

    const rawResponse = await fetch(url, {
      cache: 'no-store'
    });
    
    if (!rawResponse.ok) {
      throw new Error(`Sanity API error: ${rawResponse.statusText}`);
    }

    const json = await rawResponse.json();
    
    res.setHeader('Cache-Control', 's-maxage=0, no-cache, no-store, must-revalidate');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(json.result || []);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
