import {ToastContainer} from '@components';
import {HomeView} from '@screens';
import {ThemeProvider} from '@styles';

const App = () => (
  <ThemeProvider>
    <ToastContainer>
      <HomeView />
    </ToastContainer>
  </ThemeProvider>
);

export {App};
