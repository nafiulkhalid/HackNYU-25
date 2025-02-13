import type React from 'react';
import { useState, useEffect } from 'react';
import Rewards from '../features/rewards/index';
import Signin from '../features/sign-in';
import SignUp from '../features/sign-up/index';
import SpendingAlert from '../features/spending-alert/index';
import Suggestions from '../features/suggestions/index';
import TransactionData from '../features/transaction-data/index';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('sign-in');

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === '/sign-in') {
        setCurrentPage('sign-in');
      } else if (path === '/sign-up') {
        setCurrentPage('sign-up');
      } else if (path === '/rewards') {
        setCurrentPage('rewards');
      } else if (path === '/spending-alert') {
        setCurrentPage('spending-alert');
      } else if (path === '/suggestions') {
        setCurrentPage('suggestions');
      } else if (path === '/transaction-data') {
        setCurrentPage('transaction-data');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return (
    <div>
      {currentPage === 'sign-in' && <Signin />}
      {currentPage === 'sign-up' && <SignUp />}
      {currentPage === 'rewards' && <Rewards />}
      {currentPage === 'spending-alert' && <SpendingAlert />}
      {currentPage === 'suggestions' && <Suggestions />}
      {currentPage === 'transaction-data' && <TransactionData />}
    </div>
  );
};

export default App;
