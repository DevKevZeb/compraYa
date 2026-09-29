import { render, screen } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { CheckoutSteps } from '../CheckoutSteps';
import { OrderSummary } from '../OrderSummary';

const wrap = (ui) => render(<PaperProvider>{ui}</PaperProvider>);

describe('checkout components', () => {
  it('numbers upcoming steps and marks progress', async () => {
    await wrap(<CheckoutSteps steps={['Address', 'Payment', 'Review']} current={1} />);

    expect(screen.getByLabelText('Step 2 of 3')).toBeOnTheScreen();
    expect(screen.getByText('Payment')).toBeOnTheScreen();
    // Step 1 is completed (check icon), so only steps 2 and 3 show numbers.
    expect(screen.queryByText('1')).not.toBeOnTheScreen();
    expect(screen.getByText('2')).toBeOnTheScreen();
    expect(screen.getByText('3')).toBeOnTheScreen();
  });

  it('summarizes items, shipping and total', async () => {
    await wrap(
      <OrderSummary
        items={[
          { producto_id: 1, precio: 100, cantidad: 2 },
          { producto_id: 2, precio: 50.5, cantidad: 1 },
        ]}
      />
    );

    expect(screen.getByText('Subtotal (3 items)')).toBeOnTheScreen();
    expect(screen.getByText('Bs 250.50')).toBeOnTheScreen();
    expect(screen.getByText('Bs 20.00')).toBeOnTheScreen();
    expect(screen.getByText('Bs 270.50')).toBeOnTheScreen();
  });
});
