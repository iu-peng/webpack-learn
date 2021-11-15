import axios from "axios";
console.log("哈哈哈2");

axios.get("/api/data").then((data) => console.log("请求的数据", data));
