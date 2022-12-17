import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMPONENTS
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> } ></Route>
        <Route path="/chats" element={ <ChatPage/> } ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
