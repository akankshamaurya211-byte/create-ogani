import React, { useEffect, useState } from "react";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useRazorpay} from "react-razorpay";


const Cart = () => {
  const [cartItems, setCartItems] = useState([
    // {
    //   id: 1,
    //   name: "Fresh Organic Vegetables",
    //   price: 24,
    //   quantity: 1,
    //   image:
    //     "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    // },
    // {
    //   id: 2,
    //   name: "Natural Orange Juice",
    //   price: 18,
    //   quantity: 2,
    //   image:
    //     "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=1200&auto=format&fit=crop",
    // },

    // {
    //   id: 2,
    //   name: "Natural Orange Juice",
    //   price: 18,
    //   quantity: 2,
    //   image:
    //     "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=1200&auto=format&fit=crop",
    // },


    // {
    //   id: 2,
    //   name: "Natural Orange Juice",
    //   price: 18,
    //   quantity: 2,
    //   image:
    //     "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=1200&auto=format&fit=crop",
    // },


    // {
    //   id: 2,
    //   name: "Natural Orange Juice",
    //   price: 18,
    //   quantity: 2,
    //   image:
    //     "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=1200&auto=format&fit=crop",
    // },


    // {
    //   id: 2,
    //   name: "Natural Orange Juice",
    //   price: 18,
    //   quantity: 2,
    //   image:
    //     "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=1200&auto=format&fit=crop",
    // },


    // {
    //   id: 2,
    //   name: "Natural Orange Juice",
    //   price: 18,
    //   quantity: 2,
    //   image:
    //     "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=1200&auto=format&fit=crop",
    // },


    // {
    //   id: 2,
    //   name: "Natural Orange Juice",
    //   price: 18,
    //   quantity: 2,
    //   image:
    //     "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=1200&auto=format&fit=crop",
    // },

    // {
    //   id: 2,
    //   name: "Natural Orange Juice",
    //   price: 18,
    //   quantity: 2,
    //   image:
    //     "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=1200&auto=format&fit=crop",
    // },
  ]);
  const navigator = useNavigate();

  async function addToCart(productId, quantity) {
    try {

      let response = await fetch(`${import.meta.env.VITE_BACKEND_HOST}/cart`,
        {
          method: "POST",
          credentials: "include",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ productId, quantity })
        });
      if (!response.ok)
        return toast.error("Could not fetch cart at the moment!!", { position: "bottom-center" });

      response = await response.json();
      console.log(response.cart);
      setCartItems(response.cart);


    } catch (error) {
      console.log(error);

      toast.error("Could not fetch cart at the moment!!", { position: "bottom-center" })
    }
  }

  const increaseQty = (productId, quantity) => {
    addToCart(productId, quantity)
  }

  const decreaseQty = (productId, quantity) => {
    addToCart(productId, quantity)
  }
  const removeItem = (productId, quantity) => {
    addToCart(productId, quantity)
  }

  // const increaseQty = (id) => {
  //   setCartItems((items) =>
  //     items.map((item) =>
  //       item.id === id
  //         ? { ...item, quantity: item.quantity + 1 }
  //         : item
  //     )
  //   );
  // };


  // const decreaseQty = (id) => {
  //   setCartItems((items) =>
  //     items.map((item) =>
  //       item.id === id && item.quantity > 1
  //         ? { ...item, quantity: item.quantity - 1 }
  //         : item
  //     )
  //   );
  // };

  // const removeItem = (id) => {
  //   setCartItems((items) =>
  //     items.filter((item) => item.id !== id)
  //   );
  // };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 10;
  const total = subtotal + shipping;

  async function fetchCart() {
    try {
      let response = await fetch(import.meta.env.VITE_BACKEND_HOST + "/cart", { credentials: "include" });
      if (!response.ok)
        return toast("Could not fetch cart at the moment!!", { position: "bottom-center" });

      response = await response.json();
      console.log(response);
      setCartItems(response.message);

    } catch (error) {
      toast("Could not fetch cart at the moment!!", { position: "bottom-center" })
    }
  }
  
  useEffect(() => { fetchCart() }, []);

  // Payment --------------------------


  const {Razorpay} = useRazorpay();

  // async function handlePayment() {
  //   try {
  //     let response = await fetch(import.meta.env.VITE_BACKEND_HOST+"/order");
  //     if(!response.ok)
  //       return toast("could not proceed at the moment!", {position:"bottom-center"});

  //     response = await response.json();
  //     const orderObj = response.message;
  //     const rzpay = new Razorpay({
  //       key: import.meta.env.VITE_RAZ_KEY,
  //       oder_id : orderObj.id,
  //       amount: orderObj.amount,
  //       currency: orderObj.currency
  //     });
  //     rzpay.open();
  //   } catch (error) {
  //     console.log(error);
  //     toast("could not proceed at the moment!", {position:"bottom-center"})
      
  //   }
  // }

  async function createOrder() {
    try {
         let response = await fetch(import.meta.env.VITE_BACKEND_HOST+"/create-orders",
         { 
          method:"POST",
          credentials:"include",
          headers:{"content-type":"application/json"}
         }
        );

      if(!response.ok)
        return toast("could not proceed at the moment!", {position:"bottom-center"});

      response = await response.json();
       const orderObj = response;
       console.log(response);

       const rzpay = new Razorpay({
        key: import.meta.env.VITE_RAZ_KEY,
        oder_id : orderObj.orderId,
        amount: orderObj.amount,
        currency: orderObj.currency,
        handler: async (payment_obj)=>{
          try {
            let res = await fetch(import.meta.env.VITE_BACKEND_HOST+"/verifypayment",{
              method:"POST",
              headers:{"content-type":"application/json"},
              credentials:"include",
              body:JSON.stringify(payment_obj)
            });

            if(!res.ok)
              return toast("Something went wrong! If you are sure that amount has been deducted, please contact us!", {position:"bottom-center"});
              

            toast("Thank you for shopping with us!!", {position:"bottom-center"});
          } catch (error) {
            toast("Something went wrong! If you are sure that amount has been deducted, please contact us!", {position:"bottom-center"});
          }
        }
      });

      rzpay.open();

    } catch (error) {
      console.log(error);
      toast("could not proceed at the moment!", {position:"bottom-center"})
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-10 px-4">
      <div className="max-w-7xl mx-auto">


        {cartItems.length === 0 ? (
          /* EMPTY CART */
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
            <div className="w-24 h-24 bg-[#7fad39]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag
                size={42}
                className="text-[#7fad39]"
              />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Cart is Empty
            </h2>

            <p className="text-gray-500 mb-8">
              Looks like you haven’t added anything yet.
            </p>

            <button onClick={()=>navigator("/shop")} className="bg-[#7fad39] hover:bg-[#6f9d32] transition text-white px-8 py-4 rounded-2xl font-semibold">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6"
                >

                  {/* IMAGE */}
                  <div className="w-full md:w-40 h-40 rounded-2xl overflow-hidden">
                    <img
                      src={import.meta.env.VITE_BACKEND_HOST + "/image/images/" + item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1 flex flex-col justify-between">

                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {item.title}
                        </h3>

                        <p className="text-[#7fad39] text-xl font-bold mt-2">
                          ${item.price}.00
                        </p>
                      </div>

                      {/* DELETE */}
                      <button
                        onClick={() => removeItem(item.productId, -(item.quantity))}
                        className="w-11 h-11 rounded-xl border hover:bg-red-50 hover:border-red-200 transition flex items-center justify-center text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* QUANTITY */}
                    <div className="flex items-center justify-between mt-6">

                      <div className="flex items-center border rounded-2xl overflow-hidden">
                        <button
                          onClick={() => decreaseQty(item.productId, -1)}
                          className="px-5 py-4 hover:bg-gray-100 transition"
                        >
                          <Minus size={18} />
                        </button>

                        <span className="px-6 font-semibold text-lg">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQty(item.productId, 1)}
                          className="px-5 py-4 hover:bg-gray-100 transition"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      {/* TOTAL */}
                      <h4 className="text-2xl font-bold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div>
              <div className="bg-white rounded-3xl p-8 shadow-sm sticky top-10">

                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                  Cart Summary
                </h2>

                {/* Coupon */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Promo Code
                  </label>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-[#7fad39]"
                    />

                    <button className="bg-[#7fad39] hover:bg-[#6f9d32] transition text-white px-5 rounded-2xl font-semibold">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-5 border-t border-b py-6">

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-lg">
                      Subtotal
                    </span>

                    <span className="font-bold text-gray-800 text-lg">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-lg">
                      Shipping
                    </span>

                    <span className="font-bold text-gray-800 text-lg">
                      ${shipping.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-800">
                      Total
                    </span>

                    <span className="text-3xl font-extrabold text-[#7fad39]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout */}
                <button onClick={createOrder} className="w-full mt-8 bg-[#7fad39] hover:bg-[#6f9d32] transition text-white py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3">
                  Proceed To Checkout
                  <ArrowRight size={20} />
                </button>

                {/* Continue Shopping */}
                <button onClick={()=>navigator("/shop")} className="w-full mt-4 border border-gray-300 hover:bg-gray-100 transition py-5 rounded-2xl font-semibold text-gray-700">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;