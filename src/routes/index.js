import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Componentes de tus vistas
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  // Aquí puedes implementar tu lógica para verificar si el usuario está autenticado
  // Por ejemplo, comprobar si hay un token de sesión o si el usuario ha iniciado sesión
  return true; // Cambia esto según tu lógica
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const PublicRoute = ({ component: Component, restricted, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() && restricted ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const Routes = () => {
  return (
    <div>
      <PublicRoute
        restricted={false}
        component={Home}
        path="/"
        exact
      />
      <PublicRoute
        restricted={true}
        component={Login}
        path="/login"
        exact
      />
      <PrivateRoute
        component={Dashboard}
        path="/dashboard"
        exact
      />
    </div>
  );
};

export default Routes;