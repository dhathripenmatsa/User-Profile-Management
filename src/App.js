import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import './styles/App.css';  // ← CORRECT PATH

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/user/:id" element={<UserDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
