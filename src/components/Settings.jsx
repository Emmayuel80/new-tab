import React from "react";
import { FiSettings } from "react-icons/fi";
import Modal from "./Modal";
import GeneralSettings from "./settings/GeneralSettings";
import { getImageFromIndexedDB } from "../services/indexedDB";

const Settings = () => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settings"));
    if (!settings) {
      localStorage.setItem("settings", JSON.stringify({}));
    }

    // Set background image
    const wallpaper = getImageFromIndexedDB("wallpaper");
    wallpaper.then((data) => {
      if (data) {
        document.body.style.backgroundImage = `url(${URL.createObjectURL(
          data.imageBlob
        )})`;
      }
    });
  }, []);

  return (
    <>
      <div
        className="absolute top-0 left-0 p-5 hover:bg-slate-800 rounded-md cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <FiSettings className="w-6 h-6 mx-auto text-white" />
      </div>
      <Modal title={"General Settings"} open={open} setOpen={setOpen}>
        <GeneralSettings />
      </Modal>
    </>
  );
};

export default Settings;
