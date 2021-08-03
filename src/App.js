import React from "react";
import EventListingPage from "./Pages/EventListingPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigaton from "./Components/UI/Header/Navigation";
import BookEvent from "./Components/Events/BookEvent";
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <header className="site__header">
          <div className="centered">
            <Navigaton />
          </div>
        </header>

        {/* <main className="main-area">
          <div className="centered">
            <EventListingPage />
          </div>
        </main> */}
        <main>
          <Switch>
            <Route path="/events">
              <EventListingPage />
            </Route>
            <Route path="/book-an-event/:eventId">
              <BookEvent />
            </Route>
            <Route path="/" exact>
              <EventListingPage />
            </Route>
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
