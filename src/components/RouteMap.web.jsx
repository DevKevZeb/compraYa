import React, { useMemo } from 'react';
import { buildRouteMapHtml } from './routeMapHtml';

// Web version: react-native-webview is not available in the browser, so the same
// Leaflet page is rendered in an iframe.
export const RouteMap = ({ store, destination, route, bottomInset }) => {
  const html = useMemo(
    () => buildRouteMapHtml({ store, destination, route, bottomInset }),
    [store, destination, route, bottomInset]
  );

  return (
    <iframe
      title="Mapa de entrega"
      srcDoc={html}
      style={{ flex: 1, width: '100%', height: '100%', border: 0 }}
    />
  );
};
