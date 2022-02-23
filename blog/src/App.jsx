import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { useSelector} from "react-redux"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const user = useSelector(state=> state.user.currentUser)
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/write" element={<Write />} />
        <Route path="/login" element={user ? <Homepage /> : <Login />} />
        <Route path="/post/:postId" element={<Single />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
