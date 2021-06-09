import { ILine } from "@/types";

const lineView = (name: string, color: string) => `
<li class="d-flex items-center py-2 relative" dataset-id=${name}>
<span class="subway-line-color-dot bg-${color}"></span>
<span class="w-100 pl-6 subway-line-list-item-name ${color}"
  >${name}</span
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
`;

const view = (lines: ILine[]): string => {
  return lines.length > 0
    ? `${lines
        .map((line) => lineView(line.name, line.color))
        .join("")}<hr class="my-0" />`
    : "아직 등록된 노선이 없습니다.";
};

export default view;
