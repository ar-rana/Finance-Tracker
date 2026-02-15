import axios from "axios";
import type { AppDispatch } from "../store";
import { warn } from "../redux/modalSlice";
import type { Response as ApiResponse } from "../types/APIData";
import { setBudget, setDates, setGraphs } from "../redux/settingsSlice";
import type { SettingsForm, AwardForm } from "../types/FormsData";
import { setUser, setAward, setAwards } from "../redux/userSlice";

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:7071";



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
        dispatch(warn(err.response.data.message));
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
        dispatch(warn(err.response.data.message));
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
        dispatch(warn(err.response.data.message));
    })
}

function signup(user: string, pass: string, dispatch: AppDispatch) {
    axios.post<ApiResponse>(`${API_URL}/api/v0/signup`, { username: user, password: pass }).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(setUser({ user: res.data.username, token: res.data.token }));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(err.response.data.message));
    })
}

/**
 * AWARDS
 */
function addAward(award: AwardForm, dispatch: AppDispatch) {
    axios.post<ApiResponse>(`${API_URL}/api/v0/award`, award).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(setAward(res.data));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(err.response.data.message));
    })
}

function getAwards(dispatch: AppDispatch) {
    axios.get<ApiResponse>(`${API_URL}/api/v0/award`).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(setAwards(res.data));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(err.response.data.message));
    })
}

export { getSettings, updateSettings, login, signup, addAward, getAwards }