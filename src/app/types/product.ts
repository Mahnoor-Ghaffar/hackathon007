// export interface Product {
//     _id: string;
//     _type: 'product';
//     name: string;
//     image?: {
//       _type: 'image';
//       asset: {
//         _type: 'reference';
//         _ref: string;
//       };
//     };
//     imageUrl?: string | null; // Image URL for frontend use
//     price: number;
//     originalPrice: number;
//     discountPercentage?: number;
//     rating: number;
//     reviews: number;
//     description: string;
//     tags: string[];
//     sizes?: string[]; // Optional if not all products have sizes
//     stock_quantity: number;
//     category: string;
//     slug: {
//       _type: 'slug';
//       current: string;
//     };
//     quantity?: number; // Optional, used when adding to cart
//     availableSizes?: string[]; // Optional, mapped from "sizes"
//   }
  

export interface Product {
    _id: string;
    _type: 'product';
    name: string;
    image?: {
      _type: 'image';
      asset: {
        _type: 'reference';
        _ref: string;
      };
    };
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    description: string;
    tags: string[];
    sizes: string[];
    stock_quantity: number;
    category: string;
    slug: {
      _type: 'slug';
      current: string;
    };
    quantity: number; // Add this line
}