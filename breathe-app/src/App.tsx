import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Firebase from "./Firebase";
import { AuthProvider } from "./Components/AuthAndLogin/AuthContext";
import Signup from "./Components/AuthAndLogin/Signup";
import ResetPassword from "./ResetPassword";
import { PrivateRoutes } from "./Components/AuthAndLogin/PrivateRoutes";
import Login from "./Components/AuthAndLogin/Login";
import HomePage from "./Components/HomePage";
import RetentionTimer from "./Components/RetentionTimer";
import History from "./Components/History";
import MeditationTimer from "./Components/MeditationTimer";

function App() {
  const [firebase, setFirebase] = useState<Firebase | null>(null);

  useEffect(() => {
    const fbInstance = new Firebase();
    setFirebase(fbInstance);
  }, []);

  if (!firebase) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AuthProvider firebase={firebase}>
        <Routes>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />

          <Route path="reset-password" element={<ResetPassword />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/retention" element={<RetentionTimer />} />
            <Route path="/history" element={<History />} />
            <Route path="/meditation" element={<MeditationTimer />} />
            {/* <Route path="/guided" element={<GuidedMeditation />} /> */}
          </Route>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
