import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import CreateBreed from '../pages/CreateBreed.jsx';
import BreedDetail from '../pages/BreedDetail.jsx';
import Error404 from '../pages/Error404.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import BreedsCompare from '../pages/BreedsCompare.jsx';

function App() {
  useEffect(() => {
    console.log('App useEffect()');
  }, []);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/breed/create">
          <CreateBreed />
        </Route>
        <Route exact path="/breed/:id">
          <BreedDetail />
        </Route>
        <Route exact path="/breeds/compare">
          <BreedsCompare />
        </Route>
        <Route path='*'>
          <Error404 />
        </Route>
      </Switch>
    </>
  );
}

export default App;
