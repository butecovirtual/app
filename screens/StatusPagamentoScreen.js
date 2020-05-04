import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from "react-redux";
import { BaseButton } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const { width: WIDTH } = Dimensions.get('window')


export class StatusPagamentoScreen extends PureComponent {

    static navigationOptions = {
        header: null
    }

    render() {
        const { lives: { liveSelected: { id }} } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Icon name={'check'} size={60} color={'#fff'} />
                </View>
                <Text style={styles.title}>PAGAMENTO APROVADO!</Text>
                <Text style={styles.text}>Obrigado por ajudar mais um artista. {'\n'} Divirta-se!</Text>
                <BaseButton style={styles.button} onPress={() => this.props.navigation.navigate('LiveStack', {user: 'viewer', idStream: id})}> 
                    <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#6202F5', '#8D42FF']} style={styles.gradient}>
                        <Text style={styles.textButton}>ASSISTIR AGORA</Text>
                    </LinearGradient>
                </BaseButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2B2B2B',
    },
    title: {
        fontSize: 30,
        fontFamily: 'Roboto-Bold',
        color: '#fff',
        textAlign: 'center',
        margin: 50,
    },
    iconContainer: {
        backgroundColor: '#6202F5',
        padding: 20,
        borderRadius: 100
    },
    text: {
        color: '#fff',
        textAlign: 'center'
    },
    button: {
        padding: 20,
        width: WIDTH - 50,
        borderRadius: 6,
        marginTop: 50,
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

const mapState = state => ({
    user: state.user,
    lives: state.live
  })
  
  const mapDispatch = dispatch => ({
  })
  
  export default connect(mapState, mapDispatch)(StatusPagamentoScreen);
  
