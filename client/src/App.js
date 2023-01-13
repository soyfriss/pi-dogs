import { Route, Switch } from 'react-router-dom';
import Home from './components/Home.jsx';
import CreateBreed from './components/CreateBreed.jsx';
import BreedDetail from './components/BreedDetail.jsx';
import About from './components/About.jsx'
import Error404 from './components/Error404.jsx';
import { useEffect } from 'react';
import LandingPage from './components/LandingPage.jsx';
import BreedsCompare from './components/BreedsCompare.jsx';

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
        <Route exact path="/about">
          <About />
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
