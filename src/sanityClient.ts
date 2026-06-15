import { Product } from './types';
import { products as fallbackProducts } from './products';

export async function getSanityProducts(): Promise<Product[]> {
  try {
    const rawResponse = await fetch(`/api/products?t=${Date.now()}`);
    
    if (!rawResponse.ok) {
      throw new Error('Failed to fetch from API');
    }
    
    const products = await rawResponse.json();
    return products && products.length > 0 ? products : fallbackProducts;
  } catch (error) {
    console.error('Failed to fetch from API:', error);
    return fallbackProducts;
  }
}
