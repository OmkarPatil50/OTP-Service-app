import { Route, Routes } from "react-router-dom";
import GeneratorPage from "./Pages/GeneratorPage";
import VerificationPage from "./Pages/VerificationPage";
import Navbar from "./Components/Navbar";
import { Box } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from "./Components/Loader/Loader";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import SuccessPage from "./Pages/SuccessPage";

function App() {

  const { state } = useContext(AppContext)

  return (
    <Box sx={{ backgroundColor: '#212121', minHeight: '100vh' }}>
      {
        state.isLoading ? <Loader /> : ''
      }
      <Navbar />
      <Routes>
        <Route path="/" element={<GeneratorPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/success" element={<SuccessPage />} />
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
