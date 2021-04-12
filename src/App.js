import './App.css';
import Langingpage from './Components/Langingpage';
import Userpage from './Components/Userpage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Game from './Components/Game';
const App = () => {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/tic-tac-toe/' component={Langingpage} />
          <Route exact path='/tic-tac-toe/player' component={Userpage} />
          <Route exact path='/tic-tac-toe/game' component={Game} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
