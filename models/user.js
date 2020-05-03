import {
    login,
    cadastro,
    cadastroUsuario,
    buscaUsuario,
    buscaToken
  } from "../repositories";
  import DropDownHolder from "../utils/DropDownHolder";

  export const user = {
    state: {},
    reducers: {
      signIn(state, payload) {
        return {
          ...state,
          ...payload
        }
      },
      clearStore() {
        return {};
      }
    },
    effects: dispatch => ({
      async checkLoginAsync(payload, rootState) {
        const { username } = payload;
        try {
          const response = await buscaToken(username);
          if(response.status === 200){
            dispatch.user.signIn(payload);
            return Promise.resolve(response);
          }else{
            DropDownHolder.alert("error", "Ops :(", e.response.data.message);
          }
          
        } catch (e) {
          if (e.response != undefined) {
            DropDownHolder.alert("error", "Ops :(", e.response.data.message);
          } else {
            DropDownHolder.alert(
              "error",
              "Ops :(",
              "Usuário inválido."
            );
          }
          throw e;
        }
      },
      async signInAsync(payload, rootState) {
        const { username, token } = payload;
        try {
          const response = await login(username, token);
          if(response.status === 200){
            const user = await buscaUsuario();
            dispatch.user.signIn(user.data);
            dispatch.user.signIn(response.data);
          }
          return Promise.resolve(response)
        } catch (e) {
          dispatch.user.clearStore();
          if (e.response != undefined) {
            DropDownHolder.alert("error", "Ops :(", e.response.data.message);
          } else {
            DropDownHolder.alert(
              "error",
              "Ops :(",
              "Usuário ou token incorretos."
            );
          }
          throw e;
        }
      },
      async createUserAsync(payload, rootState) {
        try {
          const { username, mobile } = payload;
            const response = await cadastroUsuario(username, mobile);
            dispatch.user.signIn(payload);
            return Promise.resolve(response);
        } catch (e) {
          if (e.response != undefined) {
            DropDownHolder.alert("error", "Ops :(", e.response.data.message);
          } else {
            DropDownHolder.alert("error", "Ops :(", "Erro ao cadastrar usuário.");
          }
          throw e;
        }
      },
      async getUserAsync(){
        try {
          const response = await buscaUsuario();
          dispatch.user.signIn(response.data)
        } catch (e) {
          throw e
        }
      },
      async refreshAll () {
      },
      async clearStores() {
        return new Promise(resolve => {
          dispatch.user.clearStore();
          resolve();
        })
      }
    })
  };
  