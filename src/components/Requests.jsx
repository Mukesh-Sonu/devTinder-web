import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { autoClose, BASE_URL, position } from "../utils/constants";
import NoConnections from "./NoConnections";

const Requests = () => {
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });

      const data = response.data.data;

      dispatch(addRequests(data));
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong!";

      toast.error(errorMessage, {
        position,
        autoClose,
      });
    }
  };

  const handleRequestAction = async (key, requestId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/request/review/${key}/${requestId}`,
        {},
        { withCredentials: true }
      );

      const data = response.data.data;
      dispatch(removeRequest(data));

      toast.success(response.data.message, {
        position,
        autoClose,
      });
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
    fetchRequests();
  }, []);

  if (!requests) return null;

  const renderNoConnectionRequest = () => (
    <NoConnections text="No Requests Found !!!" />
  );

  const renderConnectionRequests = () => (
    <div>
      {requests.map(({ fromUserId }) => {
        const { firstName, lastName, about, photoUrl, age, gender, _id } =
          fromUserId;
        return (
          <ul
            className="list bg-base-300 rounded-box shadow-md w-xl mt-4"
            key={_id}
          >
            <li className="list-row">
              <div className="flex items-center">
                <img className="rounded-full w-30 h-30 ob" src={photoUrl} />
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
                <p className="text-xs font-semibold opacity-60 mt-2">{about}</p>

                <div className="mt-4 flex gap-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleRequestAction("rejected", _id)}
                  >
                    Reject
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => handleRequestAction("accepted", _id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col items-center">
      <p className="text-2xl p-4">Connection Requests</p>

      {requests.length === 0
        ? renderNoConnectionRequest()
        : renderConnectionRequests()}

      <ToastContainer />
    </div>
  );
};

export default Requests;
