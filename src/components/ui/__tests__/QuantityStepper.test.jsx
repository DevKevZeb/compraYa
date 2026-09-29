import { fireEvent, render, screen } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { QuantityStepper } from '../QuantityStepper';

const renderStepper = (props) =>
  render(
    <PaperProvider>
      <QuantityStepper {...props} />
    </PaperProvider>
  );

describe('QuantityStepper', () => {
  it('increments and decrements the value', async () => {
    const onChange = jest.fn();
    await renderStepper({ value: 2, onChange });

    await fireEvent.press(screen.getByLabelText('Increase quantity'));
    await fireEvent.press(screen.getByLabelText('Decrease quantity'));

    expect(onChange.mock.calls).toEqual([[3], [1]]);
  });

  it('does not go below the minimum or above the maximum', async () => {
    const onChange = jest.fn();
    await renderStepper({ value: 1, onChange, max: 1 });

    await fireEvent.press(screen.getByLabelText('Decrease quantity'));
    await fireEvent.press(screen.getByLabelText('Increase quantity'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('can go to zero to remove an item', async () => {
    const onChange = jest.fn();
    await renderStepper({ value: 1, onChange, allowZero: true });

    await fireEvent.press(screen.getByLabelText('Decrease quantity'));

    expect(onChange).toHaveBeenCalledWith(0);
  });
});
