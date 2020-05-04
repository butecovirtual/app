import {
    cadastrarLive,
    getLivesArtist,
    getLives,
    getDetailLive
} from "../repositories";
import DropDownHolder from "../utils/DropDownHolder";

export const live = {
    state: {
        list: [],
        liveSelected: {}
    },
    reducers: {
        selectLive(state, payload) {
            return {
                ...state,
                liveSelected: { ...payload }
            };
        },
        getLivesArtist(state, payload) {
            return {
                ...state,
                list: [...payload]
            };
        },
        getLives(state, payload) {
            return {
                ...state,
                list: [...payload]
            };
        },
        clearStore() {
            return [];
        }
    },
    effects: dispatch => ({
        async getDetailLiveAsync(id) {
            try {
                const response = await getDetailLive(id);
                const data = response.data ? response.data : []
                return dispatch.live.selectLive(data);
            } catch (e) {
                throw e
            }
        },
        async getLivesAsync(id) {
            try {
                const response = await getLives(id);
                const data = response.data ? response.data : []
                const newListLives = data.slice()
                newListLives.unshift({
                    status: 'Ao Vivo',
                    cover: require('../img/artists/well.jpg'),
                    artist: {
                        artist: {
                            name: "Well Figuerê",
                            genre: "MPB"
                        }
                    }
                })
                return dispatch.live.getLives(newListLives);
            } catch (e) {
                throw e
            }
        },
        async getLivesArtistAsync(id) {
            try {
                const response = await getLivesArtist(id);
                const data = response.data ? response.data : []
                return dispatch.live.getLivesArtist(data);
            } catch (e) {
                throw e
            }
        },
        async createLiveAsync(payload) {
            try {
                const response = await cadastrarLive(payload);
                if (response.status === 200) {
                    DropDownHolder.alert("success", "Sucesso!", "Live cadastrada com sucesso!");
                    return Promise.resolve(response);
                } else {
                    DropDownHolder.alert("error", "Ops :(", e.response.data.message);
                }

            } catch (e) {
                if (e.response != undefined) {
                    DropDownHolder.alert("error", "Ops :(", e.response.data.message);
                } else {
                    DropDownHolder.alert(
                        "error",
                        "Ops :(",
                        "Erro ao cadastrar a live."
                    );
                }
                throw e;
            }
        },
        async clearStores() {
            return new Promise(resolve => {
                dispatch.live.clearStore();
                resolve();
            })
        }
    })
}