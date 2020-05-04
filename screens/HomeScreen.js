import React, { PureComponent } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { connect } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5'
import BannerHome from '../components/BannerHome';
import CardLiveItem from '../components/CardLiveItem';
import CardLiveFakeItem from '../components/CardLiveFakeItem';

const livesNow = [
  {
    cover: require('../img/artists/well.jpg'),
    name: 'Well Figuerê',
    genre: 'MPB'
  },
  {
    cover: require('../img/artists/faca-amolada.jpg'),
    name: 'Duetê',
    genre: 'MPB'
  },
  {
    cover: require('../img/artists/lilian.jpg'),
    name: 'Lilian Lorão',
    genre: 'Pop/Rock'
  },
  {
    cover: require('../img/artists/foo-fighters.jpg'),
    name: 'Foo Figters Cover',
    genre: 'Rock'
  }
]

const livesTomorrow = [
  {
    cover: require('../img/artists/oi-de-gato.jpg'),
    artist: 'Oi de Gato',
    genre: 'Samba'
  }
]

const livesFriday = [
  {
    cover: require('../img/artists/papa-black.jpg'),
    artist: 'Papa Black',
    genre: 'Good Vibes'
  },
  {
    cover: require('../img/artists/djonga.jpg'),
    artist: 'Djonga',
    genre: 'Rap'
  }
]

const livesWednesday = [
  {
    cover: require('../img/artists/rojan.jpg'),
    artist: 'Rojan Gabgiel',
    genre: 'MPB'
  },
]

const livesSaturday = [
  {
    cover: require('../img/artists/abbakana.jpg'),
    artist: 'Abbakana',
    genre: 'Rock'
  },
  {
    cover: require('../img/artists/dois-lados.jpg'),
    artist: 'Dois Lados',
    genre: 'Duo'
  },
  {
    cover: require('../img/artists/lilian.jpg'),
    artist: 'Lilian Lorão',
    genre: 'Pop/Rock'
  },
]

class HomeScreen extends PureComponent {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.getLives()
  }

  refetchLives = () => {
    this.props.getLives()
  }

  selectLive = (id) => {
      //console.tron.log('SELECT', id) 
      this.props.selectLive({id})
      this.props.navigation.navigate('DetalhesLive')
  }

  render() {
    const { lives: { list }, loading } = this.props
    const { listLives } = this.state
    return (
      <SafeAreaView style={styles.safe} >
        <StatusBar barStyle={"light-content"} />
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <BannerHome navigation={this.props.navigation} />
          <View style={styles.barra}></View>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>LIVE AGORA</Text>
              <FlatList
                data={list}
                horizontal={true}
                onRefresh={this.refetchLives}
                refreshing={loading}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => (`livesNow-${index}`)}
                renderItem={({ item }) => <CardLiveItem callback={this.selectLive} navigation={this.props.navigation} {...item} />}
              />
            </View>

            <View style={{ marginTop: 50 }}>
              <Text style={styles.title2}>AMANHÃ 29/04</Text>
              <View style={[styles.barra, { width: 30 }]}></View>
              <FlatList
                data={livesTomorrow}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => (`li vesTomorrow-${index}`)}
                renderItem={({ item }) => <CardLiveFakeItem now={false} navigation={this.props.navigation} {...item} />}
              />
            </View>

            <View style={{ marginTop: 50 }}>
              <Text style={styles.title2}>SEXTA-FEIRA 01/05</Text>
              <View style={[styles.barra, { width: 30 }]}></View>
              <FlatList
                data={livesFriday}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => (`livesFriday-${index}`)}
                renderItem={({ item }) => <CardLiveFakeItem now={false} navigation={this.props.navigation} {...item} />}
              />
            </View>

            <View style={{ marginTop: 50 }}>
              <Text style={styles.title2}>QUARTA-FEIRA 06/05</Text>
              <View style={[styles.barra, { width: 30 }]}></View>
              <FlatList
                data={livesWednesday}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => (`livesWednesday-${index}`)}
                renderItem={({ item }) => <CardLiveFakeItem now={false} navigation={this.props.navigation} {...item} />}
              />
            </View>

            <View style={{ marginTop: 50 }}>
              <Text style={styles.title2}>SÁBADO 09/04</Text>
              <View style={[styles.barra, { width: 30 }]}></View>
              <FlatList
                data={livesSaturday}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => (`livesSaturday-${index}`)}
                renderItem={({ item }) => <CardLiveFakeItem now={false} navigation={this.props.navigation} {...item} />}
              />
            </View>

            <View style={styles.footer}>
              <TouchableOpacity style={styles.btnFooter}>
                <Text style={styles.textThin}>Compartilhar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnFooter}>
                <Text style={styles.textThin}>Ajuda</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#000'
  },
  imagem: {
    width: null,
  },
  scroll: {
    flexGrow: 1,
  },
  barra: {
    backgroundColor: '#6202F5',
    width: '100%',
    padding: 3,
    marginLeft: 0
  },
  container: {
    backgroundColor: '#282828',
    paddingLeft: 20,
    paddingTop: 30,
  },
  title: {
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontSize: 20
  },
  title2: {
    color: '#fff',
    fontFamily: 'Roboto-Bold',
    fontSize: 18
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 50,
    marginBottom: 50,
    justifyContent: 'space-around',
  },
  btnFooter: {
    padding: 10,
    width: 170,
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8D42FF',
    alignItems: 'center'
  },
  textThin: {
    color: '#fff',
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: 'Roboto-Thin'
  }
})

const mapState = state => ({
  user: state.user,
  lives: state.live,
  loading: state.loading.effects.live.getLivesAsync,
})

const mapDispatch = dispatch => ({
  getLives: () => dispatch.live.getLivesAsync(),
  selectLive: id => dispatch.live.selectLive(id),
})

export default connect(mapState, mapDispatch)(HomeScreen);
