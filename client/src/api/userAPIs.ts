import axios from "axios";
import type { AppDispatch } from "../store";
import { success, warn } from "../redux/modalSlice";
import type { Response as ApiResponse } from "../types/APIData";
import { setBudget, setDates, setGraphs } from "../redux/settingsSlice";
import type { SettingsForm, AwardForm } from "../types/FormsData";
import { setUser, setAward, setAwards } from "../redux/userSlice";

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:7071";

const getErrMsg = (err: any) => err.response?.data?.message || err.message || "Network Error";

/**
 * SETTINGS
 */
function getSettings(dispatch: AppDispatch) {
    axios.get<ApiResponse>(`${API_URL}/api/v0/settings`).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(setGraphs(res.data.graph_preferences));
            dispatch(setBudget(res.data.budget));
            dispatch(setDates({ start: res.data.start, end: res.data.end }));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

function updateSettings(settings: SettingsForm, dispatch: AppDispatch) {
    axios.put<ApiResponse>(`${API_URL}/api/v0/settings`, settings).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(setGraphs(res.data.graph_preferences));
            dispatch(setBudget(res.data.budget));
            dispatch(setDates({ start: res.data.start, end: res.data.end }));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

/**
 * USER AUTH 
 */
function login(user: string, pass: string, dispatch: AppDispatch) {
    axios.post<ApiResponse>(`${API_URL}/api/v0/login`, { username: user, password: pass }).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(setUser({ user: res.data.username, token: res.data.token }));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

function signup(user: string, pass: string, dispatch: AppDispatch) {
    axios.post<ApiResponse>(`${API_URL}/api/v0/signup`, { username: user, password: pass }).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(success(res.message + " - Please login to continue"));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

/**
 * AWARDS
 */
function addAward(award: AwardForm, user: string, dispatch: AppDispatch) {
    axios.post<ApiResponse>(`${API_URL}/api/v0/award?user=${user}`, award).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(setAward(res.data));
            dispatch(success("Congratulations! On your new award"));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

function getAwards(user: string, dispatch: AppDispatch) {
    axios.get<ApiResponse>(`${API_URL}/api/v0/award?user=${user}`).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(setAwards(res.data));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

export { getSettings, updateSettings, login, signup, addAward, getAwards }