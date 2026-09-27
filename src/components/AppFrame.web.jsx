import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

// Phone-sized viewport (plus a 10px bezel) used on wide screens.
const PHONE = { width: 432, height: 900 };
// Below this width the browser is already phone-sized, so the app fills it.
const FRAME_BREAKPOINT = 600;
const MARGIN = 24;

// The app is designed for phones: on desktop browsers show it inside a centered
// phone frame instead of stretching the layout across the whole window.
export const AppFrame = ({ children }) => {
  const { width, height } = useWindowDimensions();

  if (width < FRAME_BREAKPOINT) {
    return <View style={styles.fullScreen}>{children}</View>;
  }

  const frameHeight = Math.min(PHONE.height, height - MARGIN * 2);

  return (
    <View style={styles.backdrop}>
      <View style={[styles.phone, { height: frameHeight }]}>
        <View style={styles.screen}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1B2E',
    backgroundImage: 'radial-gradient(circle at 50% 30%, #3D2A80 0%, #1E1B2E 70%)',
  },
  phone: {
    width: PHONE.width,
    padding: 10,
    borderRadius: 44,
    backgroundColor: '#0F0D18',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.55)',
  },
  // Rounded screen inside the bezel, so corners never clip the app's edges.
  screen: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 34,
    backgroundColor: '#FFFFFF',
  },
});
