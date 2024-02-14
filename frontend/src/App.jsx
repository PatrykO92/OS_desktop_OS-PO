import {
  useState,
  useRef,
  useEffect,
  createContext,
  lazy,
  Suspense,
} from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

// Assets for CSSTransition package
import "./assets/styles/cssTransitions.css";

// Assets
import "./assets/styles/main.css";

import {
  toDoAppIcon,
  webBrowserIcon,
  calculatorIcon,
  tetrisIcon,
  brushIcon,
  userIcon,
  calendarIcon,
} from "./assets/icons";

// Utilities
import { textModel } from "./utils";
import { useAppState } from "./hooks/useAppState";
import LoggedInChecker from "./components/LoggedInChecker";
import { LoadingSpinnerFullscreen } from "./components/LoadingSpinner";
import saveUserSettingsToBackend from "./utils/saveUserSettingsToBackend";
import getUserDetail from "./utils/getUserDetail";

const LoginScreen = lazy(() => import("./components/LoginScreen"));
const StartScreen = lazy(() => import("./components/StartScreen"));
const WorkScreen = lazy(() => import("./components/WorkScreen"));
const CloseScreen = lazy(() => import("./components/CloseScreen"));

export const WholeAppContext = createContext(null);

const DEBOUNCE_TIME_IN_SECS = 2;

