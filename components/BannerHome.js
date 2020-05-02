import React, { PureComponent } from 'react'
import { Text, View, ImageBackground, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient';
import { BaseButton } from 'react-native-gesture-handler';

export class BannerHome extends PureComponent {
    render() {
        return (
          <BaseButton onPress={() => this.props.navigation.navigate('DetalhesLive')}>
            <ImageBackground source={require('../img/duete.jpg')} style={styles.header}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.35)', flex: 1, justifyContent: 'space-between' }}>
              <View style={styles.menuHeader}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={styles.itemMenu}>PARA VOCÊ</Text>
                    <View style={styles.barra}></View>
                  </View>
                  <Text style={styles.itemMenu}>EXPLORAR</Text>
                </View>
                <View>
                  <Icon name="search" color={'#fff'} size={18} />
                </View>
              </View>
              <View style={styles.infos}>
                <View style={styles.infoLeft}>
                  <Text style={styles.title}>DUETÊ</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.genero}>Pop/Rock</Text>
                    <Text style={styles.nota}><Icon name="star" color={'#6202F5'} size={14} /> 4.5</Text>
                  </View>
                </View>
                <View style={styles.infoRight}>
                      <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#6202F5','#A13DA0','#A35757']} style={styles.aovivo}>
                        <Text style={styles.textAovivo}>AO VIVO</Text>
                      </LinearGradient>
                      <Text style={styles.subTitle}>AGORA</Text>
                </View>
              </View>

            </View>
          </ImageBackground>
          </BaseButton>
        )
    }
}

const styles = StyleSheet.create({
    header: {
      height: 300
      },
    menuHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
      },
      itemMenu: {
        color: '#fff',
        textTransform: 'uppercase',
        fontSize: 18,
        fontFamily: 'Roboto-Light',
        marginLeft: 10
      },
      barra: {
        backgroundColor: '#6202F5',
        padding: 2,
        width: 45,
        marginLeft: 10
      },
      infos:{
        flexDirection: 'row',
        padding: 30,
        alignItems: 'center',
        alignContent: 'flex-end',
        justifyContent: 'space-between',
      },
      infoRight:{ 
        alignItems: 'center'
      },
      title:{
        color: '#fff',
        fontFamily: 'Roboto-Bold',
        fontSize: 30
      },
      subTitle:{
        color: '#fff',
        fontFamily: 'Roboto-Bold',
        fontSize: 22
      },
      genero:{
        color: '#fff'
      },
      nota:{
        color: '#fff',
        marginLeft: 10
      },
      aovivo:{
        padding: 5,
        paddingLeft: 10, 
        paddingRight: 10,
        borderRadius: 5,
      },
      textAovivo:{
        color: '#fff',
        textTransform: 'uppercase',
        fontFamily: 'Roboto-Bold'
      }
});

export default BannerHome
