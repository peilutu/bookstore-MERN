import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { PiBookOpenTextLight } from "react-icons/pi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import BookSinglecCard from "./BookSinglecCard";

const BooksCard = ({ books }) => {
  console.log(books);
  return (
    <div className="grid sm:gird-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {books.map((book) => (
        <BookSinglecCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BooksCard;
