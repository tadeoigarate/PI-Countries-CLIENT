import './App.css';
import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import LandingPage from './components/landingPAge/LandingPage';
import Home from './components/home/Home';
import AddActivity from './components/addActivity/AddActivity';
import CountryDetails from './components/countryDetails/CountryDetails'
import { getActivity, getAllCountries} from './redux/actions/index';


//al montarse la app ya estan listos los paises

function App() {
  const dispatch = useDispatch();
   useEffect(() => {
        dispatch(getAllCountries())
        dispatch(getActivity()) 
    }, [dispatch])

  
  return (
    <>
    <BrowserRouter>
      <Switch>
          <Route  exact path='/' component={LandingPage} />
          <Route  exact path='/home' component={Home} />
          <Route  exact path='/countries/:id' component={CountryDetails} />
          <Route  path='/addActivity' component={AddActivity} />
        </Switch>     
    </BrowserRouter>
      
    </>
  );
}

export default App;
