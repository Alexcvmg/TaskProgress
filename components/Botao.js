import { Button } from 'native-base';

export function Botao({ action, children, bgColor, textColor, ...props }) {
  return (
    <Button
      {...props}
      onPress={action}
      bg={bgColor}
      _text={{ color: textColor, fontWeight: 'bold' }}>
      {children}
    </Button>
  );
}
