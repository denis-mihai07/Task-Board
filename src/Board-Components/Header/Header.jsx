import { useState, useEffect, useRef } from "react";
import "./Header.css";
import {
  MagnifyingGlassIcon,
  SelectionBackgroundIcon,
  XIcon,
  ArrowBendUpLeftIcon,
  CheckIcon,
  SpinnerIcon,
} from "@phosphor-icons/react";
import Picture from "./default_picture.jpg";

const unsplashFetchURL =
  "https://api.unsplash.com/photos/random?count=30&orientation=landscape&query=wallpaper,landscape,background&client_id=OHIYPwO7PbAph1p5sa6rM3E1hK5LmG-I8IugGOMU-O0";
const Banner = ({ setBackground }) => {
  const [searchValue, setSearchValue] = useState("");

  const [bgMenu, setBgMenu] = useState("");
  const bgMenuFirstApp = useRef(false);

  const [photos, setPhotos] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState([
    "to right, #43cea2, #185a9d",
    "to right, #83a4d4, #b6fbff",
    "to right, #70e1f5, #ffd194",
    "to right, #6441a5, #2a0845",
    "to right, #780206, #061161",
    "to right, #fbd3e9, #bb377d",
    "to right, #606c88, #3f4c6b",
    "to right, #c9ffbf, #ffafbd",
    "to right, #b993d6, #8ca6db",
    "to right, #870000, #190a05",
    "to right, #00d2ff, #3a7bd5",
    "to right, #f2709c, #ff9472",
  ]);
  const [cooldown, setCooldown] = useState(false);

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
    setIsLoading(true);
    setCooldown(true);
    setTimeout(() => {
      setCooldown(false);
    }, 2100);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setBackground(src);
      setIsLoading(false);
    };
  };

  const fetchPhotos = async () => {
    // const res = await fetch(
    //   "https://api.pexels.com/v1/curated?per_page=100&query=landscape",
    //   {
    //     headers: {
    //       Authorization:
    //         "18GWqIrUwAJSFlXqDk0Cpnz7VleRTd5UvcMETL5dhW5JvMQX62QLr2G1",
    //     },
    //   }
    // );
    const res = await fetch(unsplashFetchURL);
    const data = await res.json();
    setPhotos(data);
    console.info("Unsplash API has been fetched.");
  };

  useEffect(() => {
    if (bgMenu && !bgMenuFirstApp.current) {
      fetchPhotos();
      bgMenuFirstApp.current = true;
    }
  }, [bgMenu]);

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
                bgMenu == "Pictures" || bgMenu == "Colors" ? "big" : ""
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
                  <div
                    className="bgMenu_button"
                    style={{ opacity: 0, cursor: "default" }}
                  ></div>
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
                      className={`photo_image 
                          ${val.id == selectedID ? "selected" : ""}
                          ${isLoading ? "rotating" : ""}
                        `}
                      key={val.id}
                      onClick={() => {
                        if (!cooldown) {
                          handleChangeBackground(val.urls.full);
                          setSelectedID(val.id);
                        }
                      }}
                    >
                      {val.id == selectedID && !isLoading && <CheckIcon />}
                      {val.id == selectedID && isLoading && <SpinnerIcon />}
                      <img
                        src={val.urls.thumb}
                        alt="Landscape Background Picture"
                      ></img>
                    </div>
                  ))}
                </div>
              )}
              {bgMenu == "Colors" && (
                <div className="bgMenu_pictures">
                  {colors.map((val, id) => (
                    <div
                      className={`photo_image ${
                        id == selectedID ? "selected" : ""
                      }`}
                      style={{ background: `linear-gradient(${val})` }}
                      key={id}
                      onClick={() => {
                        if (!cooldown) {
                          setBackground(val);
                          setSelectedID(id);
                        }
                      }}
                    >
                      {id == selectedID && <CheckIcon />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Header = ({ setBackground }) => {
  return (
    <>
      <Banner setBackground={setBackground} />
    </>
  );
};

export default Header;
