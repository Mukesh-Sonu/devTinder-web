import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL, position, autoClose } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setFeed, removeUserFromFeed, appendFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import NoConnections from "./NoConnections";

const LIMIT = 5;

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed.users);
  const currentPage = useSelector((state) => state.feed.page);
  const hasMore = useSelector((state) => state.feed.hasMore);

  const fetchFeed = async (page = 1, append = false) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/feed?page=${page}&limit=${LIMIT}`,
        {
          withCredentials: true,
        }
      );

      const responseData = response.data;

      const payload = {
        data: responseData.data,
        page: responseData.page,
        hasMore: responseData.page * responseData.limit < responseData.total,
      };

      if (append) {
        dispatch(appendFeed(payload));
      } else {
        dispatch(setFeed(payload));
      }
    } catch (error) {
      console.error("Error:-", error);
    }
  };

  const handleCardAction = async (key, requestId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/request/send/${key}/${requestId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(requestId));

      //Preload next batch
      if (feed.length <= 3 && hasMore) {
        fetchFeed(currentPage + 1, true);
      }

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
    fetchFeed();
  }, []);

  const renderNoFeed = () => {
    return <NoConnections text="No more Feed!!!" />;
  };

  if (!feed) return;

  return (
    <div className="h-full w-full flex items-center justify-center">
      {feed?.length === 0 ? (
        renderNoFeed()
      ) : (
        <UserCard
          user={feed[0]}
          key={feed._id}
          onCardAction={handleCardAction}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Feed;
