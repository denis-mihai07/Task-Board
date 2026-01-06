import { useState } from "react";
import "./Header.css";
import {
  MagnifyingGlassIcon,
  SelectionBackgroundIcon,
  XIcon,
  ArrowBendUpLeftIcon,
} from "@phosphor-icons/react";
import Picture from "./default_picture.jpg";

const Banner = () => {
  const [searchValue, setSearchValue] = useState("");
  const [bgMenu, setBgMenu] = useState("");

  const handleSearch = (e) => {
    if (e.key == "Enter") {
      alert("caut");
    }
  };

  const handleBlur = () => {
    setSearchValue("");
  };

  const handleButtonClick = () => {
    setBgMenu((prev) => (prev == "" ? "home" : ""));
  };

  return (
    <>
      <div className="banner-container">
        <div className="banner_start">
          <div className="logo">Task Board</div>
        </div>
        <div className="banner_center">
          <div className="search_bar">
            <MagnifyingGlassIcon />
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
              onBlur={handleBlur}
              className="search_input"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            ></input>
          </div>
        </div>
        <div className="banner_end">
          <div className="bg_button" onClick={handleButtonClick}>
            <SelectionBackgroundIcon />
          </div>
          {bgMenu && (
            <div className="bgMenu_container">
              <div className="bgMenu_header">
                <div className="bgMenu_button">
                  <ArrowBendUpLeftIcon />
                </div>
                <div className="bgMenu_title">Change Background</div>
                <div className="bgMenu_button">
                  <XIcon />
                </div>
              </div>
              {bgMenu == "home" && (
                <div className="bgMenu_home">
                  <div className="bgMenu_content">
                    <div
                      className="selection_container"
                      onClick={() => {
                        setBgMenu("pictures");
                      }}
                    >
                      <div className="selection_image">
                        <img src={Picture} alt="Landscape Picture" />
                      </div>
                      <div className="selection_title">Pictures</div>
                    </div>
                    <div className="selection_container">
                      <div className="selection_image"></div>
                      <div className="selection_title">Colors</div>
                    </div>
                  </div>
                  {/* TO DO */}
                  <div className="bgMenu_custom"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Header = () => {
  return (
    <>
      <Banner />
    </>
  );
};

export default Header;
