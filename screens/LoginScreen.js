import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity, Dimensions,  ImageBackground, SafeAreaView, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import bgImage from '../img/bg_login.png'
import { BaseButton } from 'react-native-gesture-handler';

const { width: WIDTH } = Dimensions.get('window')

class LoginScreen extends PureComponent {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
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
          />
          <BaseButton style={styles.button} onPress={() => this.props.navigation.navigate('ConfirmaToken')}>
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
    fontSize: 28
  },
  input:{
    width: WIDTH - 100,
    padding: 20,
    borderWidth: 1,
    borderColor: '#985FEE',
    borderRadius: 6,
    marginTop: 10,
    fontSize: 18,
  },
  button:{
    padding: 20,
    width: WIDTH - 50,
    borderRadius: 6,
  },
  gradient:{
    padding: 15,
    alignItems: 'center',
    borderRadius: 6,
  },
  text:{
    color: '#fff',
    fontSize: 18
  },
  socialLogin:{
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonSocial:{
    padding: 15,
    width: 150,
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
    fontSize: 18
  }
});

export default LoginScreen;
