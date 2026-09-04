export interface Product {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  sku: string;
  description: string;
  imageUrl: string;
  category: string;
  paymentUrl: string;
  colorHex: string;
  highlightTag?: string;
  flowerType: string;
  sunlight: string;
  watering: string;
  estimatedHeight: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
