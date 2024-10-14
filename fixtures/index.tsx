// const element = (
//   <div className="test">
//     <span title="foo">hellow</span>
//     <a href="">测试链接</a>
//   </div>
// );

// console.log("element", element);

import { createRoot } from "react-dom/client";

const element = (
  <div className="test">
    <span title="foo">Hellow</span>
  </div>
);

createRoot(document.getElementById("root") as HTMLElement).render(element);
