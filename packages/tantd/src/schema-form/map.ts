import IconSelector from '../icon-selector';

import InputCellPhone from '../input-cellphone';

import InputEmail from '../input-email';

import InputTelePhone from '../input-telephone';

import InputUrl from '../input-url';

import LocationSelector from '../location-selector';

import ColorPicker from '../color-picker';

import DatePicker from '../date-picker';

import RangePicker from '../date-picker/RangePicker';

import TreeSelector from '../tree-selector';

import Selector from '../selector';

import Input from '../input';

import { Fields } from './interface';

let fields = {
    [Fields.Input]: Input,
  //   [Fields.Password]: Password,
  //   [Fields.Search]: Search,
  //   [Fields.InputNumber]: InputNumber,
  //   [Fields.InputMoney]: InputMoney,
  [Fields.InputUrl]: InputUrl,
  [Fields.InputEmail]: InputEmail,
  //   [Fields.InputLanguage]: InputLanguage,
  [Fields.InputTelePhone]: InputTelePhone,
  [Fields.InputCellPhone]: InputCellPhone,
  //   [Fields.TextArea]: TextArea,
  [Fields.DatePicker]: DatePicker,
  [Fields.RangePicker]: RangePicker,
  [Fields.ColorPicker]: ColorPicker,
  [Fields.Selector]: Selector,
  [Fields.IconSelector]: IconSelector,
  [Fields.LocationSelector]: LocationSelector,
  [Fields.TreeSelector]: TreeSelector,
  // [Fields.Switch]: Switch,
  // [Fields.Checkbox]: Checkbox,
  // [Fields.CheckboxGroup]: CheckboxGroup,
  // [Fields.Radio]: Radio,
  // [Fields.RadioGroup]: RadioGroup,
  // [Fields.AutoComplete]: AutoComplete
};
export function getFields(): any {
  return { ...fields };
}

export function setFields(field: any) {
  fields = { ...fields, ...field };
}
