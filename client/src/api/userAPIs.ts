import axios from "axios";
import type { AppDispatch } from "../store";
import { setTime, success, toggleSettings, warn } from "../redux/modalSlice";
import type { Response as ApiResponse } from "../types/APIData";
import { setBudget, setDates, setGraphs, setSpecifiedBudgets } from "../redux/settingsSlice";
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
            console.log(JSON.stringify(res.data));
            dispatch(setGraphs(res.data.graph_preferences || []));
            dispatch(setBudget(res.data.budget));
            dispatch(setSpecifiedBudgets(res.data.specific_budgets || {}));
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
    const parsedBudget = Number(settings.budget);
    if (!Number.isFinite(parsedBudget) || parsedBudget < 0) {
        dispatch(warn("Please enter a valid budget amount"));
        return;
    }

    const cleanedSpecificBudgets = Object.entries(settings.specifiedBudgets || {}).reduce<Record<string, number>>(
        (acc, [k, v]) => {
            const num = Number(v);
            if (Number.isFinite(num) && num > 0) {
                acc[k] = Math.trunc(num);
            }
            return acc;
        },
        {}
    );

    const payload = {
        graph_preferences: settings.graphs,
        budget: Math.trunc(parsedBudget),
        specific_budgets: cleanedSpecificBudgets,
        start: settings.start,
        end: settings.end
    };

    axios.put<ApiResponse>(`${API_URL}/api/v0/settings`, payload).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(setGraphs(res.data.graph_preferences || []));
            dispatch(setBudget(res.data.budget));
            dispatch(setSpecifiedBudgets(res.data.specific_budgets || {}));
            dispatch(setDates({ start: res.data.start, end: res.data.end }));
            dispatch(toggleSettings());
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
            dispatch(setTime(3000));
            dispatch(success("（づ￣3￣）づ╭❤️～ Congratulations! On your new award"));
            setTimeout(() => {
                dispatch(setTime(2000));
            }, 3050)
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
