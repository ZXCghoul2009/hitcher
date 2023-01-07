
import ReactDOM from "react-dom";
import './index.css';
import App from "./App";
import HttpService from "./utils/service/HttpService";
import UserService from "./utils/service/UserService";

const renderApp = () => ReactDOM.render(<App/>, document.getElementById("root"));

UserService.initKeycloak(renderApp);
HttpService.configure();