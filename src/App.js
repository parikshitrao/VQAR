import './App.css';
import VQAPage from './pages/VQA';
import VCRPage from './pages/VCR';
import FAQsPage from './pages/FAQs';
import StatsPage from './pages/Stats';
import Login from './components/Login/Index';
import EvaluateProvider from './contexts/EvaluateProvider';
import VocabProvider from './contexts/VocabProvider';
import AuthProvider from './contexts/AuthProvider';
import { BrowserRouter as HashRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Home from './components/Home/Index';
import MenuBar from './components/MenuBar/Index';
import React from 'react';
import { useCookies } from 'react-cookie';

// import getCookie from './hooks/getCookie';
// import setCookie from './hooks/setCookie';
import { v4 as uuid } from 'uuid';


// console.log(process.env)
if (process.env.NODE_ENV === 'production') {
  // console = {};
  console.log = function() { };
  window.console = console;
}


function App() {
  const theme = useTheme();

  const myTheme = createTheme(theme, {
    palette: {
      secondary: {
        main: '#ff7b00',
        light: '#ff9500',
        dark: '#e36414',
        contrastText: '#fff'
      },
      primary: {
        main: '#2d6a4f',
        dark: '#1b4332',
        light: '#74c69d',
        contrastText: '#fff'
      }
    },
    typography: {
      fontFamily: ['Cascadia code', 'monospace'].join(', ')
    }
  });
  //console.log(useTheme());

  /** We are Defining Cookies here */
  const [cookies, setCookie] = useCookies(['user']);
  //console.log("user id: "+ id);

  /** We check for cookies.
   * if cookies are absent then we generate a user id
   *
   */
  if (!cookies.userID) {
    let id = uuid();
    setCookie('userID', id, {path: '/',maxAge: 1000000 ,expires: new Date(Date.now()+2592000)});
    console.log("after setCookie: " + cookies.userID);
  } else {
    console.log("Stored Cookie " + cookies.userID);
  }

  return (
    <ThemeProvider theme={myTheme}>
      <AuthProvider>
        <EvaluateProvider>
          <VocabProvider>
            {/* <Router> */}
            <HashRouter>
              {/* <Sidebar /> */}
              <MenuBar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/vqa" element={<VQAPage />} />
                <Route exact path="/vcr" element={<VCRPage />} />
                <Route exact path="/stats" element={<StatsPage />} />
                <Route exact path="/faqs" element={<FAQsPage />} />
                <Route exact path="/login" element={<Login />} />
              </Routes>
            </HashRouter>
            {/* </Router> */}
            {/* <div>{getCookie('userId')}</div> */}
          </VocabProvider>
        </EvaluateProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
