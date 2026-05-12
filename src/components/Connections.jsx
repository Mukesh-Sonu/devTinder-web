import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { addConnections } from "../utils/connectionSlice";
import { autoClose, BASE_URL, position } from "../utils/constants";
import NoConnections from "./NoConnections";

const Connections = () => {
  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

      const data = response.data.data;

      dispatch(addConnections(data));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong!";

      toast.error(errorMessage, {
        position,
        autoClose,
      });
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  const renderNoConnectionRequest = () => (
    <NoConnections text="No Requests Found !!!" />
  );

  const renderConnections = () => (
    <div>
      {connections.map(
        ({ firstName, lastName, about, photoUrl, age, gender, _id }) => (
          <ul
            className="list bg-base-300 rounded-box shadow-md w-md mt-4"
            key={_id}
          >
            <li className="list-row">
              <div className="flex items-center">
                <img
                  className="rounded-full w-30 h-30 object-cover"
                  src={photoUrl}
                />
              </div>
              <div>
                <p className="text-xl font-bold opacity-90">
                  {firstName + " " + lastName}
                </p>
                {(age || gender) && (
                  <div className="flex gap-2">
                    {age && <span>{age}, </span>}{" "}
                    {gender && <span>{gender}</span>}
                  </div>
                )}
                <div className="text-xs font-semibold opacity-60 mt-2">
                  {about}
                </div>
              </div>
            </li>
          </ul>
        )
      )}
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col items-center">
      <p className="text-2xl p-4">Connections</p>

      {connections.length === 0
        ? renderNoConnectionRequest()
        : renderConnections()}
      <ToastContainer />
    </div>
  );
};

export default Connections;
