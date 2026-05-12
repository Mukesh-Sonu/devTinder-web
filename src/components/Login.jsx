import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import { addUser } from "../utils/userSlice";
import { BASE_URL, position, autoClose } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleValueChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const endpoint = isLogin ? "/login" : "/signup";

      const payload = isLogin
        ? {
            emailId: formData.emailId.trim(),
            password: formData.password,
          }
        : {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            emailId: formData.emailId.trim(),
            password: formData.password,
          };

      const response = await axios.post(`${BASE_URL}${endpoint}`, payload, {
        withCredentials: true,
      });

      const userData = response.data.data;

      dispatch(addUser(userData));

      toast.success(response.data.message, {
        position,
        autoClose,
      });

      navigate(isLogin ? "/feed" : "/profile");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong!";

      setError(errorMessage);

      toast.error(errorMessage, {
        position,
        autoClose,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderInput = ({ name, type, placeholder, value }) => (
    <label className="input validator mt-3">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        className="grow"
        value={value}
        onChange={handleValueChange}
      />
    </label>
  );

  return (
    <div className="flex justify-center mt-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body p-12">
          <h2 className="card-title justify-center">
            {isLogin ? "Login" : "Signup"}
          </h2>

          {/* Signup Fields */}
          {!isLogin && (
            <>
              {renderInput({
                name: "firstName",
                type: "text",
                placeholder: "First Name",
                value: formData.firstName,
              })}

              {renderInput({
                name: "lastName",
                type: "text",
                placeholder: "Last Name",
                value: formData.lastName,
              })}
            </>
          )}

          {/* Common Fields */}
          {renderInput({
            name: "emailId",
            type: "email",
            placeholder: "Email",
            value: formData.emailId,
          })}

          {renderInput({
            name: "password",
            type: "password",
            placeholder: "Password",
            value: formData.password,
          })}

          {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}

          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary w-full"
              onClick={onSubmit}
              disabled={loading}
            >
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Signing up..."
                : isLogin
                ? "Login"
                : "Signup"}
            </button>
          </div>

          <p className="text-center mt-4 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <button
              className="ml-2 text-primary font-semibold cursor-pointer"
              onClick={() => {
                setIsLogin((prev) => !prev);
                setError("");
              }}
            >
              {isLogin ? "Signup" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
