import Constants from 'expo-constants';
import * as firebase from 'firebase';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { applyMiddleware, configureStore} from 'redux';
import thunk from 'redux-thunk';
import Route from './src/navigation/main';
import rootReducer from './src/redux/reducers';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore(rootReducer, applyMiddleware(thunk))

if (firebase.apps.length === 0) {
  firebase.initializeApp(Constants.manifest.web.config.firebase)
} else {
  firebase.app()
}
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } }
})
export default function App() {
  return (
    <Provider store={store} >
      <QueryClientProvider client={queryClient}>
        <Route />
      </QueryClientProvider>
    </Provider>
  );
}

