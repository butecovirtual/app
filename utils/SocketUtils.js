import { Alert } from 'react-native';
import io from 'socket.io-client';
import moment from 'moment';
import { SOCKERT_IP, LIVESTATUS } from '../utils/constants'
import Utils from '../utils/Utils';


let socket = null;

const getSocket = () => {
    return socket;
};

const connect = () => {
    socket = io.connect(SOCKERT_IP, { transports: ['websocket'] });
};

const handleOnConnect = () => {
    socket.on('connect', data => {
        console.tron.log('connect socket');
    });
};

const emitJoinLiveStream = (liveId, userId) => {
    console.tron.log(`JOIN Live ${liveId} - ${userId}`)
    socket.emit('live-join', {
        liveId,
        userId,
    });
};

const handleJoinLive = () => {
    socket.on('live-join', data => {
        //const countViewer = Utils.getContainer().state.countViewer;
         //Utils.getContainer().setState({countViewer: countViewer + 1});
    });
};

const emitStartLiveStream = (liveId) => {
    socket.emit('live-start', {
        liveId
    });
};

const emitQtdViewers = () => {
    socket.on('live-viewers', (qtdy) => {
        console.tron.log(`live-viewers ${qtdy}`);
        Utils.getContainer().setState({countViewer: qtdy});
    });
};

const handleOnMessage = () => {
    socket.on('message', data => {
        console.tron.log(`message recived ${JSON.stringify(data)}`);
        const { user: { username }, message} = data
        const listMessages = Utils.getContainer().state.listMessages;
        const newListMessages = listMessages.slice();
        newListMessages.push({
            username,
            message,
          });
          Utils.getContainer().setState({listMessages: newListMessages});
    });
};


const emitSendMessage = (liveId, userId, message) => {
    console.tron.log(`Sending message ${message}`);
    socket.emit('message', {
        liveId,
        userId,
        message
    });
};

const handleOnSendReact = () => {
    socket.on('react', (data) => {
        console.tron.log(`react recived ${data}`);
    });
};

const emitReactLive = (liveId, userId, reaction) => {
    socket.emit('react', {
        liveId,
        userId,
        reaction
    });
};

const emitLiveEnd = (liveId) => {
    console.tron.log(`End Live ${liveId}`);
    socket.emit('live-end', {
        liveId
    });
};

const emitLeaveLive = (liveId, userId) => {
    console.tron.log(`Leave Live ${liveId} - ${userId}`);
    socket.emit('live-leave', {
        liveId,
        userId
    });
    socket.close()
};

const handleOnLeaveLive = () => {
    socket.on('live-leave', (data) => {
      //const countViewer = Utils.getContainer().state.countViewer;
      //Utils.getContainer().setState({countViewer: countViewer - 1});
    });
  };
  


const SocketUtils = {
    getSocket,
    connect,
    handleOnConnect,
    handleJoinLive,
    emitJoinLiveStream,
    emitStartLiveStream,
    emitQtdViewers,
    handleOnMessage,
    emitSendMessage,
    handleOnSendReact,
    emitReactLive,
    emitLiveEnd,
    emitLeaveLive,
    handleOnLeaveLive
};

export default SocketUtils;