import { _map } from '../utils/_';
import {
  getOptionsTemplate,
  getStationsListsTemplate,
  getLinesListsTemplate
} from './shared';
import { getData } from '../utils/storage';

export const createMultipleTemplates = <T>(
  template: (data: T, idx?: number) => string
) => (datas: T[]): string => _map<T, string>(datas, template).join('');

export const createStationListsTemplates = createMultipleTemplates(
  getStationsListsTemplate
);

export const createLinesListsTemplates = createMultipleTemplates(
  getLinesListsTemplate
);

export const createOptionsTemplates = createMultipleTemplates(
  getOptionsTemplate
);

export const createStationSelectTemplate = (
  id: string,
  type: string,
  className?: string
): string => `
<label for=${id} class="input-label" hidden>${type}</label>
<select id=${id} ${className ? `class=${className}` : ''} required>
  <option value="" selected disabled hidden>${type}</option>
  ${createOptionsTemplates(getData('stations'))}
</select>
`;

export const createInputTemplate = (
  id: string,
  type: string,
  placeholder: string,
  required = '',
  length = '',
  className?: string
): string => `
<label for=${id} class="input-label" hidden>
  ${placeholder}
</label>
<input
  type=${type}
  id=${id}
  name=${id}
  autocomplete="off"
  class="input-field${className ? ` ${className}` : ''}"
  ${length}
  placeholder="${placeholder}"
  ${required}
/>
`;
