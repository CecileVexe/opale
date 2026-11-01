import Button from '../Button';

export interface HeaderActionButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const HeaderActionButton = (props: HeaderActionButtonProps) => {
  const { label, onPress, disabled } = props;

  return <Button variant="text" label={label} onPress={onPress} disabled={disabled} />;
};

export default HeaderActionButton;
