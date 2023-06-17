// External libraries
import { useState, useRef, useEffect, createContext } from "react";
import { CSSTransition } from "react-transition-group";
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
import {
  LoginScreen,
  StartScreen,
  WorkScreen,
  Calculator,
  CloseScreen,
  ProgramContainer,
  WebBrowser,
  ToDoApp,
  TetrisApp,
  Personalize,
  PersonalizeUser,
} from "./components";

// Utilities
import { textModel } from "./utils";
import { useAppState } from "./hooks/useAppState";

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
        changeUser,
        changeLang,
        wholeScreenRef,
        // Programs states and handlers
        toDoApp,
        handleStateToDoApp,
        webBrowser,
        handleStateWebBrowser,
        calculator,
        handleStateCalculator,
        tetris,
        handleStateTetris,
        personalize,
        handleStatePersonalize,
        personalizeUser,
        handleStatePersonalizeUser,
        hideAllPrograms,
        closeAllPrograms,
      }}
    >
      <div className="whole-screen" ref={wholeScreenRef}>
        <Routes>
          <Route
            index
            exact
            path="/"
            element={
              <StartScreen
                setIsConnectedToBackend={setIsConnectedToBackend}
                lang={textModel[systemLanguage]}
                changeLang={changeLang}
                changeUser={changeUser}
              />
            }
          />
          <Route
            exact
            path="/startScreen"
            element={
              <StartScreen
                setIsConnectedToBackend={setIsConnectedToBackend}
                lang={textModel[systemLanguage]}
                changeLang={changeLang}
                changeUser={changeUser}
              />
            }
          />

          <Route
            exact
            path="/loginScreen"
            element={
              <LoginScreen
                lang={textModel[systemLanguage]}
                user={user}
                setIsConnectedToBackend={setIsConnectedToBackend}
              />
            }
          />
          <Route
            exact
            path="/workScreen"
            element={
              <WorkScreen>
                {/* App 1: To-Do-App */}
                <CSSTransition
                  in={toDoApp.programEnabled}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <ProgramContainer
                    lang={textModel[systemLanguage]}
                    programName={toDoApp.name}
                    programIcon={toDoApp.icon}
                    programHidden={toDoApp.hidden}
                    handleProgramState={handleStateToDoApp}
                    handleDefaultProgramState={handleDefaultStateToDoApp}
                  >
                    <ToDoApp lang={textModel[systemLanguage]} user={user} />
                  </ProgramContainer>
                </CSSTransition>

                {/* App 2: Web Browser */}
                <CSSTransition
                  in={webBrowser.programEnabled}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <ProgramContainer
                    lang={textModel[systemLanguage]}
                    programName={webBrowser.name}
                    programIcon={webBrowser.icon}
                    programHidden={webBrowser.hidden}
                    handleProgramState={handleStateWebBrowser}
                    handleDefaultProgramState={handleDefaultStateWebBrowser}
                  >
                    <WebBrowser
                      lang={textModel[systemLanguage]}
                      passUrl={webBrowser.defaultUrl}
                    />
                  </ProgramContainer>
                </CSSTransition>

                {/* App 3: Calculator */}
                <CSSTransition
                  in={calculator.programEnabled}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <ProgramContainer
                    lang={textModel[systemLanguage]}
                    programName={calculator.name}
                    programIcon={calculator.icon}
                    programHidden={calculator.hidden}
                    handleProgramState={handleStateCalculator}
                    handleDefaultProgramState={handleDefaultStateCalculator}
                  >
                    <Calculator lang={textModel[systemLanguage]} />
                  </ProgramContainer>
                </CSSTransition>

                {/* App 4: Tetris */}
                <CSSTransition
                  in={tetris.programEnabled}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <ProgramContainer
                    lang={textModel[systemLanguage]}
                    programName={tetris.name}
                    programIcon={tetris.icon}
                    programHidden={tetris.hidden}
                    handleProgramState={handleStateTetris}
                    handleDefaultProgramState={handleDefaultStateTetris}
                  >
                    <TetrisApp lang={textModel[systemLanguage]} user={user} />
                  </ProgramContainer>
                </CSSTransition>

                {/* App 5: Personalize */}
                <CSSTransition
                  in={personalize.programEnabled}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <ProgramContainer
                    lang={textModel[systemLanguage]}
                    programName={personalize.name}
                    programIcon={personalize.icon}
                    programHidden={personalize.hidden}
                    handleProgramState={handleStatePersonalize}
                    handleDefaultProgramState={handleDefaultStatePersonalize}
                  >
                    <Personalize
                      lang={textModel[systemLanguage]}
                      user={user}
                      changeUser={changeUser}
                    />
                  </ProgramContainer>
                </CSSTransition>

                {/* App 5: Personalize User */}
                <CSSTransition
                  in={personalizeUser.programEnabled}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <ProgramContainer
                    lang={textModel[systemLanguage]}
                    programName={personalizeUser.name}
                    programIcon={personalizeUser.icon}
                    programHidden={personalizeUser.hidden}
                    handleProgramState={handleStatePersonalizeUser}
                    handleDefaultProgramState={
                      handleDefaultStatePersonalizeUser
                    }
                  >
                    <PersonalizeUser
                      lang={textModel[systemLanguage]}
                      user={user}
                      changeUser={changeUser}
                    />
                  </ProgramContainer>
                </CSSTransition>
              </WorkScreen>
            }
          />
          <Route
            exact
            path="/closeScreen"
            element={<CloseScreen lang={textModel[systemLanguage]} />}
          />
        </Routes>
      </div>
    </WholeAppContext.Provider>
  );
}

export default App;
