// Dependency
import "./App.css";
import React, { useState } from "react";
const IPFS = require("ipfs");

function UploadIPFS() {
  // data to upload to IPFS
  const [data, setData] = useState("");
  // cid of uploaded data
  // const [cid, setCid] = useState("");
  // display message non empty once an upload performed
  const [displayMessage, setDisplayMessage] = useState("");

  function handleChange(e) {
    setData(e.target.value);
  }
  async function renderContent() {
    let cid = await upload(data);
    if (await cid.path) {
      console.log("setting display message");
      let url = `https://ipfs.io/ipfs/${await cid.path}`;
      setDisplayMessage(
        <div>
          <div>Uploaded to IPFS!</div>
          <div>Your CID: {await cid.path}</div>
          <div>
            {" "}
            View at <a href={url}>view on url</a>
          </div>
        </div>
      );
    }
  }

  async function upload(data) {
    // Initialise IPFS node
    const node = await IPFS.create();
    // Submit data to the network
    const cid = await node.add(data);
    // Log & return CID
    console.log(cid);
    await node.stop();
    console.log("called node.stop()");

    return cid;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Upload to IPFS</h1>
        <p>Enter content below</p>
        <span>
          <input type="test" id="dataInput" onChange={handleChange} />
          <button className="App" onClick={renderContent}>
            Submit
          </button>
        </span>
        <p>{displayMessage}</p>
      </header>
    </div>
  );
}

export default UploadIPFS;
