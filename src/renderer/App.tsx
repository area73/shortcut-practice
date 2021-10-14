// import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.global.css';
import Configure from './features/Configure.page';
import ShortCutPractice from './features/ShortCutPractice.page';

const EntryPage = () => {
  return (
    <div>
      <div className="Hello">
        <Link to="/practice">
          <button type="button">
            <span role="img" aria-label="practice">
              🧠
            </span>
            Practice shortcuts
          </button>
        </Link>
        <Link to="/configure">
          <button type="button">
            <span role="img" aria-label="practice">
              🔧
            </span>
            Configure shortcuts
          </button>
        </Link>
      </div>
    </div>
  );
};

// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/" component={EntryPage} />
        </Switch>
        <Switch>
          <Route path="/practice" component={ShortCutPractice} />
        </Switch>
        <Switch>
          <Route path="/configure" component={Configure} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}
