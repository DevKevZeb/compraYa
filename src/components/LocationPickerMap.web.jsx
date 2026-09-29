import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { buildLocationPickerHtml } from './locationPickerHtml';

// Web version of LocationPickerMap: the same Leaflet page in an iframe, using
// window.postMessage in both directions.
export const LocationPickerMap = ({ ref, area, initial, onPick }) => {
  const frame = useRef(null);
  const [html] = useState(() => buildLocationPickerHtml({ area, initial }));
  const onPickRef = useRef(onPick);

  useEffect(() => {
    onPickRef.current = onPick;
  }, [onPick]);

  useImperativeHandle(ref, () => ({
    moveTo: ({ latitude, longitude }) =>
      frame.current?.contentWindow?.postMessage(
        JSON.stringify({ type: 'moveTo', latitude, longitude }),
        '*'
      ),
  }));

  useEffect(() => {
    const listener = (event) => {
      if (event.source !== frame.current?.contentWindow) return;
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'pick') {
          onPickRef.current({ latitude: message.latitude, longitude: message.longitude });
        }
      } catch {
        // Ignore messages that are not ours.
      }
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  return (
    <iframe
      ref={frame}
      title="Choose the delivery location"
      srcDoc={html}
      style={{ flex: 1, width: '100%', height: '100%', border: 0 }}
    />
  );
};
