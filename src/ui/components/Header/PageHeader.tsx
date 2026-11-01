import { StyleSheet, View } from 'react-native';

import { useTranslation } from '../../../i18n';
import { spacing } from '../../theme';
import Text from '../Text';
import HeaderActionButton, { type HeaderActionButtonProps } from './HeaderActionButton';
import HeaderIconButton from './HeaderIconButton';

export interface PageHeaderProps {
  title: string;
  eyebrow?: string;
  onBack?: () => void;
  action?: HeaderActionButtonProps;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.s2 },
  title: { flex: 1 },
});

const PageHeader = (props: PageHeaderProps) => {
  const { title, eyebrow, onBack, action } = props;

  const { t } = useTranslation();

  return (
    <View>
      {eyebrow ? (
        <Text variant="secondary" color="textSecondary">
          {eyebrow}
        </Text>
      ) : null}
      <View style={styles.row}>
        {onBack ? (
          <HeaderIconButton icon="arrow-left" label={t('common.back')} onPress={onBack} boxed />
        ) : null}
        <Text variant="title1" accessibilityRole="header" style={styles.title}>
          {title}
        </Text>
        {action ? <HeaderActionButton {...action} /> : null}
      </View>
    </View>
  );
};

export default PageHeader;
