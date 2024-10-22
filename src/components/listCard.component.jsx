import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useCartStore } from '../Stores/card.store';

export const ListCardComponent = () => {
  const productSelected = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const setQuantity = useCartStore((state) => state.setQuantity);

  const increaseQuantity = (product) => {
    addToCart(product);
  };

  const decreaseQuantity = (product) => {
    if (product.cantidad > 1) {
      setQuantity(product.producto_id, product.cantidad - 1);
    } else {
      removeFromCart(product.producto_id);
    }
  };

  const deleteProduct = (productId) => {
    removeFromCart(productId);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      {productSelected.map((element) => (
        <Card key={element.producto_id} style={{ marginBottom: 10 }}>
          <Card.Title
            title={element.nombre_producto}
            subtitle={`Precio: ${element.precio}`}
            style={{ paddingTop: 20 }}
            titleVariant='titleLarge'
          />
          <Card.Actions>
            <Button
              icon='plus'
              mode='contained'
              labelStyle={{ marginLeft: 10 }}
              onPress={() => increaseQuantity(element)}
            >
            </Button>
            <Text variant='headlineSmall'>{element.cantidad}</Text>
            <Button
              icon='minus'
              mode='contained'
              labelStyle={{ marginLeft: 10 }}
              onPress={() => decreaseQuantity(element)}
            >
            </Button>
            <Button
              icon='delete'
              mode='contained'
              labelStyle={{ marginLeft: 10 }}
              onPress={() => deleteProduct(element.producto_id)}
            >
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </View>
  );
};
