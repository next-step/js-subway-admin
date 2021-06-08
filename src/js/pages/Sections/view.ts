// interface ISections {
//     id:string;
//     name:string;
// }

// const section =(id:string,name:string)=>{
//     return `
//     <li class="d-flex items-center py-2 relative" data-id=${id}>
//     <span class="w-100 pl-6">${name}</span>
//     <button
//       type="button"
//       class="bg-gray-50 text-gray-500 text-sm mr-1"
//     >
//       수정
//     </button>
//     <button
//       type="button"
//       class="bg-gray-50 text-gray-500 text-sm"
//     >
//       삭제
//     </button>
//     </li>
//     <hr class="my-0" />
//     `;
// }
// const view = (datas:ISections[]):string=>{
//     const list =datas.map((data)=>section(data.id, data.name)).join("");
//     return `
//     <div class="heading d-flex">
//     <h2 class="mt-1 w-100">🔁 구간 관리</h2>
//      <button
//       type="button"
//       class="create-section-btn modal-trigger-btn bg-cyan-300 ml-2"
//       >
//       구간 추가
//       </button>
//   </div>
//     <form class="d-flex items-center pl-1"></form>
//     <label for="subway-line" class="input-label" hidden>노선</label>
//     <select id="subway-line" class="bg-blue-400">
//     <option>1호선</option>
//     <option>2호선</option>
//     <option>3호선</option>
//     <option>4호선</option>
//     </select>
//     </form>
//     <ul>
//     ${list}
//     </ul>
//     `;

// };
