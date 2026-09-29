import { Header } from '../components/ui';
import { colors } from '../theme';

// Shared options for every stack inside the main tabs.
export const stackScreenOptions = {
  header: (props) => <Header {...props} />,
  contentStyle: { backgroundColor: colors.background },
};
