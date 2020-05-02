import React, { PureComponent } from 'react'
import { Text, View, Dimensions, ImageBackground, StyleSheet } from 'react-native'
import { ScrollView, BaseButton, RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

const { width: WIDTH } = Dimensions.get('window')

export class DetalhesLiveScreen extends PureComponent {
    render() {
        return (
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <ImageBackground source={require('../img/duete.jpg')} style={{ width: '100%', height: 350, justifyContent: 'flex-end', alignItems: 'flex-end' }}></ImageBackground>
                    <View style={styles.corte}></View>
                    <View style={styles.dadosArtista}>
                        <View style={styles.cardData}>
                            <Text style={styles.labelData}>01/06</Text>
                            <Text style={styles.labelHora}>19h</Text>
                        </View>
                        <View style={styles.bandaContainer}>
                            <Text style={styles.labelBanda}>DUETÊ</Text>
                            <Text style={styles.labelGenero}>Pop/Rock</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <View style={styles.rateContainer}>
                                <Icon name={'star'} size={18} color={'#fff'} />
                                <Text style={styles.labelRate}>4.5</Text>
                            </View>
                            <Text style={styles.valor}>R$5,00</Text>
                        </View>
                    </View>
                    <View style={styles.bioContainer}>
                        <Text style={styles.labelBio}>
                            A Duetê é uma banda de pop rock formada em Belo Horizonte no ano de 2017. O trio apresenta um show de música autorale repertório cover. É formada por Costa (vocal e guitarra), Lamac (vocal e baixo) e Peixe (vocal e bateria). Juntos há anos na busca da consolidação de um sonho coletivo, o grupo evidencia o sentimento e a vivência de cada um dos integrantes embalados em forma de música. Suas principais influências vêm do rock e do reggae.
                        </Text>
                    </View>
                    <BaseButton style={styles.button} onPress={() => this.props.navigation.navigate('SelecionarProduto')}>
                        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#6202F5', '#8D42FF']} style={styles.gradient}>
                            <Text style={styles.text}>QUERO ASSISTIR</Text>
                        </LinearGradient>
                    </BaseButton>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.footerBtn}>
                            <Icon name={'play-circle'} size={20} color={'#fff'} />
                            <Text style={styles.textFooterBtn}>ESCUTAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.footerBtn}>
                            <Icon name={'plus'} size={20} color={'#fff'} />
                            <Text style={styles.textFooterBtn}>SEGUIR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.footerBtn}>
                            <Icon name={'share'} size={20} color={'#fff'} />
                            <Text style={styles.textFooterBtn}>INDICAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={styles.footerBtn}>
                            <Icon name={'heart'} size={20} color={'#fff'} />
                            <Text style={styles.textFooterBtn}>AVALIAR</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{color: '#fff', margin: 50}}>Os primeiros 30s são por nsosa conta!</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
        backgroundColor: '#2B2B2B',
    },
    container: {
        alignItems: 'center'
    },
    corte: {
        width: '150%',
        height: 100,
        backgroundColor: '#2B2B2B',
        position: 'absolute',
        top: 320,
        transform: [{ rotate: '-7deg' }]
    },
    dadosArtista: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%'
    },
    cardData: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#6202F5',
        padding: 20,
        alignItems: 'center'
    },
    labelData: {
        color: '#fff',
        fontFamily: 'Roboto-Bold',
        fontSize: 18
    },
    labelHora: {
        color: '#fff',
        fontFamily: 'Roboto-Bold',
        fontSize: 18
    },
    bandaContainer: {
        alignItems: 'center',
    },
    labelBanda: {
        color: '#fff',
        fontFamily: 'Roboto-Bold',
        fontSize: 24
    },
    labelGenero: {
        color: '#fff',
        fontFamily: 'Roboto-Regular',
    },
    rightContainer: {
        alignItems: 'center'
    },
    rateContainer: {
        flexDirection: 'row',
        backgroundColor: '#6202F5',
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    labelRate: {
        color: '#fff',
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        marginLeft: 5
    },
    valor: {
        color: '#fff',
        fontFamily: 'Roboto-Medium',
        fontSize: 20
    },
    bioContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
    },
    labelBio: {
        color: '#fff'
    },
    button: {
        padding: 20,
        width: WIDTH - 50,
        borderRadius: 6,
    },
    gradient: {
        padding: 20,
        alignItems: 'center',
        borderRadius: 6,
    },
    text: {
        color: '#fff',
        fontSize: 16
    },
    footer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    footerBtn:{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#6202F5',
        width: 80,
        padding: 5,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    textFooterBtn:{
        color: '#fff',
        fontSize: 11,
        marginTop: 10
    }
});

export default DetalhesLiveScreen
