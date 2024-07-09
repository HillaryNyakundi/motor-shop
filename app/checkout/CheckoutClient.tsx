"use client";

import { useCart } from "@/hooks/useCart";
import { useEffect } from "react";

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();

  useEffect(() => {}, []);
  return <>Checkout</>;
};

export default CheckoutClient;
