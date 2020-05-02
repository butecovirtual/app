import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageBackground, SafeAreaView, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import bgImage from '../img/bg_cadastro.png'
import { BaseButton } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text'
const { width: WIDTH } = Dimensions.get('window')

class CadastroScreen extends PureComponent {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      celular: null
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={bgImage} style={styles.bgContainer}>
          <Image source={require('../img/logo_cadastro.png')} style={styles.logo} />
        </ImageBackground>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Faça seu cadastro</Text>
          <View style={{alignItems: 'center'}}>
          <TextInput
            placeholder={'Nome de usuário'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid='transparent'
            autoCapitalize={'none'}
            style={styles.input}
          />
          <TextInputMask
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            placeholder={'Celular'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid='transparent'
            style={styles.input}
            value={this.state.celular}
            onChangeText={text => {
              this.setState({
                celular: text
              })
            }}
          />
          <BaseButton style={styles.button} onPress={() => this.props.navigation.navigate('ConfirmaToken')}>
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#6202F5', '#8D42FF']} style={styles.gradient}>
              <Text style={styles.text}>Cadastrar</Text>
            </LinearGradient>
          </BaseButton>
          <View style={styles.footerContainer}>
            <Text style={styles.textCadastro}>Ao me cadastrar eu declaro que li e aceito os <Text style={{ color: '#985FEE' }}>Termos e Condições</Text></Text>
          </View>
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
    flex: 0.5,
    justifyContent: 'flex-start'
  },
  logo: {
    marginTop: 50,
  },
  loginContainer: {
    flex: 1,
    marginTop: 65
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 55
  },
  input: {
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
  gradient: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 6,
  },
  text: {
    color: '#fff',
    fontSize: 14
  },
  socialLogin: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonSocial: {
    padding: 15,
    width: 150,
    borderRadius: 6,
    alignItems: 'center',
    margin: 5
  },
  footerContainer: {
    alignItems: 'center',
    padding: 50,
    justifyContent: 'center',
  },
  textCadastro: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center'
  }
});

export default CadastroScreen;
