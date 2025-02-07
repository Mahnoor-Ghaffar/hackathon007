// "use client";
// import React from "react";
// import { remove } from "../redux/cartslice";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../redux/store"; // Replace with the actual path to your store's RootState type
// import Image from "next/image";

// interface CartItem {
//   _id: string; // The ID is a string.
//   title: string;
//   imageUrl: string | null;
//   price: number;
//   description: string;
//   tags: string[];
//   dicountPercentage?: number;
//   availableSizes?: string[];
// }

// const fallbackImage = "/fallback-image.png"; // Path to a fallback image in your public folder

// const Cartpage: React.FC = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state: RootState) => state.cart);

//   const handleRemove = (_id: string) => {
//     dispatch(remove(_id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <h3 className="text-3xl font-bold text-center mb-8">Your Cart</h3>
//       <div className="space-y-6">
//         {cartItems.length === 0 ? (
//           <p className="text-center text-gray-500">Your cart is empty.</p>
//         ) : (
//           cartItems.map((item: CartItem) => (
//             <div
//               key={item._id}
//               className="flex items-center bg-white shadow-md rounded-lg p-4"
//             >
//               {/* Image Section */}
//               <div className="flex-shrink-0">
//                 <Image
//                   src={item.imageUrl || fallbackImage}
//                   alt={item.title}
//                   height={150}
//                   width={150}
//                   className="rounded-md"
//                 />
//               </div>

//               {/* Content Section */}
//               <div className="ml-4 flex-grow">
//                 <h5 className="text-lg font-semibold text-gray-800">
//                   {item.title}
//                 </h5>
//                 <h5 className="text-lg font-medium text-gray-600 mt-2">
//                   ${item.price.toFixed(2)}
//                 </h5>
//               </div>

//               {/* Button Section */}
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
//                 onClick={() => handleRemove(item._id)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cartpage;


"use client";

import { Product } from "../types/product";
import React, { useEffect, useState } from "react";
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "../actions/actions";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Swal from "sweetalert2";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire("Removed!", "Item has been removed from your cart.", "success");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) {
      handleQuantityChange(id, product.quantity + 1);
    }
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.quantity > 1) {
      handleQuantityChange(id, product.quantity - 1);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleProceed = () => {
    Swal.fire({
      title: "Processing your order...",
      text: "Please wait a moment.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", "Your order has been successfully processed!", "success");
        setCartItems([]); // Clear the cart after proceeding
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h1>

      <div className="space-y-6">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center">
                {item.image && (
                  <Image
                    src={urlFor(item.image).url()}
                    className="w-16 h-16 object-cover rounded-lg"
                    alt={item.name}
                    width={500}
                    height={500}
                  />
                )}
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-500">Price: ${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleRemove(item._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total:</h2>
            <p className="text-xl font-bold text-gray-800">${calculateTotal().toFixed(2)}</p>
          </div>
          <button
            onClick={handleProceed}
            className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Proceed
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
