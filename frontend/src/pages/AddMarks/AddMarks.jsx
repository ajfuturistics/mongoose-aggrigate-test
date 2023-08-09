import { useEffect, useState } from "react";
import { API } from "../../api/api";

const AddMarks = () => {
  const [subjectId, setSubjectId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [mark, setMark] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ subjectId, studentId, mark });

    if (
      subjectId.trim() === "" ||
      studentId.trim() === "" ||
      mark.trim() === ""
    ) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);
    API.post("/marks", {
      subjectId,
      studentId,
      mark: Number(mark),
    })
      .then((res) => {
        alert(res?.data?.message);
        setStudentId("");
        setSubjectId("");
        setMark("");
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const getData = async () => {
      const promise1 = API.get("/subject");
      const promise2 = API.get("/student");

      Promise.all([promise1, promise2])
        .then((values) => {
          setSubjects(values[0].data?.subjects);
          setStudents(values[1].data?.students);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
  }, []);

  return (
    <div className="w-full p-2 flex justify-center my-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-4 shadow-xl rounded flex flex-col gap-4 bg-gray-100"
      >
        <h2 className="text-2xl font-semibold my-2 text-center">Add Marks</h2>
        <div>
          <label htmlFor="subject" className="font-semibold mb-2">
            Select Subject <span className="text-red-500">*</span>
          </label>
          <select
            name="subject"
            id="subject"
            className="w-full outline-none px-2 py-1 border border-gray-500"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            required
          >
            <option value="">--Subject--</option>
            {subjects &&
              subjects?.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.subject_name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="student" className="font-semibold mb-2">
            Select Student <span className="text-red-500">*</span>
          </label>
          <select
            name="students"
            id="students"
            className="w-full outline-none px-2 py-1 border border-gray-500"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          >
            <option value="">--Student--</option>
            {students &&
              students?.map((student) => (
                <option key={student._id} value={student._id}>
                  {`${student.firstname} ${student.lastname}`}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="marks" className="font-semibold mb-2">
            Enter Marks (0 to 100) <span className="text-red-500">*</span>
          </label>
          <input
            name="marks"
            id="marks"
            type="number"
            className="w-full outline-none px-2 py-1 border border-gray-500"
            min={0}
            max={100}
            placeholder="Enter Marks"
            value={mark}
            onChange={(e) => setMark(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-center items-center my-4">
          <button
            className="outline-none px-4 py-2 bg-gray-300 font-semibold"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMarks;
