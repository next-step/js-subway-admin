import { stations, lines } from '../dummyData';
import { _map } from '../utils/_';
import { getOptionsTemplate } from './shared';

const createMultipleTemplates = <T>(datas: T[]) => (
  template: (data: T) => string
) => _map<T, string>(datas, (data: T) => template(data)).join('');

export const createMultipleStationsTemplates = createMultipleTemplates<string>(
  stations
);

export const createMultipleLinesTemplates = createMultipleTemplates<string>(
  lines
);

export const createStationSelectTemplate = (
  id: string,
  type: string,
  className?: string
): string => `
<label for=${id} class="input-label" hidden>${type}</label>
<select id=${id} ${className ? `class=${className}` : ''}>
  <option value="" selected disabled hidden>${type}</option>
  ${createMultipleStationsTemplates(getOptionsTemplate)}
</select>
`;

export const createInputTemplate = (
  id: string,
  type: string,
  placeholder: string,
  required = '',
  className?: string
): string => `
<label for=${id} class="input-label" hidden>
  ${placeholder}
</label>
<input
  type=${type}
  id=${id}
  name=${id}
  class="input-field${className ? ` ${className}` : ''}"
  placeholder="${placeholder}"
  ${required}
/>
`;
