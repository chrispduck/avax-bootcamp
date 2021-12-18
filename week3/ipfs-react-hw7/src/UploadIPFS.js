// Dependency
import "./App.css";
import React, { useState } from "react";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

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
          <div> View at <a href={url}>view on url</a></div>
        </div>
      );
    }
  }

  async function upload(data) {
    // Submit data to the network
    const cid = await client.add(data);
    // Log & return CID
    console.log(cid);

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
        {displayMessage}
      </header>
    </div>
  );
}

export default UploadIPFS;
