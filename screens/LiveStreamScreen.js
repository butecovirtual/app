import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Keyboard, LayoutAnimation, SafeAreaView, Platform, TextInput, PermissionsAndroid } from 'react-native'
import { NodeCameraView, NodePlayerView } from 'react-native-nodemediaclient';
import { BaseButton, ScrollView } from 'react-native-gesture-handler';
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory';
import SocketUtils from '../utils/SocketUtils';
import FloatingHearts from '../components/FloatingHearts';
import Utils from '../utils/Utils';
import { StackActions, NavigationActions } from 'react-navigation';

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
            idStream: null,
            countViewer: 0,
            message: null,
            keyboardHeight: 0,
            visibleListMessages: true,
            listMessages: [],
            countHeart: 0
        };
    }

    componentDidMount() {
        this.requestCameraPermission()
        const { navigation: { state }, user: { id } } = this.props;
        SocketUtils.connect()
        SocketUtils.handleOnConnect()
        SocketUtils.handleOnMessage()
        SocketUtils.emitQtdViewers()
        SocketUtils.handleJoinLive()
        SocketUtils.handleOnLeaveLive()
        SocketUtils.handleOnSendReact()
        Utils.setContainer(this)
        if (state.params != undefined)
            if (state.params.user) {
                this.setState({ user: state.params.user })
            }

        if (state.params.idStream) {
            this.setState({ idStream: state.params.idStream })
            if (state.params.user === 'viewer') {
                SocketUtils.emitJoinLiveStream(state.params.idStream, id)
            }

        }
    }

     requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA,PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
            {
              title: "Permissão de câmera e microfone para LIVE",
              message:
                "O Buteco Virtual precisa de acesso à sua câmera " +
                "para você poder fazer LIVE!",
              buttonNegative: "Cancel",
              buttonPositive: "PERMITIR"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //console.log("You can use the camera");
          } else {
            //console.log("Camera permission denied");
          }
        } catch (err) {
          //console.warn(err);
        }
      };

    startLive = () => {
        const { idStream } = this.state
        const { user: { id } } = this.props
        this.setState({ isPublish: true });
        this.vbCamera.start();
        SocketUtils.emitJoinLiveStream(idStream, id)
        SocketUtils.emitStartLiveStream(idStream)
    }

    stopLive = () => {
        const { isPublish, idStream } = this.state
        const { user: { id }, navigation: { navigate } } = this.props

        if (isPublish) {
            this.setState({ publishBtnTitle: 'Start LIVE', isPublish: false, listMessages: [] });
            SocketUtils.emitLeaveLive(idStream, id)
            SocketUtils.emitLiveEnd(idStream)
            this.vbCamera.stop();
        } else {
            navigate('Perfil');
        }
    }

    closeViewer = () => {
        const { idStream } = this.state
        const { user: { id }, navigation: { navigate } } = this.props
        SocketUtils.emitLeaveLive(idStream, id)
        if (this.vbViewer !== null && this.vbViewer !== undefined) {
            this.vbViewer.stop();
            navigate('Home')
        }
    }

    setDropZoneValues = ({ nativeEvent }) => {
        const layout = {
            y: nativeEvent.layout.y,
            width: nativeEvent.layout.width,
            x: nativeEvent.layout.x,
            height: nativeEvent.layout.height,
            keyboardHeight: this.state.keyboardHeight,
        };
        this.setState({
            dropZoneCoordinates: layout,
        });
    };

    handleMessage = message => {
        this.setState({ message })
    }

    sendMessage = () => {
        const { message, idStream, listMessages } = this.state
        const { user: { id, username }, navigation: { navigate } } = this.props
        if (message != null && message.length > 1) {
            SocketUtils.emitSendMessage(idStream, id, message)
            this.setState({ message: null })
            Keyboard.dismiss()
            const newListMessages = listMessages.slice();
            newListMessages.push({ username: username, message });
            this.setState({
                listMessages: newListMessages,
                visibleListMessages: true,
            });
        }
    }

    onPressHeart = () => {
        const { message, idStream, listMessages } = this.state
        const { user: { id, username }, navigation: { navigate } } = this.props
        this.setState({ countHeart: this.state.countHeart + 1 });
        SocketUtils.emitReactLive(idStream, id, 'like');
    };

    renderListMessages = () => {
        const { listMessages, visibleListMessages } = this.state;
        if (!visibleListMessages) {
            return null;
        }
        return (
            <View style={styles.wrapListMessages}>
                <ScrollView
                    ref={ref => (this.scrollView = ref)}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.scrollView.scrollToEnd({ animated: true });
                    }}>
                    {listMessages.length > 0 &&
                        listMessages.map((item, index) => {
                            const {
                                username,
                                message,
                            } = item;
                            return (
                                <View style={styles.chatItem} key={index}>
                                    <View style={styles.wrapAvatar}>
                                        {item.avatar ? (
                                            <Icon name="heart" size={30} color={'#6202F5'} />
                                        ) : (
                                                <Icon name="heart" size={30} color={'#6202F5'} />
                                            )}
                                    </View>
                                    <View style={styles.messageItem}>
                                        <Text style={styles.name}>{username}</Text>
                                        <Text style={styles.content}>{message}</Text>
                                    </View>
                                </View>
                            );
                        })}
                </ScrollView>
            </View>
        );
    };

    renderGroupInput = () => {
        const { message, keyboardHeight } = this.state;
        if (Platform.OS === 'android') {
            return (
                <View
                    onLayout={this.setDropZoneValues}
                    style={{
                        flex: 1,
                        height: 45,
                        zIndex: 2,
                    }}>
                    <View style={styles.wrapBottom}>
                        <View style={styles.wrapInputAndActionButton}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Comentar"
                                underlineColorAndroid="transparent"
                                value={message}
                                autoCapitalize={'none'}
                                onChangeText={this.handleMessage}
                                onFocus={() => {
                                    this.setState({ visibleListMessages: false });
                                }}
                                onEndEditing={() => {
                                    Keyboard.dismiss();
                                    this.setState({ visibleListMessages: true });
                                }}
                            />
                            <TouchableOpacity
                                style={styles.wrapIconSend}
                                activeOpacity={0.6}
                                onPress={this.sendMessage}>
                                <Icon name="paper-plane" size={22} color={'#fff'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.wrapIconHeart}
                                onPress={this.onPressHeart}
                                activeOpacity={0.6}>
                                <Icon name="heart" size={22} color={'#6202F5'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <KeyboardAccessory backgroundColor="transparent">
                    <View style={styles.wrapBottomIOS}>
                        <View style={styles.col}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    height: 45,
                                    marginHorizontal: 10,
                                    marginBottom: 40,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                }}
                                onLayout={this.setDropZoneValues}
                            >
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Comentar"
                                    placeholderTextColor="#fff"
                                    underlineColorAndroid="transparent"
                                    value={message}
                                    autoCapitalize={'none'}
                                    onChangeText={this.handleMessage}
                                    autoCorrect={false}
                                    onFocus={() => {
                                        this.setState({ visibleListMessages: false });
                                    }}
                                    onEndEditing={() => {
                                        Keyboard.dismiss();
                                        this.setState({ visibleListMessages: true });
                                    }}
                                />
                                <TouchableOpacity
                                    style={styles.wrapIconSend}
                                    activeOpacity={0.6}
                                    onPress={this.sendMessage}>
                                    <Icon name="paper-plane" size={22} color={'#fff'} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.wrapIconHeart}
                                    onPress={this.onPressHeart}
                                    activeOpacity={0.6}>
                                    <Icon name="heart" size={22} color={'#6202F5'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAccessory>
            );
        }
    };




    render() {
        const { user, publishBtnTitle, idStream, isPublish, cameraId, countViewer, countHeart } = this.state
        return (
            <View style={styles.container}>

                {user === 'streamer' ?
                    <View style={{ flex: 1 }}>
                        <NodeCameraView
                            style={styles.streamerCameraView}
                            ref={vb => { this.vbCamera = vb; }}
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

                        <BaseButton onPress={() => this.vbCamera.switchCamera()} style={{ padding: 30, alignItems: 'center', position: 'absolute', top: 10, left: 0, zIndex: 2 }}>
                            <Icon name="sync-alt" color={'#fff'} size={28} />
                        </BaseButton>

                        {
                            this.state.isPublish &&
                            <>
                                <View style={{ alignItems: 'center', position: 'absolute', top: 40, left: 180, zIndex: 2 }}>
                                    <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#6202F5', '#A13DA0', '#A35757']} style={styles.aovivo}>
                                        <Text style={styles.textAovivo}>AO VIVO</Text>
                                    </LinearGradient>
                                    <Text style={styles.textOnline}>{countViewer} Online</Text>
                                </View>
                                {this.renderGroupInput()}
                                {this.renderListMessages()}
                                <FloatingHearts count={countHeart} style={styles.wrapGroupHeart} />
                            </>
                        }
                        <BaseButton onPress={this.stopLive} style={styles.btnClose}>
                            <Icon name="times" color={'#fff'} size={28} />
                        </BaseButton>
                        {
                            !this.state.isPublish &&
                            <TouchableOpacity
                                style={{ padding: 20, alignItems: 'center', borderRadius: 10, backgroundColor: '#6202F5', position: 'absolute', bottom: 20, left: 160, zIndex: 2 }}
                                onPress={this.startLive}>
                                <Text style={{ color: '#fff' }}>{this.state.publishBtnTitle}</Text>
                            </TouchableOpacity>
                        }



                    </View>
                    :
                    user === 'viewer' ?
                        <View style={{ flex: 1 }}>
                            <NodePlayerView
                                style={styles.streamerCameraView}
                                ref={vb => { this.vbViewer = vb; }}
                                inputUrl={`${urlStream}${idStream}`}
                                scaleMode="ScaleAspectFit"
                                bufferTime={300}
                                maxBufferTime={1000}
                                autoplay={true}
                            />
                            {
                                <>
                                    <BaseButton onPress={this.closeViewer} style={styles.btnClose}>
                                        <Icon name="times" color={'#fff'} size={28} />
                                    </BaseButton>
                                    <View style={{ alignItems: 'center', position: 'absolute', top: 40, left: 150, zIndex: 2 }}>
                                        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#6202F5', '#A13DA0', '#A35757']} style={styles.aovivo}>
                                            <Text style={styles.textAovivo}>AO VIVO</Text>
                                        </LinearGradient>
                                        <Text style={styles.textOnline}>{countViewer} Online</Text>
                                    </View>
                                    {this.renderGroupInput()}
                                    {this.renderListMessages()}
                                    <FloatingHearts count={countHeart} style={styles.wrapGroupHeart} />
                                </>
                            }
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
        zIndex: 3,
        backgroundColor: '#282828',
    },
    streamerCameraView: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: HEIGHT,
        width: WIDTH,
        zIndex: 0
    },
    aovivo: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
    },
    textAovivo: {
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
        zIndex: 2
    },
    countViewerContainer: {
        padding: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textOnline: {
        color: '#fff',
        fontFamily: 'Roboto-Bold',
        marginTop: 5
    },
    wrapBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 180,
        zIndex: 2
    },
    wrapBottomIOS: {
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2
    },
    col: {
        flex: 1,
        flexDirection: 'column'
    },
    textInput: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 45,
        paddingTop: Platform.OS === 'android' ? 10 : 0,
    },
    wrapIconSend: {
        marginLeft: 10
    },
    wrapIconHeart: {
        marginLeft: 10
    },
    wrapIconHeart: {
        width: 45,
        height: 45,
        borderRadius: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        zIndex: 2
    },
    iconHeart: {
        width: 45,
        height: 45,
        zIndex: 2
    },
    wrapIconSend: {
        width: 45,
        height: 45,
        borderRadius: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6202F5',
        alignItems: 'center',
        marginLeft: 8
    },
    iconSend: {
        width: 33,
        height: 33
    },
    wrapListMessages: {
        position: 'absolute',
        bottom: 70,
        left: 0,
        right: 0,
        height: WIDTH / 1.5,
        width: WIDTH,
        zIndex: 2
    },
    chatItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginVertical: 5
    },
    messageItem: {
        flexDirection: 'column',
        marginHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 15
    },
    iconAvatar: {
        width: 44,
        height: 44
    },
    name: {
        fontSize: 15,
        fontWeight: '700'
    },
    content: {
        fontSize: 13
    },
    wrapInputAndActionButton: {
        position: 'absolute',
        bottom: 10,
        width: WIDTH - 20,
        flex: 1,
        flexDirection: 'row',
        height: 50,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    wrapGroupHeart: {
        marginBottom: 70
    },
});


const mapState = state => ({
    user: state.user,
})

const mapDispatch = dispatch => ({
})

export default connect(mapState, mapDispatch)(LiveStreamScreen);
