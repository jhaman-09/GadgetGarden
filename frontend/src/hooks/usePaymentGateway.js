import { toast } from "react-toastify";
import { endPoint } from "../helper/api";
import { loadStripe } from "@stripe/stripe-js";

export const usePaymentGateway = () => {
  const paymentGateway = async (cartProductsArray) => {
    try {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLIC_KEY
      );

      if (!stripePromise) {
        console.error("Failed to initialize Stripe: Public key is missing");
      }

      const res = await fetch(endPoint.paymentGateway.url, {
        method: endPoint.paymentGateway.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ cartProducts: cartProductsArray }),
      });

      if (!res.ok) {
        throw new Error("Failed to create a payment session");
      }

      const jsonData = await res.json();
      
      if (!jsonData.sessionId) {
        throw new Error("Invalid session data received");
      }

      

      toast.success("Redirecting to the payment gateway...!");
      const result = await stripePromise.redirectToCheckout({
        sessionId: jsonData.sessionId,
      });
      if (result.error) {
        toast.error("Error redirecting to Stripe. Please try again.");
      }
    }
    catch (error) {
      toast.error(
        error.message || "An error occurred while processing the payment."
      );
      console.error(error);
    }
  };
  return paymentGateway;
};
