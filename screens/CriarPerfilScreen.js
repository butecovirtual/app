import React, { PureComponent } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet, TextInput } from 'react-native';
import { ScrollView, BaseButton } from 'react-native-gesture-handler';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { CriarLiveScreen } from './CriarLiveScreen';
import { validate } from '../utils/validation';
import TextError from '../components/textError';
import { StackActions, NavigationActions } from 'react-navigation';


const { width: WIDTH } = Dimensions.get('window')

class CriarPerfilScreen extends PureComponent {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#2B2B2B',
      height: 80,
    },
    headerTitle: <View style={{ alignItems: 'center', marginTop: 30 }}>
      <Text style={{ color: '#fff', fontSize: 24, fontFamily: 'Roboto-Bold' }}>CRIE SEU PERFIL</Text>
      <Text style={{ color: '#6202F5', fontSize: 24, fontFamily: 'Roboto-Bold' }}>DE ARTISTA</Text>
    </View>
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleName = (name) => {
    const v = validate("name", name);
    this.setState({ name, errorName: !v[0], nameErrorMessage: v[1] });
  };

  handleGenre = (genre) => {
    const v = validate("required", genre);
    this.setState({ genre, errorGenre: !v[0], genreErrorMessage: v[1] });
  };

  handleBio = (bio) => {
    const v = validate("required", bio);
    this.setState({ bio, errorBio: !v[0], bioErrorMessage: v[1] });
  };

  register = () => {
    const { navigation: { dispatch }, register } = this.props;
    const { name, genre, bio, instagram, youtube, spotify, facebook } = this.state

    const payload = {
      name,
      genre,
      bio,
      instagram,
      youtube,
      spotify,
      facebook,
    };

    if (this.validateForm()) {
      register(payload)
        .then(() => {
          const resetAction = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'Perfil' }),
            ]
            });
            dispatch(resetAction);
        })
        .catch();
    }
  };

  validateForm = () => {
    const { name, genre, bio } = this.state;
    const validateName = validate("name", name);
    const validateGenre = validate("required", genre);
    const validateBio = validate("required", bio);

    this.setState({
      errorName: !validateName[0],
      nameErrorMessage: validateName[1],
      errorGenre: !validateGenre[0],
      genreErrorMessage: validateGenre[1],
      errorBio: !validateBio[0],
      bioErrorMessage: validateBio[1],
    });
    return validateName[0] && validateGenre[0] && validateBio[0];
  };

  render() {

    const {
      name,
      errorName,
      nameErrorMessage,
      genre,
      errorGenre,
      genreErrorMessage,
      bio,
      errorBio,
      bioErrorMessage
    } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#2B2B2B' }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.text}>Para que você possa fazer uma LIVE precisamos que você crie um perfil de artista com as informações abaixo: </Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder={'Nome do artista/banda'}
              placeholderTextColor={'#B6B6B6'}
              value={this.state.name}
              onChangeText={this.handleName}
              onBlur={() =>
                this.setState({ errorName: false, nameErrorMessage: undefined })
              }
            />
            <TextError showError={errorName} errorMessage={nameErrorMessage} />
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder={'Gênero musical'}
              placeholderTextColor={'#B6B6B6'}
              value={this.state.genre}
              onChangeText={this.handleGenre}
              onBlur={() =>
                this.setState({ errorGenre: false, genreErrorMessage: undefined })
              }
            />
            <TextError showError={errorGenre} errorMessage={genreErrorMessage} />
            <TextInput
              style={[styles.input, { maxHeight: 90, height: 100 }]}
              underlineColorAndroid="transparent"
              placeholder={'Bio'}
              placeholderTextColor={'#B6B6B6'}
              multiline={true}
              numberOfLines={4}
              value={this.state.bio}
              onChangeText={this.handleBio}
              onBlur={() =>
                this.setState({ errorBio: false, bioErrorMessage: undefined })
              }
            />
            <TextError showError={errorBio} errorMessage={bioErrorMessage} />
            <View style={styles.inputContainer}>
              <Icon
                name={"instagram"}
                size={22}
                color={"#6202F5"}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { paddingLeft: 50, }]}
                underlineColorAndroid="transparent"
                placeholder={'Instagram'}
                placeholderTextColor={'#B6B6B6'}
                value={this.state.instagram}
                onChangeText={(instagram) => {
                  this.setState({ instagram })
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name={"youtube"}
                size={22}
                color={"#6202F5"}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { paddingLeft: 50, }]}
                underlineColorAndroid="transparent"
                placeholder={'Youtube'}
                placeholderTextColor={'#B6B6B6'}
                value={this.state.youtube}
                onChangeText={(youtube) => {
                  this.setState({ youtube })
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name={"facebook"}
                size={22}
                color={"#6202F5"}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { paddingLeft: 50, }]}
                underlineColorAndroid="transparent"
                placeholder={'Facebook'}
                placeholderTextColor={'#B6B6B6'}
                value={this.state.facebook}
                onChangeText={(facebook) => {
                  this.setState({ facebook })
                }}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name={"spotify"}
                size={22}
                color={"#6202F5"}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { paddingLeft: 50, }]}
                underlineColorAndroid="transparent"
                placeholder={'Spotify'}
                placeholderTextColor={'#B6B6B6'}
                value={this.state.spotify}
                onChangeText={(spotify) => {
                  this.setState({ spotify })
                }}
              />
            </View>

            <BaseButton style={styles.button} onPress={this.register}>
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
    textAlign: 'center'
  },
  form: {
    alignItems: 'center'
  },
  input: {
    width: WIDTH - 100,
    maxHeight: 50,
    padding: 15,
    borderWidth: 1,
    borderColor: '#985FEE',
    borderRadius: 6,
    marginTop: 10,
    color: '#fff',
    fontSize: 14,
  },
  inputIcon: {
    position: "absolute",
    top: 23,
    left: 15
  },
  button: {
    padding: 20,
    width: WIDTH - 50,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 100
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 6,
  },
  textButton: {
    color: '#fff',
    fontSize: 16
  },
})

const mapState = state => ({
  user: state.user,
  loading: state.loading.effects.user.createArtistAsync,
});

const mapDispatch = dispatch => ({
  register: payload => dispatch.artist.createArtistAsync(payload),
});

export default connect(
  mapState,
  mapDispatch
)(CriarPerfilScreen);
