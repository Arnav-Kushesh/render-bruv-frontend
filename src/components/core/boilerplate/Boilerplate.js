import { useEffect, useRef, useState } from "react";

import Context from "../../../Context.js";
import DynamicForm from "../../helperComponents/dynamicForm/DynamicForm.js";
import getUserId from "../../../controllers/getUserId.js";

import { serverLine } from "../../../controllers/network/serverLine.js";
import logout from "../../../controllers/logout.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import goTo from "../../../controllers/goTo.js";
import updateRouteState from "../../../controllers/updateRouteState.js";
import LoadingSection from "../../helperComponents/LoadingSection.js";
import getHostName from "../../../controllers/getHostName.js";

import styled from "styled-components";
import WithBackground from "./WithBackground.js";
import { createTheme, ThemeProvider } from "@mui/material";

import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import uploadGoogleAuthAccessToken from "../../../controllers/auth/uploadGoogleAuthAccessToken.js";
import { getOnboardingComponent } from "../../../controllers/getOnboardingComponent.js";
import CustomLabel from "../../applicationUI/customLabel/CustomLabel.js";

window.nonReactLikeStatus = {};

//Main scrollable div
const CustomSafeArea = styled.div`
  position: relative;
  height: 100dvh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  overflow-y: scroll;
`;

let checkNotificationInMins = 10;

