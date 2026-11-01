import type { HeaderActionButtonProps } from './HeaderActionButton';
import ModalHeader from './ModalHeader';
import PageHeader from './PageHeader';

export interface HeaderProps {
  title: string;
  variant?: 'page' | 'modal';
  eyebrow?: string;
  subtitle?: string;
  onBack?: () => void;
  action?: HeaderActionButtonProps;
}

const Header = (props: HeaderProps) => {
  const { variant = 'page', title, eyebrow, subtitle, onBack, action } = props;

  return variant === 'modal' ? (
    <ModalHeader title={title} subtitle={subtitle} onBack={onBack} action={action} />
  ) : (
    <PageHeader title={title} eyebrow={eyebrow} onBack={onBack} action={action} />
  );
};

export default Header;
