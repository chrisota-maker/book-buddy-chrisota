import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import LogIn from "./Login";
import AccountCreation from "./AccountCreation";
import Book from "./Book";
import Books from "./Books";
import Profile from "./Profile";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <div className="page-container">
        <nav className="navbar">
          <Link to="/" className="logo-button">
            <img src="/books.png" alt="" className="button-icon"/>
            Book Buddy
          </Link>
          <div className="nav-links">
            <Link to="/books" className="nav-button">Books</Link>
            {token ? (
              <Link to="/profile" className="nav-button">Profile</Link>
            ) : (
              <Link to="/login" className="nav-button">Log In</Link>
            )}
          </div>
        </nav>
        <hr className="navbar-divider"/>

        <Routes>
            <Route path="/login" element={<LogIn setToken={setToken}/>} />
            <Route path="/" element={<HomePage/>} />
            <Route path="/books" element={<Books token={token}/>}/>
            <Route path="/books/:id" element={<Book token={token}/>}/>
            <Route path="/profile" element={<Profile token={token}/>} />
            <Route path="/newaccount" element={<AccountCreation setToken={setToken}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}