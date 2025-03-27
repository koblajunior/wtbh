import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import router from './router';
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider> 
      </PersistGate>
    </Provider>
  </StrictMode>
);
