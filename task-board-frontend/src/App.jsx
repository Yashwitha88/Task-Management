import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ViewTask from "./pages/ViewTask";
import EditTask from "./pages/EditTask";
import AddTask from "./pages/AddTask";


function App() {
  return (
    
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/task/:id" element={<ViewTask />} />
      <Route path="/add" element={<AddTask/>}/>
      <Route path="/edit/:id" element={<EditTask />} />

    </Routes>
   
    
  );
}

export default App;
