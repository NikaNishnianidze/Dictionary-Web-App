import { useState } from "react";
import logo from "../../public/assets/logo.svg";
import dropDown from "../../public/assets/icon-arrow-down.svg";
import moonIcon from "../../public/assets/icon-moon.svg";
import { useEffect } from "react";

type TFontType = "sans" | "serif" | "mono";

const fontClasses = {
  sans: "font-sans-custom",
  serif: "font-serif-custom",
  mono: "font-mono-custom",
};

const fontNames = {
  sans: "Sans",
  serif: "Serif",
  mono: "Mono",
};

const Header: React.FC = () => {
  const [font, setFont] = useState<TFontType>("sans");
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    const html = document.documentElement;
    if (!darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  return (
    <header className="flex py-[24px] px-[24px] items-center justify-between">
      <div className="logo">
        <img src={logo} alt="logo icon" className="w-[28px] h-[32px]" />
      </div>
      <div className="relative flex items-center">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-[18px] px-4 py-2 text-[14px] text-[#2D2D2D] font-bold  dark:text-[#fff] hover:text-[#A445ED]"
        >
          {fontNames[font]}
          <img
            src={dropDown}
            alt="Arrow"
            className={`w-4 h-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute  mt-42 right-24 bg-white rounded-[16px] shadow-dropdown bg-dropdown dark:bg-dropdown-dark dark:shadow-dropdown-dark z-10 w-40">
            {(["sans", "serif", "mono"] as TFontType[]).map((type) => (
              <div
                key={type}
                onClick={() => {
                  setFont(type);
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#2D2D2D] dark:text-[#fff] text-[14px] font-bold hover:text-[#A445ED] dark:hover:bg-dropdown-dark dark:rounded-[16px] "
              >
                {fontNames[type]}
              </div>
            ))}
          </div>
        )}
        <div className="rectangle border-r-[1px] border-[#E9E9E9] w-[1px] h-[32px]"></div>
        <div className="themes flex flex-row justify-end items-center gap-[8px] ml-[26px]">
          <label className="switch">
            <input
              type="checkbox"
              className="checkbox"
              onClick={toggleDarkMode}
            />
            <span className="slider"></span>
          </label>
          <img src={moonIcon} alt="moon icon" className="moon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
