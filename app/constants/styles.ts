import { config, SpringConfig } from 'react-spring';

export const BREAKPTS = {
  XS: 360,
  SM: 480,
  MD: 768,
  LG: 992,
  XL: 1200,
};

export type BreakPts = keyof typeof BREAKPTS;

export const DEFAULT_TOAST_STYLES = {
  border: '1px solid #e0e0e0',
  borderRadius: 0,
  padding: '8px',
  color: 'black',
  fontSize: 12,
  boxShadow: 'none',
}; // TODO(dave4506)

interface ExtendedCssProps extends React.CSSProperties {
  y: number;
  config: SpringConfig;
}

export const DropdownAnimation: { [key: string]: ExtendedCssProps } = {
  hidden: {
    y: 8,
    opacity: 0,
    pointerEvents: 'none',
    userSelect: 'none',
    config: config.stiff,
  },
  visible: {
    y: 0,
    opacity: 1,
    pointerEvents: 'auto',
    userSelect: 'auto',
    config: config.stiff,
  },
};
