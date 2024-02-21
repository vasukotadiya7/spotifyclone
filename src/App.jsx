/* eslint-disable quotes */
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie";
import { useState } from "react";

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components";
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
  Login,
  Register,
  Forrgot,
  Verify,
} from "./pages";

const App = () => {
  const [password, setPassword] = useState(null);
  const [useremail, setUseremail] = useState(null);
  const [user, setUser] = useState(null);
  // const auth = getAuth(app);
  // console.log(auth);

  const { activeSong } = useSelector((state) => state.player);
  const [cookies, setCookie, removeCookie] = useCookies([
    "useremail",
    "password",
  ]);
  // setCookie("valid", false, { path: "/", maxAge: 604800 });
  const Navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setCookie("useremail", useremail, { path: "/", maxAge: 604800 });
    setCookie("password", password, { path: "/", maxAge: 604800 });
  };
  // if (cookies.useremail) {
  //   Navigate("/verify");
  //   // window.location.href = "/verify";
  // }
  return (
    <CookiesProvider>
      {cookies.useremail ? (
        <div className="relative flex">
          <Sidebar removeCookie={removeCookie} cookies={cookies} />
          <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
            <Searchbar />

            <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
              <div className="flex-1 h-fit pb-40">
                <Routes>
                  <Route path="/" element={<Discover />} />
                  <Route path="/top-artists" element={<TopArtists />} />
                  <Route path="/top-charts" element={<TopCharts />} />
                  <Route path="/around-you" element={<AroundYou />} />
                  <Route path="/artists/:id" element={<ArtistDetails />} />
                  <Route path="/songs/:songid" element={<SongDetails />} />
                  <Route path="/search/:searchTerm" element={<Search />} />
                </Routes>
              </div>
              <div className="xl:sticky relative top-0 h-fit">
                <TopPlay />
              </div>
            </div>
          </div>

          {activeSong?.title && (
            <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
              <MusicPlayer />
            </div>
          )}
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Login
                cookies={cookies}
                setCookie={setCookie}
                useremail={useremail}
                password={password}
                handleSubmit={handleSubmit}
                setUseremail={setUseremail}
                setPassword={setPassword}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                cookies={cookies}
                setCookie={setCookie}
                useremail={useremail}
                password={password}
                handleSubmit={handleSubmit}
                setUseremail={setUseremail}
                setPassword={setPassword}
              />
            }
          />
          <Route
            path="/verify"
            element={
              <Verify
                cookies={cookies}
                setCookie={setCookie}
                useremail={useremail}
                password={password}
                handleSubmit={handleSubmit}
                setUseremail={setUseremail}
                setPassword={setPassword}
              />
            }
          />
          <Route
            path="/forrgot"
            element={
              <Forrgot
                cookies={cookies}
                setCookie={setCookie}
                setUseremail={setUseremail}
                useremail={useremail}
              />
            }
          />
          {/* <Route path="/:any" element={<Login />} /> */}
        </Routes>
      )}
    </CookiesProvider>
  );
};

export default App;
