import './App.css';
import { Route, useLocation } from 'react-router-dom';
import { Landing, Home, Detail, Form } from './views'
import NavBar from './components/NavBar/NavBar';

function App() {
  const location = useLocation();
  return (
    <div className="App">

      {location.pathname !== '/' && <NavBar />}

      <Route exact path='/' component={Landing} />

      <Route path='/home' render={() => <Home />} />

      <Route path='/videogames/:id' component={Detail} />

      <Route path='/create' component={Form} />
    </div>
  );
}

export default App;
