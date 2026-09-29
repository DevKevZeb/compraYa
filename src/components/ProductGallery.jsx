import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import { ProductImage } from './ui';

// Swipeable product photos with page indicators.
export const ProductGallery = ({ images, height = 320, name }) => {
  const [width, setWidth] = useState(0);
  const [page, setPage] = useState(0);

  const onScroll = (event) => {
    if (!width) return;
    setPage(Math.round(event.nativeEvent.contentOffset.x / width));
  };

  return (
    <View style={{ height }} onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
      {width > 0 ? (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {(images.length ? images : [null]).map((uri, index) => (
            <ProductImage
              key={uri ?? index}
              uri={uri}
              height={height}
              radius={0}
              style={{ width }}
              accessibilityLabel={`${name}, photo ${index + 1} of ${images.length}`}
            />
          ))}
        </ScrollView>
      ) : null}
      {images.length > 1 ? (
        <View style={styles.dots}>
          {images.map((uri, index) => (
            <View key={uri} style={[styles.dot, index === page && styles.dotActive]} />
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  dots: {
    position: 'absolute',
    bottom: spacing.xl + spacing.md,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: spacing.xs + 2,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.primary,
  },
});
