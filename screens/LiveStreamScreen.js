import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native'
import { NodeCameraView, NodePlayerView } from 'react-native-nodemediaclient';
import { BaseButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

const urlStream = "rtmp://ec2-54-233-142-88.sa-east-1.compute.amazonaws.com:1935/live/"

export class LiveStreamScreen extends Component {


    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            publishBtnTitle: 'Iniciar LIVE',
            isPublish: false,
            idStream: null
        };
    }

    componentDidMount() {
        const { navigation: { state } } = this.props;
        if (state.params != undefined)
            if (state.params.user)
                this.setState({ user: state.params.user })
            if (state.params.idStream)
                this.setState({ idStream: state.params.idStream })
    }

    stopLive = () => {
        const { isPublish } = this.state
        const { navigation: { navigate }} = this.props
        if(isPublish){ 
            this.setState({ publishBtnTitle: 'Start LIVE', isPublish: false });
            this.vbCamera.stop();
        }else{
            navigate('Perfil');
        }
            
    }


    render() {
        const { user, publishBtnTitle, idStream, isPublish, cameraId } = this.state
        return (
            <SafeAreaView style={styles.container}>
                {user === 'streamer' ?
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <BaseButton onPress={() => this.vbCamera.switchCamera()} style={{ padding: 30, alignItems: 'center', position: 'absolute', top: 10, left: 0, zIndex: 9 }}>
                            <Icon name="sync-alt" color={'#fff'} size={28} />
                        </BaseButton>
                        {
                            this.state.isPublish &&
                            <View style={{ alignItems: 'center', position: 'absolute', top: 40, left: 160, zIndex: 9}}>
                                <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#6202F5', '#A13DA0', '#A35757']} style={styles.aovivo}>
                                    <Text style={styles.textAovivo}>AO VIVO</Text>
                                </LinearGradient>
                            </View>
                        }
                        <BaseButton onPress={this.stopLive} style={styles.btnClose}>
                            <Icon name="times" color={'#fff'} size={28} />
                        </BaseButton>
                        {
                            !this.state.isPublish &&
                            <TouchableOpacity
                            style={{ padding: 20, alignItems: 'center', borderRadius: 10, backgroundColor: '#6202F5', position: 'absolute', bottom: 50, zIndex: 9 }}
                            onPress={() => {
                                    this.setState({ isPublish: true });
                                    this.vbCamera.start();
                            }}
                        >
                            <Text style={{ color: '#fff' }}>{this.state.publishBtnTitle}</Text>
                        </TouchableOpacity>
                        }
                        
                        <NodeCameraView
                            style={styles.streamerCameraView}
                            ref={vb => {
                                this.vbCamera = vb;
                            }}
                            outputUrl={`${urlStream}${idStream}`}
                            camera={{ cameraId: 1, cameraFrontMirror: true }}
                            audio={{ bitrate: 128000, profile: 1, samplerate: 44100 }}
                            video={{
                                preset: 1,
                                bitrate: 400000,
                                profile: 1,
                                fps: 30,
                                videoFrontMirror: false,
                            }}
                            smoothSkinLevel={3}
                            autopreview={true}
                        />

                    </View>
                    :
                    user === 'viewer' ?
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#fff' }}>VIEWER ON LIVE!</Text>
                            <NodePlayerView
                                style={styles.streamerCameraView}
                                ref={vb => { this.vbViewer = vb; }}
                                inputUrl={`${urlStream}${idStream}`}
                                scaleMode="ScaleAspectFit"
                                bufferTime={300}
                                maxBufferTime={1000}
                                autoplay={true}
                            />
                        </View>
                        :
                        <Text style={{ alignItems: 'center', color: '#fff' }}>Nenhuma Live no momento</Text>
                }


            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282828',
        justifyContent: 'center',
        alignItems: 'center',
    },
    streamerCameraView: {
        width: WIDTH,
        height: HEIGHT
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
    },
    btnClose: { 
        padding: 30,
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        right: 0,
        zIndex: 9 }
});

export default LiveStreamScreen
