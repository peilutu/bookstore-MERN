import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "./components/Spinner";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setTitle(res.data.title);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error happened");
        console.log(error.message);

        setLoading(true);
      });
  }, []);

  const handleEditBook = () => {
    setLoading(true);
    const data = {
      title,
      author,
      publishYear,
    };

    axios
      .patch(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        // alert("Error happened. ");
        enqueueSnackbar("Error", { variant: "error " });
        console.log(error.message);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-2xl text-center my-4">EditBook</h1>

      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-sky-200 px-5 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-grey-500">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-sky-200 px-5 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label htmlFor="" className="text-xl mr-4 text-grey-500">
            Publish Year
          </label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-sky-200 px-5 py-2 w-full"
          />
        </div>

        <button
          className="p-2 bg-sky-300 m-8 text-white"
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
