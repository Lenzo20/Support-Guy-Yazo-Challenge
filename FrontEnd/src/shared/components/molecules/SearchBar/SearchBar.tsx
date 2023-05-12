import { Flex, Input } from '@chakra-ui/react';
import { SearchBarProps } from './searchbar.interfaces';
import { useRef } from 'react';
import { debounceEvent } from '../../../utils/forms/form.utils';

export const SearchBar = ({
  placeholder,
  isSearching = false,
  onChange,
  defaultValue,
  inputId,
  style,
  value,
  ...rest
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSearchChange = () => {
    if (inputRef.current) {
      onChange(inputRef.current.value);
    }
  };

  return (
    <Flex gap="8px" style={style} {...rest}>
      <Flex w="100%">
        <Input
          ref={inputRef}
          type="text"
          id={inputId}
          defaultValue={defaultValue}
          placeholder={placeholder}
          color="blue.400"
          onChange={debounceEvent(onSearchChange, 500)}
          value={value}
          variant="filled"
          bg="white.800"
          borderEndRadius={isSearching ? 0 : 8}
        />
      </Flex>
    </Flex>
  );
};
