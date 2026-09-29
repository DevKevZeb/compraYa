import { useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { buildLocationPickerHtml } from './locationPickerHtml';

// Interactive map to choose a point. `ref.moveTo(point)` moves the pin, and
// onPick({ latitude, longitude }) fires when the customer taps or drags it.
export const LocationPickerMap = ({ ref, area, initial, onPick }) => {
  const webView = useRef(null);
  // The page is built once; later changes are sent as messages.
  const [html] = useState(() => buildLocationPickerHtml({ area, initial }));

  useImperativeHandle(ref, () => ({
    moveTo: ({ latitude, longitude }) =>
      webView.current?.injectJavaScript(`window.__moveTo(${latitude}, ${longitude}); true;`),
  }));

  const onMessage = (event) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message.type === 'pick')
        onPick({ latitude: message.latitude, longitude: message.longitude });
    } catch {
      // Ignore messages that are not ours.
    }
  };

  return (
    <WebView
      ref={webView}
      style={styles.map}
      originWhitelist={['*']}
      source={{ html, baseUrl: 'https://compraya.app/' }}
      onMessage={onMessage}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
