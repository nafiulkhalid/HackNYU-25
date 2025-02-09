import type React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Rewards from '../features/rewards/index';
import Signin from '../features/sign-in';
import SignUp from '../features/sign-up/index';
import SpendingAlert from '../features/spending-alert/index';
import Suggestions from '../features/suggestions/index';
import TransactionData from '../features/transaction-data/index';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/rewards">Rewards</Link>
          </li>
          <li>
            <Link to="/spending-alert">Spending Alert</Link>
          </li>
          <li>
            <Link to="/suggestions">Suggestions</Link>
          </li>
          <li>
            <Link to="/transaction-data">Transaction Data</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/spending-alert" element={<SpendingAlert />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/transaction-data" element={<TransactionData />} />
      </Routes>
    </Router>
  );
};

export default App;
