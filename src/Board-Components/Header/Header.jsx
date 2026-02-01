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
import ColorThief from "colorthief";
import { hexToRGB, getAverageRGB } from "../../utils";

const getContrastColor = (rgbArray) => {
  if (!rgbArray) return "white";
  // Readable Brightness formula
  const brightness =
    (rgbArray[0] * 299 + rgbArray[1] * 587 + rgbArray[2] * 114) / 1000;
  return brightness > 239 ? "black" : "white";
};

const unsplashFetchURL =
  "https://api.unsplash.com/photos/random?count=30&orientation=landscape&query=wallpaper,landscape,background&client_id=OHIYPwO7PbAph1p5sa6rM3E1hK5LmG-I8IugGOMU-O0";
const Banner = ({ setBackground, setHeaderColor }) => {
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
    "to right, #ddd6f3, #faaca8",
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
    }, 500);
    const img = new Image();
    img.src = src;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);
      setHeaderColor(color);

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
              onBlur={() => {
                setBgMenu("");
              }}
              tabIndex="-1"
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
                          console.log(val.urls.full);
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
                          const template = /#(\w{6})/g;
                          const gradientColors = val.match(template);
                          const color1 = hexToRGB(gradientColors[0]);
                          const color2 = hexToRGB(gradientColors[1]);

                          const average = getAverageRGB(color1, color2);

                          setHeaderColor(average);
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

const Header = ({ setBackground, boardName, setBoardName }) => {
  const [headerColor, setHeaderColor] = useState(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    titleInputRef.current.innerText = boardName;
  }, [boardName]);

  return (
    <>
      <Banner setBackground={setBackground} setHeaderColor={setHeaderColor} />
      <div
        className="header_container"
        style={{
          backgroundColor: headerColor
            ? `rgba(${headerColor[0]}, ${headerColor[1]}, ${headerColor[2]}, 0.4)`
            : "",
        }}
      >
        <div className="header_left">
          <div
            ref={titleInputRef}
            contentEditable="true"
            onBlur={(e) => {
              const newName = e.currentTarget.innerText.trim();
              if (newName) setBoardName(newName);
              else {
                setBoardName("Untitled Board");
                e.currentTarget.innerText = "Untitled Board";
              }
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
                e.currentTarget.blur();
              }
            }}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className="header_title"
            data-gram="false" // to block browser extensions
            // style={{ color: getContrastColor(headerColor) }}
          ></div>
        </div>
        <div className="header_right"></div>
      </div>
    </>
  );
};

export default Header;
