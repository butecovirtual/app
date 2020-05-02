import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export class PerfilArtistaTab extends PureComponent {
    render() {
        return (
            <View style={styles.tab}>
                <Text style={{color: '#fff', textAlign: 'center'}}>Você ainda não possui um cadastro de artista. Para que você possa fazer Lives, faça seu cadastro</Text>
                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('CriarPerfil')}>
                    <Text style={styles.text}>CRIAR PERFIL DE ARTISTA</Text>
                </TouchableOpacity>
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
    btn:{
        marginTop: 20,
        marginBottom: 50,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#6202F5',
        alignItems: 'center',
    },
    text:{
        color: '#fff',
        textTransform: 'uppercase'
    }
})


export default PerfilArtistaTab
