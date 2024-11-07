import { View } from 'react-native';

import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar, Badge } from 'react-native-paper';
import Feather from '@expo/vector-icons/Feather';
import { styles } from '../styles/globalStyle';
import { useCartStore } from '../Stores/card.store';

export const CustomNavigationBarProducts = ({ navigation, options, back }) => {
  const { goBack, navigate } = navigation;

  const totalItemsInCart = useCartStore((state) => state.totalItemsInCart());
  const title = getHeaderTitle(options);

  return (
    <Appbar.Header style={styles.appBar}>
      {!back ? <Appbar.BackAction onPress={goBack} /> : null}

      <Appbar.Content title={title} />
      {back ? (
        
        <View style={styles.iconWithBadge}>
          <Appbar.Action
            icon={() => (
              <Feather name='shopping-cart' size={24} color='black' />
            )}
            onPress={() => {
              navigate('Carrito');
            }}
          />
          {totalItemsInCart > 0 ? (
            <Badge style={styles.badge}>{totalItemsInCart}</Badge>
          ) : null}
        </View>
      ) : null}
    </Appbar.Header>
  );
};
