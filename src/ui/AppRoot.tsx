import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { useTheme } from './theme';

const styles = StyleSheet.create({
  root: { flex: 1 },
});

// Temporary root: expo-router takes over in step 1.9.
const AppRoot = () => {
  const { colors, scheme } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </View>
  );
};

export default AppRoot;
