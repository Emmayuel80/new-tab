import React from "react";
import {
  getImageFromIndexedDB,
  saveImageToIndexedDB,
} from "../../services/indexedDB";

const GeneralSettings = () => {
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const [bgImageName, setBgImageName] = React.useState("");

  async function fetchBackgroundImage() {
    const wallpaper = await getImageFromIndexedDB("wallpaper");
    if (wallpaper) {
      setBackgroundImage(wallpaper.imageBlob);
      setBgImageName(wallpaper.name);
    }
  }

  function handleUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    // check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Error: Please upload an image file");
      return;
    }
    reader.onload = async () => {
      const blob = new Blob([reader.result], { type: file.type });
      await saveImageToIndexedDB(blob, "wallpaper", file.name);
      setBackgroundImage(blob);
      setBgImageName(file.name);

      document.body.style.backgroundImage = `url(${URL.createObjectURL(blob)})`;
    };
    reader.readAsArrayBuffer(file);
  }

  React.useEffect(() => {
    fetchBackgroundImage();
  }, []);
  return (
    <div>
      <div className="flex items-center mt-5 mb-2">
        <div className="flex items-center justify-between w-full">
          <span className="text-l font-bold text-white">Background Image</span>
          {backgroundImage && (
            <>
              <img
                src={URL.createObjectURL(backgroundImage)}
                alt="Background"
                className="w-10 h-10 rounded-md"
              />
              <span className="text-white ml-2">{bgImageName}</span>
            </>
          )}
          <label
            htmlFor="backgroundImage"
            className="bg-gray-700 p-2 rounded-md cursor-pointer"
          >
            Upload
          </label>
          <input
            type="file"
            id="backgroundImage"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
