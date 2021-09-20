// import React, { useState } from "react";
// import { Lines } from "../../components";
// import { tasckItem } from "../../utils/index";

// const RenderLines = () => {
//   const [boards, setBoards] = useState(tasckItem);

//   const [currentItem, setCurrentItem] = useState(null);

//   const dragChildOverHandler = (e, boards, el) => {
//     e.preventDefault();
//     // if(e.target.class)
//   };
//   const dragChildStartHandler = () => {};
//   const dragChildEndHandler = () => {};
//   const dragChildLeavHandler = () => {};
//   const dropChildHandler = (e, boards, el) => {
//     e.preventDefault();
//   };

//   const rendering = boards.map((el) => (
//     <Lines
//       onDragOver={(e) => dragChildOverHandler(e, boards, el)}
//       onDragLeave={(e) => dragChildLeavHandler(e)}
//       onDragStart={(e) => dragChildStartHandler(e, el)}
//       onDragEnd={(e) => dragChildEndHandler(e)}
//       onDrop={(e) => dropChildHandler(e, boards, el)}
//       text={el.text}
//       key={el.idNumber}
//       idNumber={el.idNumber}
//     />
//   ));

//   return <>{rendering}</>;
// };

// export default RenderLines;
// // tasckItem.length

// incvormiapppp.map((item)=>(

// ))
