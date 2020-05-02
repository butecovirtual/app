import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageBackground, SafeAreaView, TextInput, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
        };
    }

    componentDidMount(){
        this.refs['key1'].focus()
    }

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
                            onChangeText={(key1) => {
                                key1 != "" && this.refs['key2'].focus()
                            }}
                        />
                        <TextInput
                            ref={'key2'}
                            maxLength={1}
                            keyboardType={'numeric'}
                            underlineColorAndroid='transparent'
                            autoCapitalize={'none'}
                            style={styles.input}
                            onChangeText={(key2) => {
                                key2 != "" && this.refs['key3'].focus()
                            }}
                            onKeyPress={({ nativeEvent }) => {
                                nativeEvent.key === 'Backspace' &&
                                this.refs['key1'].focus()
                            }}
                        />
                        <TextInput
                            ref={'key3'}
                            maxLength={1}
                            keyboardType={'numeric'}
                            underlineColorAndroid='transparent'
                            autoCapitalize={'none'}
                            style={styles.input}
                            onChangeText={(key3) => {
                                key3 != "" && this.refs['key4'].focus()
                            }}
                            onKeyPress={({ nativeEvent }) => {
                                nativeEvent.key === 'Backspace' &&
                                this.refs['key2'].focus()
                            }}
                        />
                        <TextInput
                            ref={'key4'}
                            maxLength={1}
                            keyboardType={'numeric'}
                            underlineColorAndroid='transparent'
                            autoCapitalize={'none'}
                            style={styles.input}
                            onKeyPress={({ nativeEvent }) => {
                                nativeEvent.key === 'Backspace' &&
                                this.refs['key3'].focus()
                                Keyboard.dismiss()
                                this.props.navigation.navigate('HomeStack')
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

export default ConfirmaTokenScreen;
