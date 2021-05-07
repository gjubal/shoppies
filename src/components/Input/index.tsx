import React, {
  InputHTMLAttributes,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: React.CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
  openDropdown(): void;
}

const Input: React.FC<InputProps> = ({
  containerStyle = {},
  icon: Icon,
  openDropdown,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container
      style={containerStyle}
      isFocused={isFocused}
      isFilled={isFilled}
      data-testid="input-container"
    >
      {Icon && <Icon size={20} onClick={openDropdown} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};

export default Input;