function Boilerplate({ children }) {
  const mainScrollRef = useRef(null);
  const [isFirefox, setIsFirefox] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [formData, setFormData] = useState(false);
  const [notificationData, setNotificationData] = useState({
    general: 0,
    work: 0,
  });
  const [loginStatus, setLoginStatus] = useState("LOADING");

  const [popupFeedItem, setPopupFeedItem] = useState(null);

  const alert = (message) => {
    toast(message);
  };
  const [colorMode, setColorMode] = useState("LIGHT_GLASS");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [adminSettings, setAdminSettings] = useState({});

  let currentPath = window.location.pathname + window.location.search;
  const [currentRoute, setCurrentRoute] = useState(currentPath);
  let initialNonPopupRoute = currentPath;
  const [nonPopupRoute, setNonPopupRoute] = useState(initialNonPopupRoute);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [notificationCount, setNotificationCount] = useState(0);
  const [moderatorList, setModeratorList] = useState([]);

  console.log("loggedInUserId", loggedInUserId);

  useEffect(() => {
    if (loggedInUserId)
      serverLine.get("/admin-data/?type=MODERATOR_LIST").then((newData) => {
        if (newData) {
          if (newData.data) setModeratorList(newData.data);
        }
      });
  }, [loggedInUserId]);

  const doGoogleLoginForWeb = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
      let accessToken = res.access_token;
      uploadGoogleAuthAccessToken(accessToken);
    },
  });

  window.doGoogleLoginForWeb = doGoogleLoginForWeb;

  useEffect(() => {
    function isFirefox() {
      return navigator.userAgent.toLowerCase().includes("firefox");
    }

    setIsFirefox(isFirefox());
  }, []);

  useEffect(() => {
    if (loggedInUserId) {
      console.log("loggedInUserId", loggedInUserId);

      if (window.notificationInterval)
        window.clearInterval(window.notificationInterval);

      fetchNotificationCount();

      window.notificationInterval = setInterval(
        () => {
          fetchNotificationCount();
        },
        checkNotificationInMins * 60 * 1000
      );
    }
  }, [loggedInUserId]);

  function fetchNotificationCount() {
    if (loggedInUserId)
      serverLine.get("/notifications-count").then(setNotificationCount);
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);

  window.setNonPopupRoute = setNonPopupRoute;
  window.setCurrentRoute = setCurrentRoute;
  window.setForm = setForm;

  window.doAlert = alert;
  window.loggedInUserId = loggedInUserId;
  window.loggedInUser = loggedInUser;
  window.homeLink = window.location.protocol + "//" + getHostName();
  window.updateLoggedInUser = updateLoggedInUser;

  function updateNotificationData() {
    if (loggedInUserId)
      serverLine.get("/notification-count").then(setNotificationData);
  }

  useEffect(() => {
    let theFunc = (theEvent) => {
      let newURl = window.location.pathname + window.location.search;

      updateRouteState(newURl);
    };

    window.addEventListener("popstate", theFunc);

    return () => {
      window.removeEventListener("popstate", theFunc);
    };
  }, []);

  useEffect(() => {
    doInitialLoad();
  }, []);

  window.doInitialLoad = doInitialLoad;

  async function doInitialLoad() {
    setLoggedInUser(null);

    let userId = await getUserId();

    console.log("userId", userId);

    if (userId) {
      setLoginStatus("LOGGED_IN");
      setLoggedInUserId(userId);
      updateLoggedInUser();
    } else {
      setLoggedInUserId(false);
      setLoginStatus("LOGGED_OUT");
    }

    removeFormQuery();
    backFeatures();

    let newStatus = localStorage.getItem("render-bruv-color-mode");
    if (!newStatus) newStatus = "LIGHT_GLASS";
    updateColorMode(newStatus);
  }

  if (loginStatus == "LOADING") {
    children = <LoadingSection />;
  }

  if (loggedInUserId) {
    if (!loggedInUser) {
      children = <LoadingSection />;
    } else {
      let onboardingComponent = getOnboardingComponent(loggedInUser);

      console.log("onboardingComponent", onboardingComponent);
      if (onboardingComponent) children = onboardingComponent;
    }
  }

  window.popupAlert = alert;

  window.popupError = (err) => {
    if (err) {
      if (err.message) {
        alert(err.message);
      } else {
        alert("An Error Occurred");
      }
    }
  };

  let themeState = getColors(colorMode);

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: themeState.accent,
        dark: themeState.accent,
      },
      secondary: {
        main: themeState.accent,
      },
    },
  });

  if (isFirefox)
    children = (
      <CustomLabel>
        <br />
        <br />
        <br />
        Please! use chrome to have the best experience
      </CustomLabel>
    );

  // children = "hloo";
  return (
    <ThemeProvider theme={theme}>
      <Context.Provider
        value={{
          notificationCount,
          setNotificationCount,
          fetchNotificationCount,
          themeState,
          innerWidth,
          isMobile: innerWidth <= 900,
          adminSettings,
          moderatorList,
          nonPopupRoute,
          setNonPopupRoute,
          currentRoute,
          setLoggedInUser,

          loggedInUserId,
          popupFeedItem,
          setPopupFeedItem,
          notificationData,
          setNotificationData,
          updateNotificationData,

          popupAlert: alert,
          updateLoggedInUser: updateLoggedInUser,

          loggedInUser: loggedInUser,
          updateColorMode,
          colorMode,
          setForm: setForm,
          mainScrollRef,
          //
        }}
      >
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
          <WithBackground>
            <CustomSafeArea id="main-scrollable-container" ref={mainScrollRef}>
              {children}
              <DynamicForm setForm={setForm} data={formData} />
            </CustomSafeArea>
          </WithBackground>
        </GoogleOAuthProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Context.Provider>
    </ThemeProvider>
  );

  function updateColorMode(newStatus) {
    setColorMode(newStatus);
    setColors(newStatus);
    localStorage.setItem("render-bruv-color-mode", newStatus);
  }

  function getColors(newStatus) {
    let darkSimple = {
      //New Colors
      mainBackground: "#000000",
      gradientSurface: "linear-gradient(115deg, #ffffff12, #ffffff00)",
      surface: "rgba(255, 255, 255, 0.08)",
      surface2: "rgba(255, 255, 255, 0.06)",
      surface3: "rgba(255, 255, 255, 0.05)",
      surfaceSolid: "rgba(28, 28, 28, 1)",
      accentSurface: "#3f6ef1cf", // updated blue shade
      accentSurfaceSubtle: "#3f6ef117", // subtle #3f6ef1 tint

      //header start
      headerSurface: "#1111119b",
      headerElement: "#fff",
      headerActiveSurface: "#ffffffff",
      headerActiveElement: "#000000ff",
      headerElementDim: "rgba(255,255,255,0.7)",
      headerAccent: "#3f6ef1",
      headerAccentAlt: "#111",
      headerBorder: "#0f2b7987",
      //header end

      primaryButtonShadow: "0px 3px 20px 0px #1c84fb2b",
      borderIntense: "rgba(255, 254, 252, 0.14)",
      shadowIntense: "rgba(255, 254, 252, 0.14)",

      border: "rgba(255, 254, 252, 0.15)",
      solidShadow: "#a3a3a330",
      borderDim: "rgba(234, 234, 232, 0.1)",
      borderAccent: "#3f6ef110", // updated bluish border
      mapAccent: "#3f6ef1",
      accent: "#3f6ef1",
      accentGradient: "linear-gradient(45deg, #ada8fa, #879efb)", // variation of #3f6ef1
      accentDim: "rgba(63, 110, 241, 0.27)", // muted version of #3f6ef1
      accentAlt: "#111111",

      element: "rgb(255, 252, 246)",
      elementDim: "rgba(234, 233, 231, 0.79)",
      elementDim2: "rgba(234, 233, 231, 0.39)",
      elementAlt: "#000000",
      blurryBackground: "#444",

      //Active
      activeElement: "#ffffffff",
      activeSurface: "#1c1c1cff",
      activeElement2: "#000000ff",
      activeSurface2: "#ffffffff",
      shadow: "unset",
      shadow2: "unset",
    };

    let lightSimple = {
      // mainBackground: "rgba(246, 246, 246, 1)",
      mainBackground: "#F4F4F4",
      gradientSurface: "rgba(0, 0, 0, 0.05)",
      surface: "rgba(255, 255, 255, 1)",
      surface2: "rgba(247, 247, 247, 1)",
      surface3: "rgba(0, 0, 0, 0.02)",
      surfaceSolid: "rgba(237, 237, 237, 1)",
      accentSurface: "#3f6ef122", // lighter tint of #3f6ef1
      accentSurfaceSubtle: "#c0d0fc7c",

      headerSurface: "#ffffffff",
      headerElement: "#000000ff",
      headerActiveSurface: "#000000ff",
      headerActiveElement: "#ffffffff",
      headerElementDim: "rgba(0,0,0,0.7)",
      headerAccent: "#3f6ef1",
      headerAccentAlt: "#ffffffff",
      headerBorder: "#06267e5b",

      primaryButtonShadow: "2px 6px 15px 3px #4b9fffbd",

      border: "rgba(0, 0, 0,0.2)",
      borderIntense: "rgba(0, 0, 0, 0.85)",
      shadowIntense: "rgba(0, 0, 0, 0.84)",
      solidShadow: "rgba(52, 52, 52, 0.18)",

      borderDim: "rgba(0, 0, 0, 0.1)",
      borderAccent: "rgba(234, 234, 232, 0.1)",
      blurryBackground: "#f0f8ff",
      mapAccent: "#3f6ef1",
      accent: "#3f6ef1",

      accentDim: "rgba(63, 110, 241, 0.31)",
      accentAlt: "#f0f8ff",

      element: "rgba(1, 10, 22, 1)",
      elementDim: "rgba(35, 45, 60, 0.72)",
      elementDim2: "rgba(35, 45, 60, 0.52)",
      elementAlt: "rgba(255, 255, 255, 0.89)",

      shadow: "0 3px 0 0 #000",
      shadow2: "unset",
      //Selected
      activeElement: "#000000ff",
      activeSurface: "#ffffffff",
      activeElement2: "#ffffffff",
      activeSurface2: "#000000ff",
      accentGradient: "linear-gradient(45deg, #ada8fa, #879efb)",
    };

    let lightGlass = {
      // mainBackground: "rgba(246, 246, 246, 1)",
      mainBackground: "#F4F4F4",
      gradientSurface: "rgba(0, 0, 0, 0.05)",
      surface:
        "linear-gradient(45deg,rgba(255, 255, 255, 0.18),rgba(255, 255, 255, 0.57))",
      surface2: "rgba(247, 247, 247, 0.81)",
      surface3: "rgba(255, 255, 255, 0.39)",
      surfaceSolid: "rgba(237, 237, 237, 1)",
      accentSurface: "#3f6ef122", // lighter tint of #3f6ef1
      accentSurfaceSubtle: "#c0d0fc7c",

      headerSurface: "#ffffff84",
      headerElement: "#000000ff",
      headerActiveSurface: "#fff",
      headerActiveElement: "#000000ff",
      headerElementDim: "rgba(0,0,0,0.7)",
      headerAccent: "#3f6ef1",
      headerAccentAlt: "#ffffffff",
      headerBorder: "#06267e5b",

      primaryButtonShadow: "2px 6px 15px 3px #4b9fffbd",

      border: "rgba(255, 255, 255, 0.67)",
      borderIntense: "rgba(255, 255, 255, 0.85)",
      shadowIntense: "rgba(0, 0, 0, 0.84)",
      solidShadow: "rgba(52, 52, 52, 0.18)",

      borderDim: "rgba(255, 255, 255, 0.5)",
      borderAccent: "rgba(234, 234, 232, 0.1)",
      blurryBackground: "#f0f8ff",
      mapAccent: "#3f6ef1",
      accent: "#3f6ef1",
      accentGradient: "linear-gradient(45deg, #ada8fa, #879efb)",
      accentDim: "rgba(63, 110, 241, 0.31)",
      accentAlt: "#f0f8ff",

      element: "rgba(1, 10, 22, 1)",
      elementDim: "rgba(35, 45, 60, 0.72)",
      elementDim2: "rgba(35, 45, 60, 0.52)",
      elementAlt: "rgba(255, 255, 255, 0.89)",

      shadow: "0 3px 10px 0 #0000002c",
      shadow2: "0 1px 15px 0 rgba(0, 0, 0, 0.14)",
      //Active
      activeElement: "#000000ff",
      activeSurface: "#ffffffff",
      activeElement2: "#000000ff",
      activeSurface2: "#ffffffff",
    };

    let darkGlass = {
      //New Colors
      mainBackground: "#000000",
      gradientSurface: "linear-gradient(115deg, #ffffff12, #ffffff00)",
      surface: "rgba(255, 255, 255, 0.07)",
      surface2: "rgba(255, 255, 255, 0.06)",
      surface3: "rgba(255, 255, 255, 0.05)",
      surfaceSolid: "rgba(28, 28, 28, 1)",
      accentSurface: "#3f6ef1cf", // updated blue shade
      accentSurfaceSubtle: "#3f6ef117", // subtle #3f6ef1 tint

      //header start
      headerSurface: "#dddddd1c",
      headerElement: "#fff",
      headerActiveSurface: "#ffffffff",
      headerActiveElement: "#000000ff",
      headerElementDim: "rgba(255,255,255,0.7)",
      headerAccent: "#3f6ef1",
      headerAccentAlt: "#111",
      headerBorder: "#0f2b7987",
      //header end

      primaryButtonShadow: "0px 3px 20px 0px #1c84fb2b",
      borderIntense: "rgba(255, 254, 252, 0.14)",
      shadowIntense: "rgba(255, 254, 252, 0.14)",

      border: "rgba(255, 254, 252, 0.15)",
      solidShadow: "#a3a3a330",
      borderDim: "rgba(234, 234, 232, 0.1)",
      borderAccent: "#3f6ef110", // updated bluish border
      mapAccent: "#3f6ef1",
      accent: "#3f6ef1",
      accentGradient: "linear-gradient(45deg, #ada8fa, #879efb)", // variation of #3f6ef1
      accentDim: "rgba(63, 110, 241, 0.27)", // muted version of #3f6ef1
      accentAlt: "#111111",

      element: "rgb(255, 252, 246)",
      elementDim: "rgba(234, 233, 231, 0.79)",
      elementDim2: "rgba(234, 233, 231, 0.39)",
      elementAlt: "#000000",
      blurryBackground: "#444",

      shadow: "0 1px 10px 0 rgba(0, 0, 0, 0.4)",
      shadow2: "0 3px 10px 0 rgba(0, 0, 0, 0.4)",
      //Selected
      activeElement: "#ffffffff",
      activeSurface: "#ffffff2e",
      activeElement2: "#000000ff",
      activeSurface2: "#ffffffff",
    };
    //Yellow tint light theme
    //   let lightTheme = {
    //   mainBackground: "rgb(255, 255, 255)", // Pure white (unchanged)
    //   gradientSurface:
    //     "linear-gradient(135deg, rgb(255, 235, 196), rgb(255, 240, 200))", // Peach to cream gradient
    //   surface: "rgb(255, 235, 196)", // Frosted orange glass
    //   surface2: "rgb(255, 246, 226)", // Lighter frosted layer
    //   surface3: "rgba(255, 246, 226, 0.57)", // Subtle orange highlight
    //   surfaceDifferent: "#241a15", // Subtle orange highlight
    //   elementDifferent: "rgb(255, 246, 241)", // Deep saddle brown for contrast

    //   border: "rgba(195, 139, 31, 0.2)",
    //   //
    //   blurryBackground: "rgb(255, 246, 241)",
    //   accent: "rgb(44, 17, 3)", // Vibrant orange
    //   accentAlt: "#e5bb99",

    //   accentDim: "#49190a", // Softened translucent orange
    //   element: "#49190a", // Deep saddle brown for contrast
    //   elementDim: "#49190a", // Muted brown
    //   elementAlt: "#fef6ec", // Accent orange alternative
    // };

    // let darkBlueTheme = {
    //   /* Blueish Dark Theme */
    //   mainBackground: "#0a0f1a", // Deep blue-black base
    //   gradientSurface:
    //     "linear-gradient(135deg, rgba(180, 220, 255, 0.08), rgba(150, 200, 255, 0.01))", // Cool blue gradient
    //   surface: "rgba(170, 210, 255, 0.08)", // Frosted glass effect
    //   surface2: "rgba(160, 200, 255, 0.05)", // Lighter frost
    //   surface3: "rgba(150, 190, 255, 0.03)", // Subtle blue shine

    //   accent: "#8ab6f9", // Soft sky blue
    //   accentDim: "#8ab6f988", // Semi-transparent variant
    //   element: "rgb(170 193 255)", // Pure white elements
    //   elementDim: "rgb(170 193 255 / 50%)",
    //   elementAlt: "#0c2851", // Accent blue alternative

    //   blurryBackground: "#8ab6f988",
    // };

    // let green = {
    //   mainBackground: "#0d1f0d", // Deep forest green
    //   gradientSurface:
    //     "linear-gradient(135deg, rgba(40, 100, 40, 0.3), rgba(20, 80, 20, 0.2))", // Moss gradient
    //   surface: "rgba(60, 140, 60, 0.25)", // Forest canopy green
    //   surface2: "rgba(60, 140, 60, 0.15)", // Mid-tone green layer
    //   surface3: "rgba(60, 140, 60, 0.05)", // Subtle green highlight

    //   accent: "#38c172", // Emerald green
    //   accentDim: "#38c17266", // Softened emerald
    //   element: "#a3eba3", // Misty light green
    //   elementDim: "rgb(143 230 143 / 60%)", // Translucent mist
    //   elementAlt: "#0b4122", // Accent green alternative

    //   blurryBackground: "#38c17266",
    // };

    if (newStatus == "DARK_SIMPLE") return darkSimple;
    if (newStatus == "LIGHT_SIMPLE") return lightSimple;
    if (newStatus == "LIGHT_GLASS") return lightGlass;
    if (newStatus == "DARK_GLASS") return darkGlass;
    // if (newStatus == "DARK_BLUE") return darkBlueTheme;
    // if (newStatus == "GREEN") return green;

    return lightSimple;
  }

  function updateLoggedInUser() {
    try {
      serverLine.get("/logged-in-user").then(setLoggedInUser);
    } catch (e) {
      alert.show(e.message);
      console.log("First Fetch Error----------");
      logout();
    }
  }

  function setColors(newVal) {
    let colors = getColors(newVal);

    // if (newVal) {
    //   if (newVal === "DARK")
    //     colors = {
    //       bgColor: "#111111",
    //       bgColorDark: "#000000",
    //       bgColorLight: "#222222",
    //       bgColor2: "#000000",
    //       color: "#ffffff",
    //       accentColor: "#8c9fbd",
    //       translucent: "rgb(212 226 227 / 6%)",
    //       translucentHard: "rgba(255,255,255,0.2)",
    //     };
    // }

    //New Colors

    document.documentElement.style.setProperty(
      "--headerActiveSurface",
      colors.headerActiveSurface
    );

    document.documentElement.style.setProperty(
      "--headerActiveElement",
      colors.headerActiveElement
    );

    document.documentElement.style.setProperty(
      "--activeSurface2",
      colors.activeSurface2
    );

    document.documentElement.style.setProperty(
      "--activeElement2",
      colors.activeElement2
    );

    document.documentElement.style.setProperty(
      "--activeSurface",
      colors.activeSurface
    );

    document.documentElement.style.setProperty(
      "--activeElement",
      colors.activeElement
    );

    document.documentElement.style.setProperty("--shadow", colors.shadow);

    document.documentElement.style.setProperty("--shadow2", colors.shadow2);

    document.documentElement.style.setProperty(
      "--primaryButtonShadow",
      colors.primaryButtonShadow
    );

    document.documentElement.style.setProperty(
      "--headerBorder",
      colors.headerBorder
    );

    document.documentElement.style.setProperty(
      "--borderAccent",
      colors.borderAccent
    );

    document.documentElement.style.setProperty(
      "--accentSurfaceSubtle",
      colors.accentSurfaceSubtle
    );

    document.documentElement.style.setProperty(
      "--accentGradient",
      colors.accentGradient
    );

    document.documentElement.style.setProperty("--mapAccent", colors.mapAccent);

    document.documentElement.style.setProperty(
      "--accentSurface",
      colors.accentSurface
    );

    document.documentElement.style.setProperty(
      "--surfaceSolid",
      colors.surfaceSolid
    );

    document.documentElement.style.setProperty(
      "--headerElementDim",
      colors.headerElementDim
    );

    document.documentElement.style.setProperty(
      "--elementDim2",
      colors.elementDim2
    );

    document.documentElement.style.setProperty(
      "--headerSurface",
      colors.headerSurface
    );

    document.documentElement.style.setProperty(
      "--headerElement",
      colors.headerElement
    );

    document.documentElement.style.setProperty(
      "--headerAccent",
      colors.headerAccent
    );

    document.documentElement.style.setProperty(
      "--headerAccentAlt",
      colors.headerAccentAlt
    );

    // loginBorder: "rgba(255, 255, 255, 0.08)",

    document.documentElement.style.setProperty(
      "--borderIntense",
      colors.borderIntense
    );
    document.documentElement.style.setProperty(
      "--shadowIntense",
      colors.shadowIntense
    );

    document.documentElement.style.setProperty("--border", colors.border);
    document.documentElement.style.setProperty("--borderDim", colors.borderDim);
    document.documentElement.style.setProperty(
      "--solidShadow",
      colors.solidShadow
    );
    document.documentElement.style.setProperty("--accentAlt", colors.accentAlt);

    document.documentElement.style.setProperty(
      "--blurryBackground",
      colors.blurryBackground
    );

    document.documentElement.style.setProperty("--accent", colors.accent);

    document.documentElement.style.setProperty("--accentDim", colors.accentDim);
    document.documentElement.style.setProperty(
      "--mainBackground",
      colors.mainBackground
    );

    document.documentElement.style.setProperty(
      "--gradientSurface",
      colors.gradientSurface
    );

    document.documentElement.style.setProperty("--surface", colors.surface);

    document.documentElement.style.setProperty("--surface2", colors.surface2);

    document.documentElement.style.setProperty("--surface3", colors.surface3);
    document.documentElement.style.setProperty("--element", colors.element);
    document.documentElement.style.setProperty(
      "--elementDim",
      colors.elementDim
    );
    document.documentElement.style.setProperty(
      "--elementAlt",
      colors.elementAlt
    );

    document.documentElement.style.setProperty("--accent", colors.accent);
    document.documentElement.style.setProperty("--accentDim", colors.accentDim);
  }

  function backFeatures() {
    window.addEventListener("popstate", (event) => {
      removeFormOnBack();
    });
  }

  function removeFormOnBack() {
    const formPage = getUrlQuery("formPage");
    if (!formPage) {
      setFormData(null);
    }
  }

  function getUrlQuery(field) {
    if (typeof window == "undefined") return null;
    const queryString = window.location.search;
    const urlParamsForm = new URLSearchParams(queryString);
    return urlParamsForm.get(field);
  }

  function setForm(data, noPathChange) {
    if (noPathChange) {
      return setFormData({ data, noPathChange });
    }

    let path = window.location.pathname;
    let queryObj = getUrlQueryObject();

    if (getUrlQuery("formPage") && !data) {
      closeForm();
    } else if (!getUrlQuery("formPage")) {
      queryObj.formPage = "true";

      let thePath = removeLastSlash(path) + queryObjToUrl(queryObj);

      goTo(thePath)();

      setFormData({ data, noPathChange });
    } else {
      setFormData({ data, noPathChange });
    }
  }

  function removeLastSlash(urlString) {
    if (urlString[urlString.length - 1] == "/") {
      return urlString.slice(0, urlString.length - 1);
    } else {
      return urlString;
    }
  }

  function queryObjToUrl(queryInput) {
    let newQueryUrl = "/?";
    let i = 0;
    let queryLen = Object.keys(queryInput).length;
    for (let key in queryInput) {
      if (queryInput[key]) {
        if (i == queryLen - 1) {
          newQueryUrl += `${key}=${queryInput[key]}`;
        } else {
          newQueryUrl += `${key}=${queryInput[key]}&`;
          i++;
        }
      }
    }

    return newQueryUrl;
  }

  function getUrlQueryObject() {
    let data = {};
    let raw = window.location.search.replace(/\?/gi, "").replace(/\//gi, "");
    if (!raw) return data;
    raw = raw.split("&");
    for (let itm of raw) {
      if (!itm) continue;
      itm = itm.split("=");
      if (itm.length == 2) {
        if (itm[1].trim()) {
          data[itm[0]] = itm[1];
        }
      }
    }
    return data;
  }

  function removeFormQuery() {
    //this prevents bug
    //what bug?
    //if url already has form query then
    //on setFormData query won't be pushed

    if (getUrlQuery("formPage")) {
      let path = window.location.pathname;
      let queryObj = getUrlQueryObject();
      delete queryObj.formPage;
      let newPath = "/";

      let queryPath = queryObjToUrl(queryObj);

      if (queryPath == "/?") queryPath = "";

      if (path === "/") {
        newPath = queryPath;
      } else {
        if (path[path.length - 1] == "/" && queryPath[0] == "/") {
          //if query path starts with / and the url path end with /
          queryPath = queryPath.slice(1, queryPath.length);
        }
        newPath = path + queryPath;
      }

      if (newPath[newPath.length - 1] == "/") {
        newPath = newPath.slice(0, newPath.length - 1);
      }

      console.log("newPath", newPath, queryPath);
      if (!newPath) newPath = "/";
      goTo(newPath, { isReplace: true })();
    }
  }

  function closeForm() {
    if (getUrlQuery("formPage")) {
      goTo(-1)();
    }
  }
}

export default Boilerplate;
