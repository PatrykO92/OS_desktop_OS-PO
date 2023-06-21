// External libraries
import {
  useState,
  useRef,
  useEffect,
  createContext,
  lazy,
  Suspense,
} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Assets
import "./assets/styles/main.css";
import {
  toDoAppIcon,
  webBrowserIcon,
  calculatorIcon,
  tetrisIcon,
  brushIcon,
  userIcon,
} from "./assets/icons";

// Components
// import {
//   LoginScreen,
//   StartScreen,
//   WorkScreen,
//   CloseScreen,
// } from "./components";

// Utilities
import { textModel } from "./utils";
import { useAppState } from "./hooks/useAppState";
import { LoadingSpinner } from "./components";

const LoginScreen = lazy(() => import("./components/LoginScreen"));
const StartScreen = lazy(() => import("./components/StartScreen/StartScreen"));
const WorkScreen = lazy(() => import("./components/WorkScreen"));
const CloseScreen = lazy(() => import("./components/CloseScreen"));

export const WholeAppContext = createContext(null);

function App() {
  const wholeScreenRef = useRef(null);
  const navigate = useNavigate();

  const [isConnectedToBackend, setIsConnectedToBackend] = useState(false);

  // useStateHook and function to set actually used language, default set to "en".
  const [systemLanguage, setSystemLanguage] = useState("en");
  const changeLang = (language) => {
    setSystemLanguage(language);
  };

  // useStateHook and function to set actually used user
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
    useAppState({ defaultUrl: false }, "Chrome Fox", webBrowserIcon);

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

  const hideAllPrograms = () => {
    handleStateToDoApp("hidden", true);
    handleStateCalculator("hidden", true);
    handleStatePersonalize("hidden", true);
    handleStatePersonalizeUser("hidden", true);
    handleStateTetris("hidden", true);
    handleStateWebBrowser("hidden", true);
  };

  const closeAllPrograms = () => {
    handleDefaultStateToDoApp();
    handleDefaultStateWebBrowser();
    handleDefaultStateCalculator();
    handleDefaultStateTetris();
    handleDefaultStatePersonalize();
    handleDefaultStatePersonalizeUser();
  };

  // update language attribute
  // update apps names, when language changes
  useEffect(
    () => {
      document.documentElement.lang = systemLanguage;

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

  // Apply settings, if user is changed.
  useEffect(() => {
    const root = document.documentElement;
    if (user !== null) {
      root.style.setProperty("--theme-bg", user.settings.themeBg);
      root.style.setProperty("--theme-bg-light", user.settings.themeBgLight);
      root.style.setProperty("--theme-font", user.settings.themeFont);
      root.style.setProperty("--icon-size", user.settings.iconSize);
    }
  }, [user]);

  // Save user settings to localStorage, on every user object change
  useEffect(() => {
    if (user !== null) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // at start of the app, check if there is already user saved, if so, move to loginScreen.
  useEffect(
    () => {
      const userLocalStorage = localStorage.getItem("user");

      if (userLocalStorage !== null) {
        setUser(JSON.parse(userLocalStorage));
        navigate("/loginScreen");
      } else {
        navigate("/startScreen");
      }
    },
    // eslint-disable-next-line
    []
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
        hideAllPrograms,
        closeAllPrograms,
      }}
    >
      <div className="whole-screen" ref={wholeScreenRef}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route index exact path="/" element={<StartScreen />} />
            <Route exact path="/startScreen" element={<StartScreen />} />

            <Route exact path="/loginScreen" element={<LoginScreen />} />
            <Route exact path="/workScreen" element={<WorkScreen />} />
            <Route exact path="/closeScreen" element={<CloseScreen />} />
          </Routes>
        </Suspense>
      </div>
    </WholeAppContext.Provider>
  );
}

export default App;
