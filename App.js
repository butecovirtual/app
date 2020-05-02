import React from "react";
import { Image, StyleSheet,Text } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome5'
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import CadastrarScreen from "./screens/CadastrarScreen";
import CustomDrawerContentComponent from "./screens/CustomDrawerContentComponent";
import ConfirmaTokenScreen from "./screens/ConfirmaTokenScreen";
import CriarPerfilScreen from "./screens/CriarPerfilScreen";
import PerfilScreen from "./screens/PerfilScreen";
import CriarLiveScreen from "./screens/CriarLiveScreen";
import DetalhesLiveScreen from "./screens/DetalhesLiveScreen";
import SelecionarProdutoScreen from "./screens/SelecionarProdutoScreen";
import FormaPagamentoScreen from "./screens/FormaPagamentoScreen";
import StatusPagamentoScreen from "./screens/StatusPagamentoScreen";
import LiveStreamScreen from "./screens/LiveStreamScreen";


const LoginStack = createStackNavigator(
  {
    Login: LoginScreen,
    Cadastrar: CadastrarScreen,
    ConfirmaToken: ConfirmaTokenScreen
  },
  {
    initialRouteName: "Login",
    mode: "modal"
  }
);

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Cadastrar: CadastrarScreen,
    ConfirmaToken: ConfirmaTokenScreen,
    CriarPerfil: CriarPerfilScreen,
    Perfil: PerfilScreen,
    CriarLive: CriarLiveScreen,
    DetalhesLive: DetalhesLiveScreen,
    SelecionarProduto: SelecionarProdutoScreen,
    FormaPagamento: FormaPagamentoScreen,
    StatusPagamento: StatusPagamentoScreen,
    LiveStreamScreen: LiveStreamScreen
  },
  {
    initialRouteName: "Home",
    mode: "modal",
    navigationOptions: ({ navigation: { goBack } }) => ({ 
      headerTransparent: true,
      headerLeft: (<Icon name="chevron-left" color={'#fff'} onPress={ () => { goBack() } } size={30} style={{marginLeft: 30}}/>),
      headerStyle: { marginTop: 30}
    })
  }
);

const DrawerNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="home"
                color={tintColor}
                size={18}
            />
        )
    })
    },
    CriarLive: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor, navigation }) => (
          <Image
          source={require("./img/btn-live.png")}
          resizeMode="contain"
        />
        )
    })
    },
    Perfil: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="user-friends"
                color={tintColor}
                size={18}
            />
        )
    })
    },
  },
  {
    initialRouteName: "Home",
    mode: "card",
    tabBarOptions: {
      showLabel: false, // hide labels
      activeTintColor: '#B483FF', // active icon color
      inactiveTintColor: '#fff',  // inactive icon color
      style: {
          height: 50,
          padding: 15,
          backgroundColor: '#0B0B0B' // TabBar background
      }
  }
  }
);


export default createSwitchNavigator(
  {
    HomeStack: {
      screen: DrawerNavigation,
      path: ''      
    },
    LoginStack: LoginStack
  },
  {
    initialRouteName: "LoginStack",
  }
);

const styles = StyleSheet.create({
  logo: {
    width: 30,
    margin: 10
  }
})
