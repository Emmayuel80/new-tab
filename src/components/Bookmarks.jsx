import React from "react";
import getDomain from "../services/getDomain";
import Modal from "./Modal";
import Bookmark from "./settings/Bookmark";
import { FiPlus } from "react-icons/fi";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = React.useState([]);

  React.useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (bookmarks) {
      setBookmarks(bookmarks);
    }
  }, []);

  return (
    <div>
      <div className="flex mt-8">
        <div className="max-w-sm bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <h1 className="text-4xl text-white text-center mt-8">Bookmarks</h1>
          <Modal title="Add Bookmark">
            <Bookmark />
          </Modal>
          <div className="p-8">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="flex items-center mt-2 hover:bg-gray-300 rounded-lg p-2 cursor-pointer select-none"
                onClick={() => window.open(bookmark.url, "_blank")}
                role="button"
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={`https://legal-white-orca.faviconkit.com/${getDomain(
                    bookmark.url
                  )}/32`}
                  alt={bookmark.name}
                />
                <div className="ml-4">
                  <h2 className="text-white text-lg">{bookmark.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
