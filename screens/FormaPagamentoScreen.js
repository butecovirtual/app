import React, { PureComponent } from 'react'
import { View, Text, SafeAreaView, Dimensions, StyleSheet, TextInput } from 'react-native';
import { ScrollView, BaseButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { TextInputMask } from 'react-native-masked-text'

const { width: WIDTH } = Dimensions.get('window')

export class FormaPagamentoScreen extends PureComponent {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#2B2B2B',
            height: 80,
        },
        headerTitle: <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row' }}>
            <Text style={{ color: '#fff', fontSize: 24, fontFamily: 'Roboto-Bold' }}>PAGAR COM</Text>
            <Text style={{ color: '#6202F5', fontSize: 24, fontFamily: 'Roboto-Bold', marginLeft: 5 }}>CARTÃO</Text>
        </View>
    }

    constructor(props) {
        super(props);
        this.state = {
            cpf: null,
            validade: null,
            cvv: null,
            nascimento: null,
            numeroCartao: null,
        };
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#2B2B2B' }}>
                <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                    <Text style={styles.text}>Digite os dados do cartão de crédito:</Text>
                    <View style={styles.produtoEscolhido}>
                        <View style={styles.nomeProduto}>
                            <Text style={styles.textEscolha}>Você escolheu</Text>
                            <Text style={styles.textProduto}>Ficar em pé</Text>
                        </View>
                        <View style={styles.valorContainer}>
                            <Text style={styles.textValor}>R$5</Text>
                        </View>
                    </View>
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder={'Titular do cartão'}
                            placeholderTextColor={'#B6B6B6'}
                        />
                        <TextInputMask
                            type={'credit-card'}
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder={'Número do cartão'}
                            placeholderTextColor={'#B6B6B6'}
                            value={this.state.numeroCartao}
                            onChangeText={text => {
                                    this.setState({
                                        numeroCartao: text
                                    })
                                }}
                        />
                        <View style={{ flexDirection: 'row', width: WIDTH - 100, justifyContent: 'space-between' }}>
                            <TextInputMask
                                type={'custom'}
                                options={{
                                    mask: '99/99'
                                }}
                                style={[styles.input, { width: '47%' }]}
                                underlineColorAndroid="transparent"
                                placeholder={'Validade'}
                                keyboardType={'numeric'}
                                placeholderTextColor={'#B6B6B6'}
                                value={this.state.validade}
                                onChangeText={text => {
                                    this.setState({
                                        validade: text
                                    })
                                }}
                            />
                            <TextInputMask
                                type={'custom'}
                                options={{
                                    mask: '9999'
                                }}
                                style={[styles.input, { width: '47%' }]}
                                underlineColorAndroid="transparent"
                                keyboardType={'numeric'}
                                placeholder={'CVV'}
                                placeholderTextColor={'#B6B6B6'}
                                value={this.state.cvv}
                                onChangeText={text => {
                                    this.setState({
                                        cvv: text
                                    })
                                }}
                            />
                        </View>

                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '99/99/9999'
                            }}
                            keyboardType={'numeric'}
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder={'Data nascimento'}
                            placeholderTextColor={'#B6B6B6'}
                            value={this.state.nascimento}
                            onChangeText={text => {
                                this.setState({
                                    nascimento: text
                                })
                            }}
                        />

                        <TextInputMask
                            type={'cpf'}
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder={'CPF Titular'}
                            placeholderTextColor={'#B6B6B6'}
                            value={this.state.cpf}
                            onChangeText={text => {
                                this.setState({
                                    cpf: text
                                })
                            }}
                        />


                        <BaseButton style={styles.button} onPress={() => this.props.navigation.navigate('StatusPagamento')}>
                            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#6202F5', '#8D42FF']} style={styles.gradient}>
                                <Text style={styles.textButton}>PAGAR</Text>
                            </LinearGradient>
                        </BaseButton>

                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
        marginTop: 80,
        alignItems: 'center',
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
    input:{
        width: WIDTH - 100,
        maxHeight: 50,
        padding: 15,
        borderWidth: 1,
        borderColor: '#985FEE',
        borderRadius: 6,
        color: '#fff',
        marginTop: 10,
        fontSize: 14,
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
        padding: 15,
        width: WIDTH - 70,
        borderRadius: 6,
        marginBottom: 100,
        fontSize: 16,
      },
    gradient: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 6,
    },
    textButton: {
        color: '#fff',
        fontSize: 14
    },
    produtoEscolhido: {
        padding: 10,
        width: WIDTH - 100,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    nomeProduto: {
        alignItems: 'center'
    },
    textEscolha: {
        color: '#fff',
        fontFamily: 'Roboto-Regular',
        fontSize: 14
    },
    textProduto: {
        color: '#fff',
        fontFamily: 'Roboto-Medium',
        fontSize: 18
    },
    valorContainer: {
        borderRadius: 10,
        width: 70,
        height: 70,
        borderWidth: 1,
        borderColor: '#6202F5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textValor: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Roboto-Medium'
    }
})

export default FormaPagamentoScreen
