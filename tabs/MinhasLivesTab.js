import React, { PureComponent } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export class MinhasLivesTab extends PureComponent {
    render() {
        return (
            <View style={styles.tab}>
                <Text style={{color: '#fff'}}> Você não possui nenhuma LIVE registrada. </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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

export default MinhasLivesTab
