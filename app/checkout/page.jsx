import CheckoutView from "@/sections/products/view/checkout-view";
import {
  GetAddress,
  GetDeliveryList,
  GetPaymentList,
} from "@/services/Purchase";

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_STORE_NAME} - Checkout`,
};

export default async function Page() {
  const gettingAddress = await GetAddress();
  const gettingDelivery = await GetDeliveryList();
  const gettingPayment = await GetPaymentList();

  return (
    <CheckoutView
      addressList={gettingAddress}
      deliveryList={gettingDelivery}
      paymentList={gettingPayment}
    />
  );
}
