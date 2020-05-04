import React from "react";
import { AppRegistry, AsyncStorage, Platform, YellowBox} from "react-native";
import { Provider } from "react-redux";
import { init } from "@rematch/core";
import { PersistGate } from "redux-persist/lib/integration/react";
import createRematchPersist, { getPersistor } from "@rematch/persist";
import createLoadingPlugin from "@rematch/loading";
import { Root } from "native-base";
import Reactotron, { asyncStorage, openInEditor, networking, trackGlobalErrors } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux'

import SplashScreen from "./screens/SplashScreen";
import DropdownAlert from "react-native-dropdownalert";
import DropDownHolder from "./utils/DropDownHolder";

import models from './models';
import App from "./App";
import { name as appName } from "./app.json";

YellowBox.ignoreWarnings([ 
  'DrawerLayoutAndroid drawerPosition',
  'Cant perform a React state update on an unmounted',
  'componentWillReceiveProps is deprecated',
  'componentWillMount',
  'componentWillReceiveProps has been renamed',
  'componentWillUpdate has been renamed',
  'Require cycle',
  'DrawerLayoutAndroid drawerPosition' 
]);

const loading = createLoadingPlugin({
  whitelist: [
    "user/checkLoginAsync",
    "user/signInAsync",
    "user/createUserAsync",
    "user/getUserAsync",
    "live/createLiveAsync",
    "live/getLivesAsync",
    "live/getDetailLiveAsync",
    "live/getLivesArtistAsync",
    "artist/createArtistAsync"
  ]
});

const persistPlugin = createRematchPersist({
  whitelist: ["user"],
  storage: AsyncStorage,
  version: 1
});

const store = init({
  models,
  plugins: [persistPlugin, loading]
});

export const { dispatch, getState } = store

const persistor = getPersistor();

console.tron = Reactotron
.configure({ host: "192.168.0.37" })
.use(reactotronRedux())
.useReactNative()
.connect()

const Application = () => (
  <Root>
    <PersistGate loading={<SplashScreen />} persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
    <DropdownAlert
      ref={ref => DropDownHolder.setDropDown(ref)}
      closeInterval={6000}
    />
  </Root>
);

AppRegistry.registerComponent(appName, () => Application);
