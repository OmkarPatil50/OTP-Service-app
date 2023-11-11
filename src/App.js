import { Route, Routes } from "react-router-dom";
import GeneratorPage from "./Pages/GeneratorPage";
import VerificationPage from "./Pages/VerificationPage";
import Navbar from "./Components/Navbar";
import { Box } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Box sx={{ backgroundColor: '#212121', minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<GeneratorPage />} />
        <Route path="/verify" element={<VerificationPage />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Box>
  );
}

export default App;
