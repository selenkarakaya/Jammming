import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const notify = () => toast("Merhaba! Bu bir toast mesajıdır.");
  return (
    <>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={notify}>Toast Göster</button>
      <ToastContainer />
    </>
  );
}

export default App;
