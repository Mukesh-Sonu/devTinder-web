const UserCard = ({ user, disableAction = false }) => {
  const {
    firstName = "",
    lastName = "",
    age,
    gender,
    about,
    photoUrl,
    skills = [],
  } = user;

  const transformedSkills =
    typeof skills == "string"
      ? skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : skills;

  const onInterested = () => {};

  const onIgnore = () => {};

  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {(firstName + " " + lastName).toUpperCase()}
        </h2>
        {(age || gender) && (
          <div className="flex gap-2">
            {age && (
              <span>
                {" "}
                <span className="text-base font-bold mr-1">Age: </span>
                {age}
              </span>
            )}{" "}
            {gender && (
              <span>
                {" "}
                <span className="text-base font-bold mr-1">Gender:</span>
                {gender}
              </span>
            )}
          </div>
        )}
        {about && <p>{about}</p>}

        {transformedSkills.length > 0 && (
          // <p>Skills: {transformedSkills.join(",")}</p>
          <p className="mt-2">
            <span className="text-base font-bold mr-2">Skills:</span>
            {transformedSkills.map((skill, index) => (
              <span className="text-accent" key={skill}>
                {skill}
                {index === transformedSkills.length - 1 ? "." : ", "}
              </span>
            ))}
          </p>
        )}
        {!disableAction && (
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
