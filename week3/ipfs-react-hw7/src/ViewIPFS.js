import "./App.css";
import React, { useState } from "react";
// import Math from 'math'
const IPFS = require("ipfs");
// const all = require("it-all");

function ViewIPFS() {
  const [cid, setCid] = useState(
    "QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A"
  );
  const [data, setData] = useState("");
  function handleChange(e) {
    setCid(e.target.value);
  }

  async function renderContent() {
    await getFile(cid);
    console.log(data);
  }
  async function getFile(cid) {
    // Initialise IPFS node
    const node = await IPFS.create({ repo: "ok" + Math.random() });
    // Store CID in a variable
    //  const cid = 'QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A';
    // Retrieve data from CID
    // await node.wait()
    const stream = node.cat(cid);
    let file = "";
    let utf8decoder = new TextDecoder();
    for await (const chunk of stream) {
      // chunks of data are returned as a Buffer, convert it back to a string
      file += utf8decoder.decode(chunk);
    }
    console.log(typeof file);
    console.log(file);
    // console.log(utf8decoder.decode(file));
    // await node.stop();
    // let file = await all(node.cat(cid));
    // const fileData = Buffer.concat(await all(node.cat(cid)));

    // // Print data to console
    // console.log(fileData.toString());
    setData(file);
    await node.stop();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>View an IPFS file</h1>
        <p>Enter CID below</p>
        <span>
          <input
            type="text"
            id="cidInput"
            name="fname"
            onChange={handleChange}
          />
          <button className="App" onClick={renderContent}>
            Submit
          </button>
        </span>
        <p> {data} </p>
      </header>
    </div>
  );
}

export default ViewIPFS;
