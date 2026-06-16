export default async function handler(req: any, res: any) {
  const projectId = 'e6yjw47z';
  const dataset = 'production';

  try {
    const query = '*[_type=="product"]{...,images[]->,category->}';
    const baseUrl = `https://${projectId}.api.sanity.io/v2023-05-03/data/query/${dataset}`;

    const rawResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      cache: 'no-store'
    });
    
    if (!rawResponse.ok) {
      throw new Error(`Sanity API error: ${rawResponse.statusText}`);
    }

    const json = await rawResponse.json();
    
    res.setHeader('Cache-Control', 's-maxage=0, no-cache, no-store, must-revalidate');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(json.result || []);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products', details: error?.message || String(error) });
  }
}
