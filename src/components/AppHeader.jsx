import { View } from 'react-native';

import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar, Badge } from 'react-native-paper';
import Feather from '@expo/vector-icons/Feather';
import { styles } from '../styles/global';
import { useCartStore } from '../stores/cart.store';

export const AppHeader = ({ navigation, options, back, route }) => {
  const { goBack, navigate } = navigation;

  const totalItemsInCart = useCartStore((state) => state.totalItemsInCart());
  const title = getHeaderTitle(options);
  const currentRoute = route?.name;

  return (
    <Appbar.Header style={styles.appBar}>
      {back && currentRoute !== 'Products' ? <Appbar.BackAction onPress={goBack} /> : null}

      <Appbar.Content title={title} />
      {currentRoute === 'Products' ? (
        <View style={styles.iconWithBadge}>
          <Appbar.Action
            icon={() => <Feather name="shopping-cart" size={24} color="black" />}
            onPress={() => {
              navigate('Cart');
            }}
          />
          {totalItemsInCart > 0 ? <Badge style={styles.badge}>{totalItemsInCart}</Badge> : null}
        </View>
      ) : null}
    </Appbar.Header>
  );
};
