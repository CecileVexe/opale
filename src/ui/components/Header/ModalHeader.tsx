import { StyleSheet, View } from 'react-native';

import { useTranslation } from '../../../i18n';
import { size } from '../../theme';
import Text from '../Text';
import HeaderActionButton, { type HeaderActionButtonProps } from './HeaderActionButton';
import HeaderIconButton from './HeaderIconButton';

export interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  action?: HeaderActionButtonProps;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  title: { flex: 1 },
  side: { minWidth: size.touch },
  sideEnd: { alignItems: 'flex-end' },
});

const ModalHeader = (props: ModalHeaderProps) => {
  const { title, subtitle, onBack, action } = props;

  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.row}>
        <View style={styles.side}>
          {onBack ? (
            <HeaderIconButton icon="close" label={t('common.close')} onPress={onBack} />
          ) : null}
        </View>
        <Text variant="title3" align="center" accessibilityRole="header" style={styles.title}>
          {title}
        </Text>
        <View style={[styles.side, styles.sideEnd]}>
          {action ? <HeaderActionButton {...action} /> : null}
        </View>
      </View>
      {subtitle ? (
        <Text variant="secondary" color="textSecondary" align="center">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
};

export default ModalHeader;
