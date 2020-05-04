import axios from "axios";
import { BASE_URL, MNS_URL, MINUTE } from "../utils/constants";
import { dispatch, getState } from '../index'
import DropDownHolder from "../utils/DropDownHolder";


export const instance = API => {
    const instance = axios.create({
        baseURL: API,
        timeout: MINUTE
    });
    instance.interceptors.response.use(
        response => response,
        error => {
            if (error && error.response && error.response.data.message) {
                DropDownHolder.alert("error", "Ops :(", error.response.data.message);
            }
            return Promise.reject(error);
        });
    return instance;
}

export const addAuthToken = token =>
    instance().defaults.headers.common["Authorization"] = `Jwt ${token}`;

export const login = (username, token) =>
    instance(BASE_URL).post("/user/authenticate", null, { params: { username, token } })
        .then(response => {
            addAuthToken(response.data.token);
            return response;
        })
        .catch(e => {
            throw e;
        });


export const cadastroUsuario = (username, mobile) =>
    instance(BASE_URL).post("/user", null, { params: { username, mobile } })
        .then(response => {
            return response;
        })
        .catch(e => {
            throw e;
        });

export const cadastroArtista = (params) =>
    instance(BASE_URL).put("/user/artist", params)
        .then(response => {
            return response;
        })
        .catch(e => {
            throw e;
        });

export const buscaUsuario = (payload) =>
    instance(BASE_URL).get("/user")
        .then(response => {
            return response;
        })
        .catch(e => {
            throw e;
        });

export const buscaToken = username => instance(BASE_URL).get(`/user/token/${username}`)
    .then(response => {
        return response;
    })
    .catch(e => {
        throw e;
    });

export const cadastrarLive = (params) =>
    instance(BASE_URL).post("/live", params)
        .then(response => {
            return response;
        })
        .catch(e => {
            throw e;
        });

export const getLivesArtist = (id) =>
    instance(BASE_URL).get(`/lives?artist=${id}`)
        .then(response => {
            return response;
        })
        .catch(e => {
            throw e;
        });

export const getDetailLive = (id) =>
    instance(BASE_URL).get(`/live/${id}`)
        .then(response => {
            return response;
        })
        .catch(e => {
            throw e;
        });


export const getLives = (id) =>
    instance(BASE_URL).get(`/lives`)
        .then(response => {
            return response;
        })
        .catch(e => {
            throw e;
        });

