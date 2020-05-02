import React, { PureComponent } from 'react';
import {  View, Text, SafeAreaView, Dimensions, StyleSheet,TextInput  } from 'react-native';
import { ScrollView, BaseButton } from 'react-native-gesture-handler';
import Icon  from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

const { width: WIDTH } = Dimensions.get('window')

class CriarPerfilScreen extends PureComponent {

  static navigationOptions = {
    headerStyle:{
      backgroundColor: '#2B2B2B',
      height: 80,
    },
    headerTitle: <View style={{alignItems: 'center', marginTop: 10}}>
    <Text style={{color: '#fff', fontSize: 30, fontFamily: 'Roboto-Bold'}}>CRIE SEU PERFIL</Text>
    <Text style={{color: '#6202F5', fontSize: 30, fontFamily: 'Roboto-Bold', marginTop: 5}}>DE ARTISTA</Text>
    </View>
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1,backgroundColor: '#2B2B2B'}}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>Para que você possa fazer uma LIVE precisamos que você crie um perfil de artista com as informações abaixo: </Text>
        <View style={styles.form}>
          <TextInput 
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder={'Nome do artista/banda'}
            placeholderTextColor={'#B6B6B6'}
          />
          <TextInput 
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder={'Gênero musical'}
            placeholderTextColor={'#B6B6B6'}
          />
          <TextInput 
            style={[styles.input, {height: 100} ]}
            underlineColorAndroid="transparent"
            placeholder={'Bio'}
            placeholderTextColor={'#B6B6B6'}
            multiline = {true}
            numberOfLines = {4}
          />
          <View style={styles.inputContainer}>
            <Icon
              name={"instagram"}
              size={28}
              color={"#6202F5"}
              style={styles.inputIcon}
            />
            <TextInput 
              style={[styles.input, {paddingLeft: 50,}]}
              underlineColorAndroid="transparent"
              placeholder={'Instagram'}
              placeholderTextColor={'#B6B6B6'}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name={"youtube"}
              size={28}
              color={"#6202F5"}
              style={styles.inputIcon}
            />
            <TextInput 
              style={[styles.input, {paddingLeft: 50,}]}
              underlineColorAndroid="transparent"
              placeholder={'Youtube'}
              placeholderTextColor={'#B6B6B6'}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name={"facebook"}
              size={28}
              color={"#6202F5"}
              style={styles.inputIcon}
            />
            <TextInput 
              style={[styles.input, {paddingLeft: 50,}]}
              underlineColorAndroid="transparent"
              placeholder={'Facebook'}
              placeholderTextColor={'#B6B6B6'}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              name={"spotify"}
              size={28}
              color={"#6202F5"}
              style={styles.inputIcon}
            />
            <TextInput 
              style={[styles.input, {paddingLeft: 50,}]}
              underlineColorAndroid="transparent"
              placeholder={'Spotify'}
              placeholderTextColor={'#B6B6B6'}
            />
          </View>
          
          <BaseButton style={styles.button}>
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#6202F5', '#8D42FF']} style={styles.gradient}>
              <Text style={styles.textButton}>Criar perfil de artista</Text>
            </LinearGradient>
          </BaseButton>
          
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    marginTop: 100,
    backgroundColor: '#2B2B2B',
  },
  text: { 
    color: '#fff',
    padding: 20,
    paddingLeft: 70,
    paddingRight: 70,
    textAlign: 'center'
  },
  form:{
    alignItems: 'center'
  },
  input:{ 
    width: WIDTH - 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6202F5',
    padding: 20,
    fontSize: 16,
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 10
  },
  inputIcon: {
    position: "absolute",
    top: 26,
    left: 15
  },
  button:{
    padding: 20,
    width: WIDTH - 50,
    borderRadius: 6,
    marginBottom: 200
  },
  gradient:{
    padding: 15,
    alignItems: 'center',
    borderRadius: 6,
  },
  textButton: {
    color: '#fff',
    fontSize: 16
  },
})

export default CriarPerfilScreen;
