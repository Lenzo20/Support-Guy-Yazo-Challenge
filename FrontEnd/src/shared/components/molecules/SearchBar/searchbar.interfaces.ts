import { CSSProperties } from 'styled-components';

export interface SearchBarProps {
  placeholder?: string;
  isSearching?: boolean;
  onChange: (value: string) => void;
  defaultValue?: string;
  inputId?: string;
  style?: CSSProperties;
  value?: string;
}
