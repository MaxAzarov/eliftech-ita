import React from "react";
import { Route, Switch } from "react-router-dom";

import BankCreation from "./Banks/BankCreation/BankCreation";
import Banks from "./Banks/Banks";
import BankEdit from "./Banks/BankEdit/BankEdit";
import Header from "./Common/Header/Header";
import Mortgage from "./Mortgage/Mortgage";
import "./App.scss";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/bank-creation" exact component={BankCreation}></Route>
        <Route path="/banks" exact component={Banks}></Route>
        <Route path="/mortgage" exact component={Mortgage}></Route>
        <Route path="/bank/:id" exact component={BankEdit}></Route>
      </Switch>
    </div>
  );
}

export default App;
