import PropTypes from "prop-types";

const StudentCard = ({
  rank,
  fullname,
  numOfSubjects,
  total,
  avg,
  percentage,
}) => {
  return (
    <div className="p-4 shadow-xl rounded">
      <p className="font-semibold my-3">
        <span className="text-sm text-teal-800 font-mono bg-teal-100 inline rounded-full px-3 py-1 animate-pulse">
          Rank #{rank}
        </span>
      </p>
      <h2 className="grid grid-cols-2 gap-4">
        <span className="font-semibold mr-2">Name:</span>{" "}
        <span>{fullname}</span>
      </h2>
      <p className="grid grid-cols-2 gap-4">
        <span className="font-semibold mr-2">Total Subjects:</span>{" "}
        <span>{numOfSubjects}</span>
      </p>

      <p className="grid grid-cols-2 gap-4">
        <span className="font-semibold mr-2">Total Marks:</span>{" "}
        <span>
          {total} out of {100 * numOfSubjects}
        </span>
      </p>
      <p className="grid grid-cols-2 gap-4">
        <span className="font-semibold mr-2">Average Marks:</span>{" "}
        <span>{avg}</span>
      </p>
      <p className="grid grid-cols-2 gap-4">
        <span className="font-semibold mr-2">Total Percentage:</span>{" "}
        <span>{percentage}%</span>
      </p>
    </div>
  );
};

export default StudentCard;

StudentCard.propTypes = {
  rank: PropTypes.number.isRequired,
  fullname: PropTypes.string.isRequired,
  numOfSubjects: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  avg: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired,
};
