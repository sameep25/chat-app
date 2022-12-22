import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatProvider from "./context/ChatProvider";
// COMPONENTS
import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/chats" element={<ChatPage />}></Route>
          </Routes>
        </ChatProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
