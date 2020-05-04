import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { connect } from "react-redux";
import { BaseButton } from 'react-native-gesture-handler';
import { formatTimestampToDate, formatNumberToCurrency } from '../utils/formatters';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';

class CardItem extends PureComponent {

    details = () => {
        const { data: { id }, navigation: { navigate } } = this.props
        navigate('LiveStack', { user: 'streamer', idStream: id });
    }

    render() {
        const { data: { when, status, valueBase, valueTable, title } } = this.props;
        const hourLive = when && moment(when).format('HH:mm')
        const formattedValueBase = valueBase && formatNumberToCurrency(parseFloat(valueBase))
        const formattedValueTable = valueTable && formatNumberToCurrency(parseFloat(valueTable))
        const dateLive = when && moment(when).format('DD/MM');
        return (
            <BaseButton style={{ flex: 1, padding: 16, flexDirection: 'row', width: '100%' }} onPress={this.details}>
                <View style={styles.cardData}>
                    <Text style={styles.labelData}>{dateLive}</Text>
                    <Text style={styles.labelData}>{hourLive}</Text>
                </View>
                <View style={styles.containerData}>
                    <View style={styles.content}>
                        <Text style={[styles.postTitle, { marginLeft: 0 }]}>{title}</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.label}>Entrada:</Text>
                        <Text style={styles.postTitle}>{`R$ ${formattedValueBase}`}</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.label}>Mesa:</Text>
                        <Text style={styles.postTitle}>{`R$ ${formattedValueTable}`}</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.label}>Status:</Text>
                        <Text style={styles.postTitle}>{status}</Text>
                    </View>
                </View>
                {
                    status != 'Encerrada' &&
                    <View style={styles.iconContainer}>
                        <Icon name="chevron-right" size={30} color={'#fff'} />
                    </View>
                }

            </BaseButton>
        )
    }
}

export class MinhasLivesTab extends PureComponent {

    componentDidMount() {
        const { getLives, user: { id, artist } } = this.props
        this.props.getLives(id)

    }

    render() {
        const { lives, navigation, loading } = this.props;
        return (
            <View style={styles.tab}>
                {
                    lives.length == 0 &&
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: '#fff', marginTop: 30 }}> Você não possui nenhuma LIVE registrada. </Text>
                    </View>
                }
                <FlatList
                    style={styles.list}
                    onRefresh={this.refetchOrders}
                    refreshing={loading}
                    data={lives}
                    keyExtractor={(item, index) => `live-${index}`}
                    renderItem={({ item }) => <CardItem data={item} navigation={navigation} />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        width: '100%',
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
    list: {
        padding: 0
    },
    text: {
        color: '#fff',
        textTransform: 'uppercase'
    },
    cardData: {
        backgroundColor: '#6202F5',
        borderRadius: 10,
        padding: 5,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleData: {
        color: '#fff',
        fontFamily: 'Roboto-Regular'
    },
    labelData: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        fontSize: 16
    },
    containerData: {
        marginLeft: 10,
        width: 180,
    },
    content: {
        flexDirection: 'row'
    },
    label: {
        color: '#fff',
        fontFamily: 'Roboto-Regular',
    },
    postTitle: {
        color: '#fff',
        marginLeft: 5,
        fontFamily: 'Roboto-Medium'
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    }
})

const mapState = state => ({
    lives: state.live.list,
    user: state.user,
    loading: state.loading.models.live
})

const mapDispatch = dispatch => ({
    getLives: (id) => dispatch.live.getLivesArtistAsync(id),
})

export default connect(mapState, mapDispatch)(MinhasLivesTab);
