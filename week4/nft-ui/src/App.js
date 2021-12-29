import "./App.css";
import { Button } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button varient="secondary">
          <img
            src="images/metamask.svg"
            alt="metamask"
            width="58"
            height="50"
          ></img>
          Connect to MetaMask
        </Button>
        <div>
          Connected account: 
        </div>
        <Button varient="danger">
        <img
          src="images/noun_waving_3666509.svg"
          alt="disconnect"
          width="58"
          height="50"
        ></img>
        Disconnect MetaMask</Button>
      </header>
    </div>
  );
}

export default App;
