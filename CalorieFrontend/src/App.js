import "./App.css";

import { Routes, Route } from "react-router-dom";
import ShowActivity from "./components/user";
import Reports from "./components/reports";
import AddedEntries from "./components/reports/AddedEntries";
import AverageCalorie from "./components/reports/AverageCalorie";
import { ProtectedRoute } from "./components/helper/ProtectedRoute";
import ErrorPage from "./components/ErrorPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ShowActivity />} />
        <Route element={<ProtectedRoute />}> 
          <Route path="/Reports" element={<Reports />}>
            <Route index element={<AddedEntries />} />
            <Route path="addEntries" element={<AddedEntries />} />
            <Route path="averageCalorie" element={<AverageCalorie />} />
          </Route>
          
        </Route>
        <Route path="/error" element={<ErrorPage/>}  />
      </Routes>
    </div>
  );
}

export default App;
