import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from "react-redux";
import { BaseButton, ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TextInputMask } from 'react-native-masked-text'
import moment from 'moment';
import { removeCharsCurrency } from '../utils/formatters'
import { StackActions, NavigationActions } from 'react-navigation';


const { width: WIDTH } = Dimensions.get('window')

export class CriarLiveScreen extends PureComponent {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#2B2B2B',
            height: 80,
        },
        headerTitle: <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ color: '#fff', fontSize: 30, fontFamily: 'Roboto-Bold' }}>FAÇA SUA</Text>
            <Text style={{ color: '#6202F5', fontSize: 30, fontFamily: 'Roboto-Bold', marginLeft: 5 }}>LIVE</Text>
        </View>
    }

    constructor(props) {
        super(props);
        this.state = {
            nomeLive: null,
            dataLive: null,
            horaInicio: null,
            valorEntrada: null,
            valorMesa: null
        };
    }

    componentDidMount(){
        const { user:  { artist }, navigation: { dispatch }} = this.props
        if(!artist){
            const resetAction = StackActions.reset({
                index: 1,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home' }),
                    NavigationActions.navigate({ routeName: 'CriarPerfil' }),
                ]
                });
                dispatch(resetAction);
        }
    }

    register = () => {
        const { create, navigation: { navigate }} = this.props
        const { nomeLive, dataLive, horaInicio, valorMesa, valorEntrada } = this.state
        const dtLive = moment(`${dataLive} ${horaInicio}`, 'DD/MM/YYYY HH:mm')
        console.tron.log(dtLive)
        if(dataLive && horaInicio && valorMesa && valorEntrada)
            create({
                title: nomeLive,
                when: dtLive,
                valueBase: parseFloat(removeCharsCurrency(valorEntrada)),
                valueTable: parseFloat(removeCharsCurrency(valorMesa))
            })
            .then(() => navigate("Home"))
            .catch();

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#2B2B2B' }}>
                <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.text}> Para que você possa fazer uma LIVE preciso de mais algumas informações. </Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder={'Título da LIVE'}
                        placeholderTextColor={'#B6B6B6'}
                        onChangeText={text => {
                                this.setState({
                                    nomeLive: text
                                })
                            }}
                    />
                    <View style={{ flexDirection: 'row', width: WIDTH - 100, justifyContent: 'space-between' }}>
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            style={[styles.input, { width: '47%' }]}
                            underlineColorAndroid="transparent"
                            placeholder={'Data da LIVE'}
                            placeholderTextColor={'#B6B6B6'}
                            value={this.state.dataLive}
                            onChangeText={text => {
                                this.setState({
                                    dataLive: text
                                })
                            }}
                        />
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'HH:mm'
                            }}
                            keyboardType={'numeric'}
                            style={[styles.input, { width: '47%' }]}
                            underlineColorAndroid="transparent"
                            placeholder={'Hora de início'}
                            placeholderTextColor={'#B6B6B6'}
                            value={this.state.horaInicio}
                            onChangeText={text => {
                                this.setState({
                                    horaInicio: text
                                })
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', width: WIDTH - 100, justifyContent: 'space-between' }}>
                        <TextInputMask
                            type={'money'}
                            style={[styles.input, { width: '47%' }]}
                            underlineColorAndroid="transparent"
                            placeholder={'Valor entrada'}
                            keyboardType={'numeric'}
                            placeholderTextColor={'#B6B6B6'}
                            value={this.state.valorEntrada}
                            onChangeText={text => {
                                this.setState({
                                    valorEntrada: text
                                })
                            }}
                        />
                        <TextInputMask
                            type={'money'}
                            style={[styles.input, { width: '47%' }]}
                            underlineColorAndroid="transparent"
                            placeholder={'Valor da mesa'}
                            keyboardType={'numeric'}
                            placeholderTextColor={'#B6B6B6'}
                            value={this.state.valorMesa}
                            onChangeText={text => {
                                this.setState({
                                    valorMesa: text
                                })
                            }}
                        />
                    </View>
                    <TextInput
                        style={[styles.input, { height: 100 }]}
                        underlineColorAndroid="transparent"
                        placeholder={'Patrocinadores'}
                        placeholderTextColor={'#B6B6B6'}
                        multiline={true}
                        numberOfLines={4}
                    />

                    <BaseButton style={[styles.button, { alignItems: 'center', marginTop: 10 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.btnUpload}><Icon color={'#fff'} size={24} name={'plus'} /></View>
                            <Text style={styles.textButton}>Preview de música</Text>
                        </View>
                    </BaseButton>

                    <BaseButton style={styles.button} onPress={this.register}>
                        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#6202F5', '#8D42FF']} style={styles.gradient}>
                            <Text style={styles.textButton}>Criar LIVE</Text>
                        </LinearGradient>
                    </BaseButton>

                    <BaseButton style={[styles.button, { alignItems: 'center' }]} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.textButton}>Agora não</Text>
                    </BaseButton>
                </View>
            </View>
            </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        backgroundColor: '#2B2B2B',
    },
    text: {
        color: '#fff',
        padding: 20,
        marginTop: 30,
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
    textButton: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 10
    },
    btnUpload: {
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#6202F5'
    }
});

const mapState = state => ({
    user: state.user,
    loading: state.loading.effects.live.createLiveAsync,
  });
  
  const mapDispatch = dispatch => ({
    create: payload => dispatch.live.createLiveAsync(payload),
  });
  
  export default connect(
    mapState,
    mapDispatch
  )(CriarLiveScreen);
  
