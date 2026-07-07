import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css"; 
import Layout from "./components/ui/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Map from "./pages/Map/Map";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<Map />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
