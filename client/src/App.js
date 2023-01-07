import { Route, Switch } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import CreateBreed from './components/CreateBreed.jsx';
import BreedDetail from './components/BreedDetail.jsx';
import About from './components/About.jsx'
import Error from './components/Error.jsx';
import { useEffect } from 'react';
import LandingPage from './components/LandingPage.jsx';


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
        <Route path='*'>
          <Header />
          <main>
            <Error title='Oops!' message="We can't seem to find what you're looking for" />
          </main>
        </Route>
      </Switch>
    </>
  );
}

export default App;
