import axios from "axios";
import PricingCard from "./PricingCard";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL, position, autoClose } from "../utils/constants";

const Premium = () => {
  const handleBuyClick = async (type) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/payment/create`,
        {
          membershipType: type,
        },
        {
          withCredentials: true,
        }
      );

      // Should open the razorpay dialog

      const { keyId, payment } = response.data.data;
      const { amount, currency, notes, orderId } = payment;

      // Open Razorpay Checkout
      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      //   toast.success(response.data.message, {
      //     position,
      //     autoClose,
      //   });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage, {
        position,
        autoClose,
      });
    }
  };

  return (
    <div className="flex justify-center gap-20 items-center h-full w-full">
      <PricingCard
        planText="Silver Plan"
        priceText="₹1000/mo"
        btnText="Buy Silver"
        type="silver"
        btnClass="btn-primary"
        onBuyClick={handleBuyClick}
      />
      <PricingCard
        planText="Gold Plan"
        priceText="₹5000/mo"
        btnText="Buy Gold"
        type="gold"
        btnClass="btn-secondary"
        onBuyClick={handleBuyClick}
      />

      <ToastContainer />
    </div>
  );
};

export default Premium;
