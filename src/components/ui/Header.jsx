import { getHeaderTitle } from '@react-navigation/elements';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme';

// Stack header: back button, title and optional actions on a white surface.
export const Header = ({ navigation, route, options, back }) => {
  const insets = useSafeAreaInsets();
  const title = getHeaderTitle(options, route.name);
  const HeaderRight = options.headerRight;

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.xs }]}>
      {back ? (
        <IconButton
          icon="chevron-left"
          size={26}
          onPress={navigation.goBack}
          accessibilityLabel="Go back"
          style={styles.back}
        />
      ) : (
        <View style={styles.spacer} />
      )}
      <Text variant="titleLarge" numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <View style={styles.actions}>{HeaderRight ? <HeaderRight /> : null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
    paddingBottom: spacing.xs,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  back: {
    margin: 0,
  },
  spacer: {
    width: spacing.md,
  },
  title: {
    flex: 1,
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 48,
    justifyContent: 'flex-end',
  },
});
