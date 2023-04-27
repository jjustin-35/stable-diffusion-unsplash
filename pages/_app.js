import { Provider } from 'react-redux';

import GlobalStyles from './_globalStyles';
import { store } from '../store';
import '../config/firebase';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}
