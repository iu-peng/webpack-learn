import React, { useState } from "react";
import ReactDom from "react-dom";

const APP = () => {
  const [a] = useState("信息");
  return <div>这是react {a}</div>;
};

ReactDom.render(<APP />, document.getElementById("app"));
