import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

// Haptic feedback on phones; a silent no-op on the web.
const run = (feedback) => {
  if (Platform.OS === 'web') return;
  feedback().catch(() => {});
};

export const tapFeedback = () => run(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));

export const successFeedback = () =>
  run(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success));
