import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageBackground, SafeAreaView, TextInput, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import bgImage from '../img/bg_cadastro.png'
import { BaseButton, ScrollView } from 'react-native-gesture-handler';
const { width: WIDTH } = Dimensions.get('window')

class ConfirmaTokenScreen extends PureComponent {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            token: null
        };
    }

    componentDidMount() {
        this.refs['key1'].focus()
    }



    logar = () => {
        const { token } = this.state;
        const { navigation: { navigate }, login, user: { username } } = this.props;
        //console.tron.log(this.props)
        //console.tron.log(this.state)
        const payload = { username, token };

        if (username && token) {
            login(payload)
                .then(() => navigate("HomeStack"))
                .catch();
        }
    };


    handleToken = async (token) => {
        if (this.state.token == null)
            await this.setState({ token });
        else
            await this.setState({ token: this.state.token + token });
        if (this.state.token.length < 4)
            this.refs[`key${this.state.token.length + 1}`].focus()
        if (this.state.token.length == 4) {
            this.logar()
        }
    };

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <ImageBackground source={bgImage} style={styles.bgContainer}>
                    <Image source={require('../img/logo_cadastro.png')} style={styles.logo} />
                </ImageBackground>
                <View style={styles.loginContainer}>
                    <Text style={styles.title}>Enviamos um código para seu celular</Text>
                    <Text style={styles.subtitle}>Digite o código recebido nos campos abaixo para confirmar sua entrada.</Text>
                    <View style={styles.inputsContainer}>
                        <TextInput
                            ref={'key1'}
                            maxLength={1}
                            keyboardType={'numeric'}
                            underlineColorAndroid='transparent'
                            autoCapitalize={'none'}
                            style={styles.input}
                            onChangeText={this.handleToken}
                        />
                        <TextInput
                            ref={'key2'}
                            maxLength={1}
                            keyboardType={'numeric'}
                            underlineColorAndroid='transparent'
                            autoCapitalize={'none'}
                            style={styles.input}
                            onChangeText={this.handleToken}
                        />
                        <TextInput
                            ref={'key3'}
                            maxLength={1}
                            keyboardType={'numeric'}
                            underlineColorAndroid='transparent'
                            autoCapitalize={'none'}
                            style={styles.input}
                            onChangeText={this.handleToken}
                        />
                        <TextInput
                            ref={'key4'}
                            maxLength={1}
                            keyboardType={'numeric'}
                            underlineColorAndroid='transparent'
                            autoCapitalize={'none'}
                            style={styles.input}
                            onChangeText={this.handleToken}
                            onKeyPress={({ nativeEvent }) => {
                                Keyboard.dismiss()
                            }}
                        />
                    </View>
                    <View style={styles.footerContainer}>
                        <Text style={styles.textCadastro}>Não recebi o código</Text>
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#171717"
    },
    bgContainer: {
        flex: 0.4,
        justifyContent: 'flex-start'
    },
    logo: {
        marginTop: 50,
    },
    loginContainer: {
        flex: 1,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        color: '#fff',
        paddingLeft: 20,
        marginBottom: 10,
        fontSize: 24
    },
    subtitle: {
        color: '#fff',
        paddingLeft: 20,
        paddingRight: 25,
        fontSize: 14,
        marginBottom: 10
    },
    inputsContainer: {
        width: '90%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    input: {
        width: 70,
        height: 70,
        maxWidth: 65,
        padding: 10,
        borderWidth: 1,
        borderColor: '#985FEE',
        borderRadius: 10,
        marginTop: 10,
        fontSize: 50,
        textAlign: 'center',
        alignItems: 'center',
        color: '#fff'
    },
    button: {
        padding: 20,
        width: WIDTH - 50,
        borderRadius: 6,
    },
    gradient: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 6,
    },
    text: {
        color: '#fff',
        fontSize: 18
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
        padding: 40,
        justifyContent: 'center',
    },
    textCadastro: {
        color: '#985FEE',
        fontSize: 18,
        textAlign: 'center'
    }
});

const mapState = state => ({
    user: state.user,
    loading: state.loading.effects.user.signInAsync,
});

const mapDispatch = dispatch => ({
    login: payload => dispatch.user.signInAsync(payload),
});

export default connect(
    mapState,
    mapDispatch
)(ConfirmaTokenScreen);

