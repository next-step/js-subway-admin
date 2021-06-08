export const getStationsListsTemplate = (station: string): string => `
<li class="station-list-item d-flex items-center py-2">
  <span class="w-100 pl-2">${station}</span>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 modal-trigger-btn"
  >
    수정
  </button>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm"
  >
    삭제
  </button>
  </li>
  <hr class="my-0" />
`;

export const getLinesListsTemplate = (line: string): string => `
<li class="d-flex items-center py-2 relative">
  <span class="subway-line-color-dot bg-blue-400"></span>
  <span class="w-100 pl-6 subway-line-list-item-name"
    >${line}</span
  >
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1"
  >
    수정
  </button>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm"
  >
    삭제
  </button>
</li>
<hr class="my-0" />
`;

export const getOptionsTemplate = (data: string): string =>
  `<option>${data}</option>`;
