import React from "react";
import getDomain from "../../services/getDomain";
import { FiEdit, FiSave, FiTrash } from "react-icons/fi";

const BookmarkSettings = ({ setPreventExit }) => {
  const [bookmarks, setBookmarks] = React.useState([]);
  const [newBookmark, setNewBookmark] = React.useState({
    id: "",
    name: "",
    url: "",
    icon: null,
  });
  const [editId, setEditId] = React.useState(null);
  const [showAdd, setShowAdd] = React.useState(false);

  function deleteBookmark(id) {
    /* alert user to confirm deletion */
    if (!window.confirm("Are you sure you want to delete this bookmark?")) {
      return;
    }
    const newBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(newBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  }

  function addBookmark() {
    newBookmark.id =
      String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
      Math.random().toString(16).slice(2) +
      Date.now().toString(16).slice(4);
    newBookmark.icon = `https://legal-white-orca.faviconkit.com/${getDomain(
      newBookmark.url
    )}/32`;
    setBookmarks([...bookmarks, newBookmark]);
    localStorage.setItem(
      "bookmarks",
      JSON.stringify([...bookmarks, newBookmark])
    );
    setNewBookmark({
      id: "",
      name: "",
      url: "",
      icon: null,
    });
    setShowAdd(false);
  }

  function editBookmark() {
    const newBookmarks = bookmarks.map((bookmark) => {
      if (bookmark.id === editId) {
        newBookmark.icon = `https://legal-white-orca.faviconkit.com/${getDomain(
          newBookmark.url
        )}/32`;
        return newBookmark;
      }
      return bookmark;
    });
    setBookmarks(newBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
    setEditId(null);
    setNewBookmark({
      id: "",
      name: "",
      url: "",
      icon: null,
    });

    setPreventExit(false);
  }

  function handleBookmarkChange(e) {
    setNewBookmark({ ...newBookmark, [e.target.name]: e.target.value });
  }

  React.useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (bookmarks) {
      setBookmarks(bookmarks);
    }
  }, []);
  return (
    <div>
      <div className="mt-2 w-full max-h-640 overflow-y-auto">
        <p className="text-sm text-gray-400">Bookmark Settings</p>
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className="flex items-center mt-2 grow w-full">
            <img
              className="w-6 h-6 rounded-full"
              src={`https://legal-white-orca.faviconkit.com/${getDomain(
                bookmark.url
              )}/32`}
              alt={bookmark.name}
            />
            {editId !== bookmark.id && (
              <div className="ml-2 w-full">
                <h2 className="text-sm">{bookmark.name}</h2>
                <p className="text-xs text-gray-400">{bookmark.url}</p>
              </div>
            )}
            {editId === bookmark.id ? (
              <div className="flex grow">
                <p className="text-sm ml-1 mt-2">Name:</p>
                <input
                  type="text"
                  name="name"
                  value={newBookmark.name}
                  onChange={handleBookmarkChange}
                  className="ml-1 text-sm w-80 border-b border-gray-500 bg-gray-700 rounded"
                />
                <p className="text-sm  ml-1 mt-2">URL:</p>
                <input
                  type="text"
                  name="url"
                  value={newBookmark.url}
                  onChange={handleBookmarkChange}
                  className="ml-1 text-sm w-full border-b border-gray-500 bg-gray-700 rounded"
                />
                <button
                  className="ml-5 text-blue-500 ml-1"
                  onClick={() => editBookmark()}
                >
                  <FiSave className="mx-auto" /> Save
                </button>
              </div>
            ) : (
              <div className="flex justify-items-end">
                <button
                  className="ml-auto text-blue-500 disabled:opacity-20"
                  onClick={() => {
                    setEditId(bookmark.id);
                    setNewBookmark(bookmark);
                    setPreventExit(true);
                  }}
                  disabled={editId || showAdd}
                >
                  <FiEdit className="w-5 h-5" />
                </button>
                <button
                  className="ml-2 text-red-500"
                  onClick={() => deleteBookmark(bookmark.id)}
                >
                  <FiTrash className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {!showAdd && (
        <div className="flex items-center mt-4 grow w-full">
          <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-center">
            +
          </div>
          <button
            className="text-blue-500 ml-2 disabled:opacity-20"
            onClick={() => setShowAdd(true)}
            disabled={editId}
          >
            Add Bookmark
          </button>
        </div>
      )}

      {showAdd && (
        <div className="flex items-center mt-4 grow w-full">
          <div className="flex w-full">
            <p className="text-sm  ml-1 mt-0.5">Name:</p>
            <input
              type="text"
              name="name"
              value={newBookmark.name}
              onChange={handleBookmarkChange}
              className="ml-1 text-sm  w-80 border-b  bg-gray-700 rounded"
            />
            <p className="text-sm  ml-1 mt-0.5">URL:</p>
            <input
              type="text"
              name="url"
              value={newBookmark.url}
              onChange={handleBookmarkChange}
              className="ml-1 text-sm w-full border-b  bg-gray-700 rounded"
            />
            <button
              className="ml-5 text-blue-500 ml-1"
              onClick={() => addBookmark()}
            >
              Add
            </button>
            <button
              className="ml-5 text-red-500 ml-1"
              onClick={() => {
                setShowAdd(false);
                setNewBookmark({
                  id: "",
                  name: "",
                  url: "",
                  icon: null,
                });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkSettings;
