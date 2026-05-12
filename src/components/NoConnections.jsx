import NoConnection from "../assests/no_connection.jpg";

const NoConnections = ({ text }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={NoConnection} alt="Shoes" />
        </figure>
        <div className="card-body flex items-center">
          <p className="card-title">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default NoConnections;
