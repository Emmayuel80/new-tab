import React from "react";

const Settings = () => {
  React.useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settings"));
    if (!settings) {
      localStorage.setItem("settings", JSON.stringify({}));
    }
  }, []);

  return <div></div>;
};

export default Settings;
