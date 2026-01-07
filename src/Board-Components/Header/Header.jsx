import { useState, useEffect } from "react";
import "./Header.css";
import {
  MagnifyingGlassIcon,
  SelectionBackgroundIcon,
  XIcon,
  ArrowBendUpLeftIcon,
} from "@phosphor-icons/react";
import Picture from "./default_picture.jpg";

const unsplashFetchURL =
  "https://api.unsplash.com/photos/random?count=10&client_id=OHIYPwO7PbAph1p5sa6rM3E1hK5LmG-I8IugGOMU-O0";

const Banner = () => {
  const [searchValue, setSearchValue] = useState("");
  const [bgMenu, setBgMenu] = useState("");
  const [photos, setPhotos] = useState([]);
  const [background, setBackground] = useState(null);

  const handleSearch = (e) => {
    if (e.key == "Enter") {
      alert("caut");
    }
  };

  const handleBlur = () => {
    setSearchValue("");
  };

  const handleButtonClick = () => {
    setBgMenu((prev) => (prev == "" ? "Home" : ""));
  };

  const handleChangeBackground = (src) => {
    setBackground(src);
  };

  const fetchPhotos = async () => {
    const res = await fetch(
      "https://api.pexels.com/v1/curated?per_page=100&query=landscape",
      {
        headers: {
          Authorization:
            "18GWqIrUwAJSFlXqDk0Cpnz7VleRTd5UvcMETL5dhW5JvMQX62QLr2G1",
        },
      }
    );
    const data = await res.json();
    setPhotos(data.photos);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

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
            <div
              className={`bgMenu_container ${
                bgMenu == "Pictures" ? "big" : ""
              }`}
            >
              <div className="bgMenu_header">
                {bgMenu != "Home" && (
                  <div
                    className="bgMenu_button"
                    onClick={() => {
                      setBgMenu("Home");
                    }}
                  >
                    <ArrowBendUpLeftIcon />
                  </div>
                )}
                {bgMenu == "Home" && (
                  <div className="bgMenu_button" style={{ opacity: 0 }}></div>
                )}

                {bgMenu == "Home" && (
                  <div className="bgMenu_title">Change Background</div>
                )}
                {bgMenu != "Home" && (
                  <div className="bgMenu_title">{bgMenu}</div>
                )}
                <div
                  className="bgMenu_button"
                  onClick={() => {
                    setBgMenu("");
                  }}
                >
                  <XIcon />
                </div>
              </div>
              {bgMenu == "Home" && (
                <div className="bgMenu_home">
                  <div className="bgMenu_content">
                    <div
                      className="selection_container"
                      onClick={() => {
                        setBgMenu("Pictures");
                      }}
                    >
                      <div className="selection_image">
                        <img src={Picture} alt="Landscape Picture" />
                      </div>
                      <div className="selection_title">Pictures</div>
                    </div>
                    <div
                      className="selection_container"
                      onClick={() => {
                        setBgMenu("Colors");
                      }}
                    >
                      <div className="selection_image"></div>
                      <div className="selection_title">Colors</div>
                    </div>
                  </div>
                  {/* TO DO */}
                  <div className="bgMenu_custom"></div>
                </div>
              )}
              {bgMenu == "Pictures" && (
                <div className="bgMenu_pictures">
                  {photos.map((val) => (
                    <div
                      className="photo_image"
                      key={val.id}
                      onClick={() => handleChangeBackground(val.src.original)}
                    >
                      <img src={val.src.medium} alt="pula"></img>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className="main-bg"
        style={{
          backgroundImage: `url(${background})`,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      ></div>
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
