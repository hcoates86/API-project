import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from './components/Spots/SpotsIndex';
import ViewSpot from './components/Spots/ViewSpot';
import SpotForm from "./components/SpotForm/SpotForm";
import noImgUrl from './images/NoImage.png';
import ManageSpots from "./components/Spots/ManageSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      <Switch>
          <Route exact path="/">
            <SpotsIndex />
          </Route>
          <Route exact path="/spots/new">
            <SpotForm noImgUrl={noImgUrl} />
          </Route>
          <Route path="/spots/:spotId">
            <ViewSpot noImgUrl={noImgUrl} />
          </Route>
          <Route path="/">
            <ManageSpots />
          </Route>

        </Switch>


{/*       
      {isLoaded && <Switch>
          <Route exact path="/" component={SpotsIndex} />
          <Route exact path="/spots/new" component={SpotForm} />
          <Route path="/spots/:spotId" component={ViewSpot} />

        </Switch>} */}

      
    </>
  );
}

export default App;