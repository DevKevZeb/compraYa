import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { OrderCard } from '../../components/OrderCard';
import { EmptyState } from '../../components/ui';
import { useUserStore } from '../../stores/user.store';
import { colors, spacing } from '../../theme';

export const OrdersScreen = ({ navigation }) => {
  const orders = useUserStore((state) => state.orders);
  const orderHistory = useUserStore((state) => state.orderHistory);
  const fetchUserOrders = useUserStore((state) => state.fetchUserOrders);
  const fetchOrderHistory = useUserStore((state) => state.fetchOrderHistory);
  const [tab, setTab] = useState('active');
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchUserOrders(), fetchOrderHistory()]);
    setRefreshing(false);
  }, [fetchUserOrders, fetchOrderHistory]);

  useFocusEffect(
    useCallback(() => {
      fetchUserOrders();
      fetchOrderHistory();
    }, [fetchUserOrders, fetchOrderHistory])
  );

  const data = tab === 'active' ? orders : orderHistory;

  return (
    <View style={styles.screen}>
      <SegmentedButtons
        value={tab}
        onValueChange={setTab}
        style={styles.tabs}
        buttons={[
          { value: 'active', label: `Active (${orders.length})`, icon: 'truck-fast-outline' },
          { value: 'past', label: `Past (${orderHistory.length})`, icon: 'history' },
        ]}
      />
      <FlatList
        data={data}
        keyExtractor={(order) => String(order.orden_id)}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={(order) => navigation.navigate('OrderDetail', { order })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <EmptyState
            icon={tab === 'active' ? 'truck-outline' : 'history'}
            title={tab === 'active' ? 'No active orders' : 'No past orders yet'}
            description={
              tab === 'active'
                ? 'Orders you place will show up here while they are on their way.'
                : 'Delivered orders will appear here.'
            }
            actionLabel="Start shopping"
            onAction={() => navigation.navigate('HomeTab')}
          />
        }
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={refresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabs: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  list: {
    padding: spacing.lg,
    flexGrow: 1,
  },
  separator: {
    height: spacing.md,
  },
});
