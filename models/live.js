import {
    cadastrarLive,
    getLivesArtist
} from "../repositories";
import DropDownHolder from "../utils/DropDownHolder";

export const live = {
    state: {
        list: []
    },
    reducers: {
        getLivesArtist(state, payload) {
            return {
              ...state,
              list: [ ...payload ]
            };
          },
        clearStore() {
            return [];
        }
    },
    effects: dispatch => ({
        async getLivesArtistAsync(id){
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