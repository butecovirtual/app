import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { BaseButton } from 'react-native-gesture-handler'

export class CardLiveItem extends PureComponent {
    render() {
        const { id, status, artist, cover, navigation: { navigate }, callback } = this.props
        return (
            <BaseButton style={{ marginTop: 10, marginRight: 10 }} onPress={() => callback(id)}>
                <ImageBackground source={cover ? cover : require('../img/artists/icon-default.jpg')} imageStyle={{ borderRadius: 10 }} style={styles.cover}>
                    { status == 'Ao vivo' &&
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="play-circle" color={'#fff'} size={60} style={styles.iconPlay} />
                        </View>
                    }

                </ImageBackground>
                <View style={{ marginTop: 10, width: 170 }}>
                    <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#6202F5', '#A13DA0', '#A35757']} style={styles.aovivo}>
                        <Text style={styles.textAovivo}>{status}</Text>
                    </LinearGradient>
                    <Text style={styles.title}>{artist.artist.name}</Text>
                    <Text style={styles.subtitle}>{artist.artist.genre}</Text>
                </View>
            </BaseButton>
        )
    }
}


const styles = StyleSheet.create({
    cover: {
        width: 170,
        height: 170,
        borderRadius: 10,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Roboto-Bold'
    },
    subtitle: {
        color: '#C4C4C4',
    },
    aovivo: {
        padding: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 5,
        width: 80,
        marginBottom: 5,
        alignItems: 'center'
    },
    textAovivo: {
        color: '#fff',
        textTransform: 'uppercase',
        fontFamily: 'Roboto-Bold',
        fontSize: 12
    }
})


export default CardLiveItem