function App() {
  const navigate = useNavigate();
  const wholeScreenRef = useRef(null);

  const [isConnectedToBackend, setIsConnectedToBackend] = useState(false);

  // useStateHook and function to set actually used language, default set to "en".
  const [systemLanguage, setSystemLanguage] = useState("en");
  const changeLang = (language) => {
    setSystemLanguage(language);
  };

  // useStateHook and function to set actually used user, default you get user from localStorage, null if not found
  const [user, setUser] = useState(null);
  const changeUser = (user) => {
    setUser(user);
  };

  // App 1: TO-DO-APP
  const [toDoApp, handleStateToDoApp, handleDefaultStateToDoApp] = useAppState(
    {},
    "ToDo",
    toDoAppIcon
  );

  // App 2: Web Browser
  const [webBrowser, handleStateWebBrowser, handleDefaultStateWebBrowser] =
    useAppState(
      { defaultUrl: false },
      textModel[systemLanguage].webBrowser,
      webBrowserIcon
    );

  // App 3: Calculator
  const [calculator, handleStateCalculator, handleDefaultStateCalculator] =
    useAppState({}, textModel[systemLanguage].calculatorName, calculatorIcon);

  // App 4: Tetris
  const [tetris, handleStateTetris, handleDefaultStateTetris] = useAppState(
    {},
    "Tetris",
    tetrisIcon
  );

  // App 5: Personalize
  const [personalize, handleStatePersonalize, handleDefaultStatePersonalize] =
    useAppState({}, textModel[systemLanguage].personalize, brushIcon);

  // App 6: PersonalizeUser
  const [
    personalizeUser,
    handleStatePersonalizeUser,
    handleDefaultStatePersonalizeUser,
  ] = useAppState({}, textModel[systemLanguage].personalizeUser, userIcon);

  // App 7: CalendarApp
  const [calendarApp, handleStateCalendarApp, handleDefaultStateCalendarApp] =
    useAppState({}, "Calendar", calendarIcon);

  const hideAllPrograms = () => {
    handleStateToDoApp("hidden", true);
    handleStateCalculator("hidden", true);
    handleStatePersonalize("hidden", true);
    handleStatePersonalizeUser("hidden", true);
    handleStateTetris("hidden", true);
    handleStateWebBrowser("hidden", true);
    handleStateCalendarApp("hidden", true);
  };

  const closeAllPrograms = () => {
    handleDefaultStateToDoApp();
    handleDefaultStateWebBrowser();
    handleDefaultStateCalculator();
    handleDefaultStateTetris();
    handleDefaultStatePersonalize();
    handleDefaultStatePersonalizeUser();
    handleDefaultStateCalendarApp();
  };

  // update language attribute
  // update apps names, when language changes
  useEffect(
    () => {
      document.documentElement.lang = systemLanguage;
      handleStateWebBrowser("name", textModel[systemLanguage].webBrowser);
      handleStateCalendarApp("name", textModel[systemLanguage].calendar);
      handleStateCalculator("name", textModel[systemLanguage].calculatorName);
      handleStatePersonalize("name", textModel[systemLanguage].personalize);
      handleStatePersonalizeUser(
        "name",
        textModel[systemLanguage].personalizeUser
      );
    },
    // eslint-disable-next-line
    [systemLanguage]
  );

  // Apply settings, if user.settings are changed. Reset settings to default values, if user is not logged in
  useEffect(() => {
    const root = document.documentElement;
    if (user?.settings === null || user?.settings === undefined) {
      root.style.removeProperty("--theme-bg");
      root.style.removeProperty("--theme-bg-light");
      root.style.removeProperty("--theme-font");
      root.style.removeProperty("--icon-size");
    }

    if (user?.settings) {
      root.style.setProperty("--theme-bg", user.settings.themeBg);
      root.style.setProperty("--theme-bg-light", user.settings.themeBgLight);
      root.style.setProperty("--theme-font", user.settings.themeFont);
      root.style.setProperty("--icon-size", user.settings.iconSize);
    }
  }, [user?.settings]);

  // Save user settings to localStorage, on every user object change
  useEffect(() => {
    if (user !== null) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // // Save user.settings to backend, on every user.settings object change
  useEffect(() => {
    let debounceTimeout;

    if (user?.settings) {
      // Clear previous debounce timeout
      clearTimeout(debounceTimeout);

      // Set up a new debounce timeout
      debounceTimeout = setTimeout(() => {
        saveUserSettingsToBackend(user.settings);
      }, DEBOUNCE_TIME_IN_SECS * 1000); // 500ms debounce delay
    }

    // Clean up the timeout on unmount
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [user?.settings]);

  // Check at app start if user is already logged in.
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken !== null) {
      async function LogIn() {
        changeUser(await getUserDetail());
        setIsConnectedToBackend(true);
      }
      LogIn();
    }
  }, []);

  useEffect(
    () => {
      const authToken = localStorage.getItem("authToken");
      if (user !== null && isConnectedToBackend) {
        navigate("/loginScreen");
      }

      if (authToken === null) {
        navigate("/startScreen");
      }
    },
    // eslint-disable-next-line
    [isConnectedToBackend]
  );

  return (
    <WholeAppContext.Provider
      value={{
        lang: textModel[systemLanguage],
        user,
        isConnectedToBackend,
        setIsConnectedToBackend,
        changeUser,
        changeLang,
        wholeScreenRef,
        // Programs states and handlers
        toDoApp,
        handleStateToDoApp,
        handleDefaultStateToDoApp,
        webBrowser,
        handleStateWebBrowser,
        handleDefaultStateWebBrowser,
        calculator,
        handleStateCalculator,
        handleDefaultStateCalculator,
        tetris,
        handleStateTetris,
        handleDefaultStateTetris,
        personalize,
        handleStatePersonalize,
        handleDefaultStatePersonalize,
        personalizeUser,
        handleStatePersonalizeUser,
        handleDefaultStatePersonalizeUser,
        calendarApp,
        handleStateCalendarApp,
        handleDefaultStateCalendarApp,
        hideAllPrograms,
        closeAllPrograms,
      }}
    >
      <div className="whole-screen" ref={wholeScreenRef}>
        <Suspense fallback={<LoadingSpinnerFullscreen />}>
          <Routes>
            <Route index exact path="/" element={<StartScreen />} />
            <Route exact path="/startScreen" element={<StartScreen />} />
            <Route exact path="/loginScreen" element={<LoginScreen />} />
            <Route path="/" element={<LoggedInChecker />}>
              <Route exact path="/workScreen" element={<WorkScreen />} />
              <Route exact path="/closeScreen" element={<CloseScreen />} />
            </Route>
            <Route exact path="*" element={<StartScreen />} />
          </Routes>
        </Suspense>
      </div>
    </WholeAppContext.Provider>
  );
}

export default App;
