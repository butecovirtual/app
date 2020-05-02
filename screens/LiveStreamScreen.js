import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { NodeCameraView, NodePlayerView } from 'react-native-nodemediaclient';

const urlStream = "rtmp://ec2-54-233-142-88.sa-east-1.compute.amazonaws.com:1935/live/5eac610ec33ae405ec0154ff"

export class LiveStreamScreen extends Component {


    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            publishBtnTitle: 'Iniciar',
            isPublish: false
        };
    }

    componentDidMount() {
        const { navigation: { state } } = this.props;
        if (state.params != undefined)
            if (state.params.user)
                this.setState({ user: state.params.user })

    }

    render() {
        const { user, publishBtnTitle} = this.state
        return (
            <View style={styles.container}>
                {user === 'streamer' ?
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#fff' }}>LIVE STREAM !</Text>
                        <TouchableOpacity
                        style={{padding: 30, alignItems: 'center', backgroundColor: '#cecece'}}
                            onPress={() => {
                                if (this.state.isPublish) {
                                    this.setState({ publishBtnTitle: 'Start Publish', isPublish: false });
                                    this.vbCamera.stop();
                                } else {
                                    this.setState({ publishBtnTitle: 'Stop Publish', isPublish: true });
                                    this.vbCamera.start();
                                }
                            }}
                        >
                            <Text style={{color: '#841584'}}>{this.state.publishBtnTitle}</Text>
                        </TouchableOpacity>
                        <NodeCameraView
                            style={styles.streamerCameraView}
                            ref={vb => {
                                this.vbCamera = vb;
                            }}
                            outputUrl={urlStream}
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
                                inputUrl={urlStream}
                                scaleMode="ScaleAspectFit"
                                bufferTime={300}
                                maxBufferTime={1000}
                                autoplay={true}
                            />
                        </View>
                        :
                        <Text style={{ alignItems: 'center', color: '#fff' }}>Nenhuma Live no momento</Text>
                }


            </View>
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
        width: 500,
        height: 500
    }
});

export default LiveStreamScreen
