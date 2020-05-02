import React, { PureComponent } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground } from 'react-native';
import { Image, Tab, Tabs, TabHeading  } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Tab1 from '../tabs/PerfilArtistaTab';
import Tab2 from '../tabs/MinhasLivesTab';

class PerfilScreen extends PureComponent {

  static navigationOptions = {
    headerTitle: <View style={{flexDirection: 'row', alignItems: "center", justifyContent: 'center'}}>
    <Text style={{color: '#fff', fontSize: 24, fontFamily: 'Roboto-Bold'}}>MEU</Text>
    <Text style={{color: '#6202F5', fontSize: 24, fontFamily: 'Roboto-Bold', marginLeft: 5}}>PERFIL</Text>
    </View>
  }
  

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
        <ImageBackground source={require('../img/cover-profile.jpg')} style={{ width: '100%', height: 250, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <View style={styles.btnAlterar}>
            <Text style={styles.textBtn}>Alterar</Text>
          </View>
        </ImageBackground>
        <ImageBackground source={require('../img/avatar-profile.jpg')} style={{ width: 110, height: 110, position: 'absolute', top: 180, left: 20 }} imageStyle={{ borderRadius: 100, borderWidth: 5, borderColor: '#6202F5' }}></ImageBackground>
        <View style={styles.socialData}>
          <View style={styles.cardSocial}>
            <Text style={styles.titleSocial}>345</Text>
            <Text style={styles.subTitleSocial}>Seguindo</Text>
          </View>
          <View style={styles.cardSocial}>
            <Text style={styles.titleSocial}>4</Text>
            <Text style={styles.subTitleSocial}>Seguidores</Text>
          </View>
        </View>
        <View style={styles.profileData}>
          <View style={styles.profile}>
            <Text style={styles.label}>Nome de usuário</Text>
            <Text style={styles.label}>Celular</Text>
          </View>
          <View style={styles.profile}>
            <Text style={styles.value}>@kamila</Text>
            <Text style={styles.value}>(31)9****-2376</Text>
          </View>
        </View>
        </View>
        <Tabs>
          <Tab heading={ <TabHeading style={{backgroundColor: '#6202F5'}}><Text style={{color: '#fff'}}>ARTISTA</Text></TabHeading>}>
            <Tab1 navigation={this.props.navigation} />
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: '#2B2B2B'}}><Text style={{color: '#fff'}}>MINHAS LIVES</Text></TabHeading>}>
            <Tab2 navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: '#2B2B2B',
  },
  container:{
    alignItems: 'center'
  },
  btnAlterar: {
    width: 80,
    backgroundColor: '#6202F5',
    borderRadius: 20,
    padding: 7,
    margin: 20,
    alignItems: 'center',
  },
  textBtn: {
    color: '#fff'
  },
  socialData: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 50 ,
    width: '60%',
  },
  cardSocial: {
    width: 85,
    height: 85,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#6202F5',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSocial: {
    color: '#fff',
    fontSize: 18
  },
  subTitleSocial: {
    color: '#fff',
    fontSize: 12
  },
  profileData: {
    flexDirection: 'row',
    marginBottom: 20
  },
  profile:{
    marginTop: 10
  },
  label: {
    color: '#B6B6B6',
    fontSize: 12,
    marginBottom: 10
  },
  value:{
    color: '#fff',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10
  }
})


export default PerfilScreen;
