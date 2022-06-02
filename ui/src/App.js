import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from './Pages/Home';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MyTodos from "./Pages/MyTodos";
import NotFound from './Pages/NotFound';
import NotAuthorized from "./Pages/NotAuthorized";
import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/register" exact element={<Register/>}/>
          <Route path="/todo-list" exact element={<MyTodos/>}/>
          <Route path="/not-authorized" element={<NotAuthorized/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
