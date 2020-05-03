import {
    cadastroArtista
} from "../repositories";
import DropDownHolder from "../utils/DropDownHolder";

export const artist = {
    state: {},
    reducers: {
        clearStore() {
            return {};
        }
    },
    effects: dispatch => ({
        async createArtistAsync(payload, rootState) {
            try {
                const response = await cadastroArtista(payload);
                if (response.status === 200) {
                    DropDownHolder.alert("success", "Sucesso!", "Artista cadastrado com sucesso!");
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
                dispatch.artist.clearStore();
                resolve();
            })
        }
    })
}