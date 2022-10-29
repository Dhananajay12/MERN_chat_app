import { Route, withRouter } from "react-router-dom";
import "./App.css";
import ChatProvider from "./Context/ChatProvide";
import ChatPage from "./Pages/ChatPage";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <ChatProvider>
        <Route path="/" component={Home} exact />
        <Route path="/chats" component={ChatPage} />
      </ChatProvider>
    </div>
  );
}

export default withRouter(App);
