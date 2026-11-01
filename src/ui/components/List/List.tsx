import type { UiIconName } from '../../icons';
import SettingGroup from '../SettingGroup';
import SettingRow from '../SettingRow';

export interface ListItem {
  key?: string;
  label: string;
  value?: string;
  icon?: UiIconName;
  badge?: string | number;
  onPress?: () => void;
}

export interface ListProps {
  items: ListItem[];
  title?: string;
}

const List = (props: ListProps) => {
  const { items, title } = props;

  return (
    <SettingGroup title={title} role="list">
      {items.map(({ key, ...item }) => (
        <SettingRow key={key ?? item.label} {...item} />
      ))}
    </SettingGroup>
  );
};

export default List;
