import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// Temporary root: replaced by the theme provider (step 1.3) and expo-router (step 1.8).
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
    </View>
  );
}
