import RenderCol from './GirdRenderColumn';
import GantGroupCellRenderer, { GantGroupCellRendererProps } from './GantGroupCellRenderer';
import GantValidateTooltip from './GantValidateTooltip';
import GantPinnedRowRenderer from './GantPinnedRowRenderer';

let componentsMaps = {};
let frameworkComponentsMaps = {
  gantGroupCellRenderer: GantGroupCellRenderer,
  gantRenderCol: RenderCol,
  gantValidateTooltip: GantValidateTooltip,
  gantPinnedRowRenderer: GantPinnedRowRenderer,
};

export function setComponentsMaps(components) {
  componentsMaps = {
    ...componentsMaps,
    ...components,
  };
  return componentsMaps;
}

export function setFrameworkComponentsMaps(components) {
  frameworkComponentsMaps = {
    ...frameworkComponentsMaps,
    ...components,
  };
  return frameworkComponentsMaps;
}

export function getAllComponentsMaps() {
  return { componentsMaps, frameworkComponentsMaps };
}
