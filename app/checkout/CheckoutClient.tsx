"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const router = useRouter();

  useEffect(() => {
    // Create a payment intent as soon as the page loads
    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }

          return res.json();
        })
        .then((data) => {
          if (data.paymentIntent) {
            console.log("API response data:", data);
            console.log("Client Secret:", data.paymentIntent.client_secret);
            console.log("Payment Intent ID:", data.paymentIntent.id);

            setClientSecret(data.paymentIntent.client_secret);
            handleSetPaymentIntent(data.paymentIntent.id);

            console.log("Set paymentIntent id:", data.paymentIntent.id);
          } else {
            console.error("Payment Intent not found in response:", data);
            toast.error("Something went wrong");
          }
        })
        .catch((error) => {
          setError(true);
          console.error("Error:", error);
          toast.error("Something went wrong");
        });
    }
  }, [cartProducts, paymentIntent, handleSetPaymentIntent, router]);

  return <>Checkout</>;
};

export default CheckoutClient;
