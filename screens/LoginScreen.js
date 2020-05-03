import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity, Dimensions,  ImageBackground, SafeAreaView, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import { addAuthToken } from "../repositories";
import bgImage from '../img/bg_login.png'
import { BaseButton } from 'react-native-gesture-handler';
import { validate } from "../utils/validation";

import TextError from "../components/textError";

const { width: WIDTH } = Dimensions.get('window')

class LoginScreen extends PureComponent {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.loadPersistedData();
    this.state = {
      username: null,
      errorUsername: null,
      userNameErrorMessage: null
    };
  }

  loadPersistedData = () => {
    const {
      user,
      navigation: { navigate }
    } = this.props;
    if (user && Object.keys(user).length > 0) {
      console.tron.log(user)
      if(user.token){
        addAuthToken(user.token);
        navigate("HomeStack");
      }
      else navigate("Login");
      
    }
  };

  handleUsername = (username) => {
    const v = validate("username", username);
    this.setState({ username, errorUsername: !v[0], usernameErrorMessage: v[1] });
  };

  logar = () => {
    const { username } = this.state;
    const {
      navigation: { navigate },
      checkLogin
    } = this.props;

    const payload = { username };

    if (this.validateForm()) {
      checkLogin(payload)
        .then(() => navigate("ConfirmaToken"))
        .catch();
    }
  };

  validateForm = () => {
    const { username } = this.state;
    const validateUsername = validate("username", username);
    this.setState({
      errorUsername: !validateUsername[0],
      usernameErrorMessage: validateUsername[1]
    });
    return validateUsername[0];
  };

  render() {

    const {
      username,
      errorUsername,
      usernameErrorMessage,
    } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.bgContainer}>
          <Image source={require('../img/logo_login.png')} style={styles.logo} />
        </ImageBackground>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Seu artista em sua casa!</Text>
          <TextInput
            placeholder={'Nome de usuário'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid='transparent'
            autoCapitalize={'none'}
            style={styles.input}
            onChangeText={this.handleUsername}
            onBlur={() =>
              this.setState({ errorUserName: false, userNameErrorMessage: undefined })
            }
          />
          <TextError showError={errorUsername} errorMessage={usernameErrorMessage} />
          <BaseButton style={styles.button} onPress={this.logar}>
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#6202F5', '#8D42FF']} style={styles.gradient}>
              <Text style={styles.text}>Entrar</Text>
            </LinearGradient>
          </BaseButton>
          <View style={styles.socialLogin}>
            <BaseButton style={[styles.buttonSocial, {backgroundColor: '#45619D'}]}>
                <Text style={styles.text}>Facebook</Text>
            </BaseButton>
            <BaseButton style={[styles.buttonSocial, {backgroundColor: '#EA1D2C'}]}>
                <Text style={styles.text}>iFood</Text>
            </BaseButton>
          </View>
          <View style={styles.footerContainer}>
            <BaseButton style={{padding: 10,}} onPress={() => this.props.navigation.navigate('Cadastrar')}>
              <Text style={styles.textCadastro}>Não tenho cadastro</Text>
            </BaseButton>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717"
  },
  bgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  logo: {
    marginBottom: 80,
  },
  loginContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    color: '#fff',
    fontSize: 24
  },
  input:{
    width: WIDTH - 100,
    maxHeight: 50,
    padding: 15,
    borderWidth: 1,
    borderColor: '#985FEE',
    borderRadius: 6,
    marginTop: 10,
    fontSize: 14,
  },
  button:{
    padding: 15,
    width: WIDTH - 70,
    borderRadius: 6,
    fontSize: 16,
  },
  gradient:{
    padding: 15,
    alignItems: 'center',
    borderRadius: 6,
  },
  text:{
    color: '#fff',
    fontSize: 14
  },
  socialLogin:{
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonSocial:{
    padding: 10,
    width: 120,
    borderRadius: 6,
    alignItems: 'center',
    margin: 5
  },
  footerContainer:{
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCadastro: {
    color: '#fff',
    fontSize: 14
  }
});

const mapState = state => ({
  user: state.user,
  loading: state.loading.effects.user.checkLoginAsync,
});

const mapDispatch = dispatch => ({
  checkLogin: payload => dispatch.user.checkLoginAsync(payload),
});

export default connect(
  mapState,
  mapDispatch
)(LoginScreen);
