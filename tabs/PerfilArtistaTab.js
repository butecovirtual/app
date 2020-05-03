import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { BaseButton } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'


const { width: WIDTH } = Dimensions.get('window')

export class PerfilArtistaTab extends PureComponent {

    sair = () => {
        const {
            navigation: { navigate },
            logout
        } = this.props;

        logout()
            .then(() => navigate("Login"))
            .catch(err => err)

    };

    render() {
        const { user: { artist }, logout } = this.props
        return (
            <View style={styles.tab}>
                {
                    artist ?
                        <>
                            <View >
                                <Text style={{ color: '#B6B6B6' }}>Nome do artista/banda</Text>
                                <Text style={{ color: '#fff' }}>{artist && artist.name}</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ color: '#B6B6B6' }}>Gênero musical</Text>
                                <Text style={{ color: '#fff' }}>{artist && artist.genre}</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ color: '#B6B6B6' }}>Bio</Text>
                                <Text style={{ color: '#fff' }}>{artist && artist.bio}</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ color: '#B6B6B6' }}>Instagram</Text>
                                <Text style={{ color: '#fff' }}>{artist.instagram ? artist.instagram : 'Não cadastrado.'}</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ color: '#B6B6B6' }}>Facebook</Text>
                                <Text style={{ color: '#fff' }}>{artist.facebook ? artist.facebook : 'Não cadastrado.'}</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ color: '#B6B6B6' }}>Youtube</Text>
                                <Text style={{ color: '#fff' }}>{artist.youtube ? artist.youtube : 'Não cadastrado.'}</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ color: '#B6B6B6' }}>Spotify</Text>
                                <Text style={{ color: '#fff' }}>{artist.spotify ? artist.spotify : 'Não cadastrado.'}</Text>
                            </View>
                            <BaseButton style={styles.button}>
                                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#6202F5', '#8D42FF']} style={styles.gradient}>
                                    <Text style={styles.text}>Editar Perfil</Text>
                                </LinearGradient>
                            </BaseButton>
                        </>
                        :
                        <>
                            <Text style={{ color: '#fff', textAlign: 'center' }}>Você ainda não possui um cadastro de artista. Para que você possa fazer Lives, faça seu cadastro</Text>
                            <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('CriarPerfil')}>
                                <Text style={styles.labelText}>CRIAR PERFIL DE ARTISTA</Text>
                            </TouchableOpacity>
                        </>
                }
                <BaseButton style={styles.button} onPress={this.sair}>
                    <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#000', '#000']} style={styles.gradient}>
                        <Text style={styles.text}>Sair</Text>
                    </LinearGradient>
                </BaseButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        padding: 30,
        backgroundColor: '#2B2B2B',
    },
    btn: {
        marginTop: 20,
        marginBottom: 50,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#6202F5',
        alignItems: 'center',
    },
    btnSair: {
        width: 200,
        marginBottom: 50,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#6202F5',
        alignItems: 'center',
    },
    labelText: {
        color: '#fff',
        textTransform: 'uppercase'
    },
    button: {
        padding: 15,
        width: WIDTH - 70,
        borderRadius: 6,
        fontSize: 16,
        marginTop: 20,
    },
    gradient: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 6,
    },
    text: {
        color: '#fff',
        fontSize: 14
    },
})


export default PerfilArtistaTab
