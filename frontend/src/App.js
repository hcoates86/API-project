import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from './components/Spots/SpotsIndex';
import ViewSpot from './components/Spots/ViewSpot';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      
      {isLoaded && <Switch>
          <Route exact path="/" component={SpotsIndex} />
          <Route exact path="/spots/:spotId" component={ViewSpot} />
          <Route path="/spots/new" component={SpotForm} />
        </Switch>}

      
    </>
  );
}

export default App;