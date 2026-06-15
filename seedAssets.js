import fs from 'fs';
import path from 'path';

const projectId = 'e6yjw47z';
const dataset = 'production';
const token = 'skio5x30DJb5Y6OFI2oMV22DJ5uUsYVFJXkUBCdrRz82p3LGWby8Lp6GkxOMrRRuGIqyFOjWUq3sey8iya23ozV6xro1qEpZiSf3g3oE0Hi3SlZ6BmwrM6gsJfoW3qlyw3tlrFsP9SB8YhBJbEhcSc7oOhZ1NFZjDcqUZ2oVLmGtVxLD3EQ2';

const productsData = [
  {
    id: "BY-6033",
    model: "BY.6033 Legenda",
    category: "sofa",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1200&q=80"
    ],
    dimensions: "280 x 105 x 85 cm",
    price: 3450,
    featured: true,
    newArrival: true,
    material: {
      en: "100% Premium Italian Top-Grain Leather, Meranti solid hardwood frame, steel legs",
    },
    info: {
      en: "A monumental design icon by KUKA. Draped in exquisite, full-aniline Italian top-grain leather, it fuses minimal geometric elegance with our patented memory-foam structural layering, creating a seat that is simultaneously supportive and clouds-soft.",
    }
  },
  {
    id: "BY-736B",
    model: "BY.736B Milanese",
    category: "sofa",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80"
    ],
    dimensions: "340 x 180 x 90 cm",
    price: 4100,
    featured: true,
    newArrival: false,
    material: {
      en: "Belgian Silk-blend Bouclé texturized upholstery, high-tensile structural web suspension",
    },
    info: {
      en: "Inspired by the ultimate milanese minimalism, this modular sectional blends rich Organic texture with cloud-like sitting comfort. Its modular design allows flexible seating shapes suited for contemporary luxury properties.",
    }
  },
  {
    id: "BY-700",
    model: "BY.700 Smart Gravity",
    category: "lounge",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80"
    ],
    dimensions: "105 x 90 x 110 cm",
    price: 1850,
    featured: false,
    newArrival: true,
    material: {
      en: "Nappa top leather overlay, German OKIN whisper-quiet low-voltage motor, military-grade steel alloy rails",
    },
    info: {
      en: "An uncompromised smart reclining lounge experience. Powered by an elite, whisper-quiet German actuator system, it smoothly transitions you into full Zero-Gravity biomechanical support for true mind-body recovery.",
    }
  },
  {
    id: "BY-8105",
    model: "BY.8105 Sienna Crown",
    category: "bed",
    images: [
      "https://images.unsplash.com/photo-1505693395321-883724634266?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
    ],
    dimensions: "220 x 210 x 140 cm",
    price: 2900,
    featured: true,
    newArrival: false,
    material: {
      en: "Luxury Nubuck ground leather, Russian birchwood structural slatted bed frame, non-slip base",
    },
    info: {
      en: "Majestic proportions with a bold high-tufted headboard. Upholstered in premium, velvety nubuck leather, it sets a regal anchor point for your modern master suite. Equipped with a huge internal storage system.",
    }
  },
  {
    id: "BY-5020",
    model: "BY.5020 Verona Cloud",
    category: "bed",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=1200&q=80"
    ],
    dimensions: "215 x 195 x 115 cm",
    price: 2100,
    featured: false,
    newArrival: true,
    material: {
      en: "Eco-conscious micro-grain leather base, birchwood flexible slat system, internal cold-rolled steel alignment corners",
    },
    info: {
      en: "A beautiful low-profile platform bed which mimics a floating cloud. Crafted with wrap-around premium cushioning and soft curved corners, it offers extreme baby-safe physical protection and peaceful ergonomics.",
    }
  },
  {
    id: "BY-4042",
    model: "BY.4042 Capital Table",
    category: "dining",
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80"
    ],
    dimensions: "200 x 95 x 76 cm (Stol) + 6 Stul",
    price: 3200,
    featured: true,
    newArrival: false,
    material: {
      en: "Sintered Nero Marquina Marble top, electrostatic structural steel base, premium leather dining armchairs",
    },
    info: {
      en: "An executive scale dining set bringing industrial grandeur to your architectural dining hall. Features a beautiful, indestructible Italian Nero Marquina sintered stone top which is scratch-proof and hot-iron safe, plus 6 matching leather wing chairs.",
    }
  },
  {
    id: "BY-1022",
    model: "BY.1022 Shell Lounge",
    category: "lounge",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80"
    ],
    dimensions: "85 x 85 x 95 cm",
    price: 1250,
    featured: false,
    newArrival: true,
    material: {
      en: "Molded cold-cure foam core, luxury wool blend upholstery fabric, 360° swivel brass-plated steel base",
    },
    info: {
      en: "A beautiful architectural statement piece inspired by the curved geometry of an oceanic shell. Seamlessly balances 360° smooth swivel action with full postural lumbar cradling.",
    }
  }
];

async function uploadImage(url) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    
    // Convert blob to array buffer then node buffer
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const assetRes = await fetch(`https://${projectId}.api.sanity.io/v2022-03-07/assets/images/${dataset}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': blob.type,
      },
      body: buffer
    });
    
    const assetJson = await assetRes.json();
    return assetJson.document._id;
  } catch (err) {
    console.error("Failed to upload image:", err);
    return null;
  }
}

async function seed() {
  console.log("Uploading images and seeding products...");
  
  const mutations = [];
  
  for (const p of productsData) {
    console.log(`Processing: ${p.model}`);
    
    // Upload all images for this product
    const imageAssetIds = [];
    for (const url of p.images) {
      const assetId = await uploadImage(url);
      if (assetId) {
        imageAssetIds.push(assetId);
      }
    }
    
    mutations.push({
      createOrReplace: {
        _id: `product-${p.id.toLowerCase()}`,
        _type: 'product',
        title: p.model,
        sku: p.id,
        price: p.price,
        category: p.category,
        dimensions: p.dimensions,
        material_en: p.material?.en || "",
        description_en: p.info?.en || "",
        images: imageAssetIds.map(assetId => ({
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId
          }
        }))
      }
    });
  }

  const url = `https://${projectId}.api.sanity.io/v2022-03-07/data/mutate/${dataset}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ mutations })
  });

  const result = await response.json();
  console.log('Seed result:', result);
}

seed();
