import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro'
import Filmes from './Filmes'
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
        main: '#2a3e75',
        light: '#303a58',
        dark: '#4663a6',
    },
    secondary: {
        main: '#3299e4',
    },
    background: {
        default: '#ffffff',
    },
    success: {
        main: '#004d64',
    },
},
})

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />

  },
  {
    path:"/login",
    element: <Login />
  },
  
  {
    path:"/cadastro",
    element: <Cadastro />
  },
  {
    path:"/filmes",
    element: <Filmes />
  }

  
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <ThemeProvider theme={theme}>
  <RouterProvider router={router} />
  </ThemeProvider>
);