import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import PricingCard from "./PricingCard";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { BASE_URL, position, autoClose } from "../utils/constants";

const Premium = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isUserPremium, setIsUserPremium] = useState(user?.isPremium);
  const rzpCallback = async () => {
    const response = await axios.get(`${BASE_URL}/user/premium/verify`, {
      withCredentials: true,
    });

    const { isPremium } = response.data.data;
    setIsUserPremium(isPremium);
  };

  useEffect(() => {
    setIsUserPremium(user?.isPremium);
  }, [user]);

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
        handler: rzpCallback,
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
    <div
      className={`flex justify-center ${
        !isUserPremium ? "gap-20" : ""
      } items-center h-full w-full`}
    >
      {isUserPremium ? (
        <div className="hero bg-base-300 w-200">
          <div className="hero-content text-center">
            <div className="w-full">
              <h1 className="text-5xl font-bold">Hello there</h1>
              <p className="py-6">You're a Premium User</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/feed")}
              >
                Check out feeds
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Premium;
