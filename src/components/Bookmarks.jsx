import React from "react";
import getDomain from "../services/getDomain";
import Modal from "./Modal";
import BookmarkSettings from "./settings/BookmarkSettings";
import { FiBookmark, FiEdit } from "react-icons/fi";
import { RiContractLeftLine, RiContractRightLine } from "react-icons/ri";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = React.useState([]);
  const [collapsed, setCollapsed] = React.useState(false);
  const [showAdd, setShowAdd] = React.useState(false);
  const [showEditIcon, setShowEditIcon] = React.useState(false);

  function handleCollapse() {
    setCollapsed(!collapsed);
    const settings = JSON.parse(localStorage.getItem("settings"));
    if (!settings?.bookmarks) {
      settings.bookmarks = {};
    }
    settings.bookmarks.collapsed = !collapsed;
    localStorage.setItem("settings", JSON.stringify(settings));
  }

  React.useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    const settings = JSON.parse(localStorage.getItem("settings"));
    if (settings?.bookmarks) {
      setCollapsed(settings.bookmarks.collapsed);
    }
    if (bookmarks) {
      setBookmarks(bookmarks);
    }
  }, []);

  return (
    <div>
      <div
        onMouseEnter={() => setShowEditIcon(true)}
        onMouseLeave={() => setShowEditIcon(false)}
      >
        <button
          className={`text-white p-2 m-2 ${
            showEditIcon ? "opacity-100" : "opacity-0"
          } transition-opacity ease-in-out delay-50 duration-300`}
          onClick={() => setShowAdd(true)}
        >
          <FiEdit className="w-6 h-6 mx-auto" />
        </button>
        <div
          className={`transition-all ${
            collapsed ? "max-w-20" : "max-w-sm"
          } bg-gray-800 rounded-r-xl shadow-md overflow-hidden`}
        >
          <div className="flex items-center mt-5 mb-2">
            <FiBookmark className="w-8 h-8 mx-auto text-white" />
            {!collapsed && (
              <span className="text-xl mr-3 text-white">Bookmarks</span>
            )}
          </div>
          <button
            className="w-full bg-gray-700 text-white p-2"
            onClick={() => handleCollapse()}
          >
            {!collapsed ? (
              <RiContractLeftLine className="w-6 h-6 mx-auto" />
            ) : (
              <RiContractRightLine className="w-6 h-6 mx-auto" />
            )}
          </button>
          <div
            className={`p-2" max-h-640 overflow-y-auto overflow-x-hidden mb-2`}
          >
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
                {!collapsed && (
                  <div className="ml-4">
                    <h2 className="text-white text-lg">{bookmark.name}</h2>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal title="Bookmarks" open={showAdd} setOpen={setShowAdd}>
        <BookmarkSettings />
      </Modal>
    </div>
  );
};

export default Bookmarks;
