import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import { BaseButton } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import SelectorType from "../components/selectorType";

const { width: WIDTH } = Dimensions.get('window')

export class SelecionarProdutoScreen extends PureComponent {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#2B2B2B',
            height: 80,
        },
        headerTitle: <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={{ color: '#fff', fontSize: 30, fontFamily: 'Roboto-Bold' }}>PAGAMENTO</Text>
        </View>
    }

    constructor(props) {
        super(props);
        this.state = {
            type: 1,
        };
      }

    handleType = type => {
        //const v = validate("typeVehicle", type);
        this.setState({ type });
    };

    render() {
        const { type } = this.state
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#2B2B2B' }}>
                <View style={styles.container}>
                    <Text style={styles.text}>Escolha uma das opções abaixo:</Text>
                    <SelectorType handleSelected={this.handleType} cardSelected={type} />
                    <BaseButton style={styles.button} onPress={() => this.props.navigation.navigate('FormaPagamento')}>
                        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#6202F5', '#8D42FF']} style={styles.gradient}>
                            <Text style={styles.textButton}>PRÓXIMO</Text>
                        </LinearGradient>
                    </BaseButton>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        alignItems: 'center',
    },
    text: {
        color: '#fff'
    },
    button: {
        padding: 20,
        width: WIDTH - 50,
        borderRadius: 6,
        marginBottom: 200
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
});

export default SelecionarProdutoScreen
