import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/screens/Login";
import QuizPage from "./components/screens/QuizPage";
import Instruction from "./components/screens/Instruction";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/screens/Logout";
import Summary from "./components/screens/Summary";
import Resend from "./components/screens/Resend";
import NotFound from "./components/screens/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/quiz" element={<ProtectedRoute isAdmin={false} />}>
          <Route path="/quiz" element={<QuizPage />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/get-password" element={<Resend />} />
          <Route
            exact
            path="/instruction"
            element={<ProtectedRoute isAdmin={false} />}
          >
            <Route path="/instruction" element={<Instruction />} />
          </Route>
          <Route
            exact
            path="/summary"
            element={<ProtectedRoute isAdmin={false} />}
          >
            <Route path="/summary" element={<Summary />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
