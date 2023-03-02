import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.PUBLIC_KEY_STRIPE);
  }
  return stripePromise;
};
