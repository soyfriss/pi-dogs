import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import CreateBreed from './components/CreateBreed.jsx';
import BreedDetail from './components/BreedDetail.jsx';
import About from './components/About.jsx'
import Error from './components/Error.jsx';
import { useEffect } from 'react';
import { fetchBreeds, fetchTemperaments } from './redux/actions.js';


function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('App useEffect()');
  //   dispatch(fetchBreeds());
  //   dispatch(fetchTemperaments());
  // }, [dispatch]);

  useEffect(() => {
        console.log('App useEffect()');
  }, []);

  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/breed/create" component={CreateBreed} />
          <Route exact path="/breed/:id">
            <BreedDetail />
          </Route>
          <Route exact path="/about" component={About} />
          <Route path='*'>
            <Error title='Oops!' message="We can't seem to find what you're looking for" />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
