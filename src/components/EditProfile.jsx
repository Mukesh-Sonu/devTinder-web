import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addUser } from "../utils/userSlice";
import {
  BASE_URL,
  PROFILE_FIELDS,
  position,
  autoClose,
} from "../utils/constants";
import UserCard from "./UserCard";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    age: "",
    gender: "",
    about: "",
    photoUrl: "",
    skills: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Populate form when user data arrives
  useEffect(() => {
    if (!user) return;

    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      emailId: user.emailId || "",
      age: user.age || "",
      gender: user.gender || "",
      about: user.about || "",
      photoUrl: user.photoUrl || "",
      skills: user.skills?.join(", ") || "",
    });
  }, [user]);

  // Submit profile update
  const onUpdateProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age: Number(formData.age),
        gender: formData.gender.trim(),
        about: formData.about.trim(),
        photoUrl: formData.photoUrl.trim(),
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const response = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
      });

      const updatedUser = response.data.data;

      dispatch(addUser(updatedUser));

      toast.success(response.data.message, {
        position,
        autoClose,
      });
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

  // Handle field changes
  const handleValueChange = (e) => {
    const { name, value } = e.target;

    if (name === "age") {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Dynamic field renderer
  const renderField = ({ placeholder, type, name, disabled }) => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            name={name}
            value={formData[name]}
            className="textarea"
            placeholder={placeholder}
            onChange={handleValueChange}
            disabled={disabled}
          />
        );

      case "select":
        return (
          <select
            className="select"
            name={name}
            value={formData[name]}
            onChange={handleValueChange}
            disabled={disabled}
          >
            <option value="">Select Gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="others">others</option>
          </select>
        );

      default:
        return (
          <input
            name={name}
            value={formData[name]}
            className="input"
            placeholder={placeholder}
            onChange={handleValueChange}
            disabled={disabled}
            inputMode={name === "age" ? "numeric" : undefined}
          />
        );
    }
  };

  return (
    <div className="flex justify-center mt-10 gap-6">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body p-12">
          <h2 className="card-title justify-center mr-2">Profile Details</h2>

          {PROFILE_FIELDS.map((field) => (
            <fieldset className="fieldset" key={field.name}>
              <legend className="fieldset-legend">{field.legend}</legend>

              {renderField(field)}
            </fieldset>
          ))}

          {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}

          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={onUpdateProfile}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>
      </div>

      <div>
        <UserCard user={formData} disableAction />
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditProfile;
