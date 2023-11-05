import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "./components/Spinner";

const DeleteBooks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        alert("Error happen");
        console.log(error.message);
        setLoading(true);
      });
  };
  return (
    <div className="p-4">
      {loading ? <Spinner /> : ""}
      <div className="border-2 border-sky-300 flex flex-col items-center rounded-xl p-8 mx-auto">
        <h3 className="text-3xl">Are you sure to delete this book?</h3>
        <button
          className="bg-red-500 text-white border-2 rounded-xl p-2 m-2 w-full w-[600px]"
          onClick={handleDeleteBook}
        >
          Yes, delete this book
        </button>
        <button className="bg-sky-500 text-white border-2 rounded-xl p-2 m-2  w-[600px]">
          <Link to="/">No, return to the home page</Link>
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;
