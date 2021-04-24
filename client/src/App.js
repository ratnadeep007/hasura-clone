import './App.css';

import TableList from './pages/TableList';
import CreateTable from "./pages/CreateTable";

import Sidebar from "react-sidebar";
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";


import SidebarElements from "./components/SidebarElements";

function App() {
  return (
    <Router>
        <div>
            <Sidebar
                open={true}
                sidebar={<SidebarElements />}
                styles={{ sidebar: { background: "white", width: "30vh" } }}
                docked={true}
            >
                <Switch>
                    <Route path="/createTable">
                        <CreateTable />
                    </Route>
                    <Route path="/">
                        <TableList />
                    </Route>
                </Switch>
            </Sidebar>

        </div>
    </Router>
  );
}

export default App;
