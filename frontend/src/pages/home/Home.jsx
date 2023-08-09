import { useEffect, useState } from "react";
import { API } from "../../api/api";
import StudentCard from "../../components/StudentCard/StudentCard";
import FilterBar from "../../components/FiltersBar/FilterBar";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [reports, setReports] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const generateReports = () => {
      API.post("/student", {
        search: searchParams.get("search") || "",
        subjectId: searchParams.get("subject") || "",
        avgStart: Number(searchParams.get("avgStart")) || 0,
        avgEnd: Number(searchParams.get("avgEnd")) || 100,
      })
        .then((res) => {
          console.log(res?.data);
          setReports(res?.data?.report);
        })
        .catch((err) =>
          alert(err?.response?.data?.message || "Something went wrong")
        );
    };

    generateReports();
  }, [searchParams]);

  return (
    <div className="px-2 md:px-10">
      <h1 className="text-3xl font-bold text-center my-6">Get Reports</h1>

      <FilterBar />

      <section className="flex justify-center items-center flex-wrap gap-4 ">
        {reports && reports.length !== 0 ? (
          reports.map((data) => <StudentCard key={data?._id} {...data} />)
        ) : (
          <h2 className="w-full text-xl font-semibold text-center my-2">
            No data found
          </h2>
        )}
      </section>
    </div>
  );
};

export default Home;
