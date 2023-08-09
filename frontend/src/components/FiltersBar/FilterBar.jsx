import { useEffect, useState } from "react";
import { API } from "../../api/api";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterBar = () => {
  let [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [subject, setSubject] = useState(searchParams.get("subject") || "");
  const [avgStart, setAvgStart] = useState(searchParams.get("avgStart") || "");
  const [avgEnd, setAvgEnd] = useState(searchParams.get("avgEnd") || "");
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getSubjects = () => {
      API.get("/subject", {})
        .then((res) => {
          setSubjects(res?.data?.subjects);
        })
        .catch((err) =>
          alert(err?.response?.data?.message || "Something went wrong")
        );
    };

    getSubjects();
  }, []);

  const handleFilter = () => {
    let obj = {};
    if (search.trim() !== "") {
      obj.search = search;
    }
    if (subject.trim() !== "") {
      obj.subject = subject;
    }
    if (avgStart.trim() !== "") {
      obj.avgStart = avgStart;
    }
    if (avgEnd.trim() !== "") {
      obj.avgEnd = avgEnd;
    }
    const params = new URLSearchParams(obj);

    if (params.toString()) {
      navigate(`/?${params.toString()}`);
      return;
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center flex-wrap gap-4 my-2">
      <select
        name="subject"
        id="subject"
        className="outline-none px-2 py-1 border border-gray-500"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="">--Subject--</option>
        {subjects &&
          subjects.map((subject) => (
            <option key={subject._id} value={subject._id}>
              {subject.subject_name}
            </option>
          ))}
      </select>
      <input
        name="AvgStart"
        id="AvgStart"
        type="number"
        className="outline-none px-2 py-1 border border-gray-500"
        min={0}
        max={100}
        placeholder="Avg Start"
        value={avgStart}
        onChange={(e) => setAvgStart(e.target.value)}
      />
      <input
        name="AvgEnd"
        id="AvgEnd"
        type="number"
        className="outline-none px-2 py-1 border border-gray-500"
        min={0}
        max={100}
        placeholder="Avg End"
        value={avgEnd}
        onChange={(e) => setAvgEnd(e.target.value)}
      />

      <input
        type="text"
        placeholder="search name"
        className="outline-none px-2 py-1 border border-gray-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="outline-none px-2 py-1 bg-gray-200"
        onClick={handleFilter}
        type="button"
      >
        Search
      </button>
    </div>
  );
};

export default FilterBar;
