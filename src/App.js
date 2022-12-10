import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './dashboard/Dashboard';
import Runners from './runners/Runners';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/runners">Runners</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/runners' element={<Runners />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
