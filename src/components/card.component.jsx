import { memo } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useCartStore } from '../Stores/card.store';
import { styles } from '../styles/globalStyle';

export const CardComponent = memo(function CardComponent({ item, onPress }) {
  const { nombre_producto, url_imagen, precio, producto_id, popularidad, stock } = item;

  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  // Select a boolean (not the isInCart function) so the card re-renders when the cart changes.
  const inCart = useCartStore((state) =>
    state.cartItems.some((cartItem) => cartItem.producto_id === producto_id)
  );
  const outOfStock = stock <= 0;

  const handleAddToCart = () => {
    addToCart({ nombre_producto, precio, producto_id });
  };

  const handleRemoveFromCart = () => {
    removeFromCart(producto_id);
  };

  const scaledPopularity = (popularidad / 100) * 5;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      // Decidir si la estrella es llena, media o vacía
      if (i <= Math.floor(scaledPopularity)) {
        stars.push(<MaterialIcons key={i} name="star" size={40} color="gold" />);
      } else if (i - 0.5 <= scaledPopularity) {
        stars.push(<MaterialIcons key={i} name="star-half" size={40} color="gold" />);
      } else {
        stars.push(<MaterialIcons key={i} name="star-border" size={40} color="gold" />);
      }
    }
    return stars;
  };
  return (
    <Card
      style={styles.card}
      onPress={() => onPress(item)}
      elevation={3}
      mode="elevated"
      delayLongPress={3}
    >
      <Card.Title title={nombre_producto} style={styles.cardTitle} />
      <Card.Cover style={{ height: 200 }} source={{ uri: url_imagen }} />
      <Card.Content style={{ marginTop: 20 }}>
        <Text>Precio: {precio} c/u</Text>
        <Text>{outOfStock ? 'Agotado' : `Stock: ${stock} unidades`}</Text>
        <View style={styleCard.startsRow}>
          <Text style={styleCard.startsContainer}>{renderStars()}</Text>
          <Text>{popularidad}%</Text>
        </View>
      </Card.Content>
      <Card.Actions>
        {inCart && (
          <Button
            buttonColor="#9C7CFE"
            mode="contained"
            textColor="#fff"
            style={{ backgroundColor: '#ff5f5f' }}
            onPress={handleRemoveFromCart}
          >
            Cancelar
          </Button>
        )}
        <Button
          buttonColor="#9C7CFE"
          textColor="#ffffff"
          icon="plus"
          onPress={handleAddToCart}
          disabled={outOfStock}
        >
          Añadir
        </Button>
      </Card.Actions>
    </Card>
  );
});

const styleCard = StyleSheet.create({
  startsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
