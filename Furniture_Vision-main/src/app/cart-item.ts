interface CartItem {
    productId: string;
    imageUrl: string; // Adjust according to actual data
    // Add other properties as needed
  }
  
  interface CartResponse {
    cart: CartItem[];
    message: string;
  }