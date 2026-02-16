import axios from "axios";
import type { AppDispatch } from "../store";
import { success, warn } from "../redux/modalSlice";
import type { Response as ApiResponse } from "../types/APIData";
import type { AddExpenseForm, InflowForm } from "../types/FormsData";
import { setExpense, setExpenses, setInflow, setInflows } from "../redux/dataSlice";

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:7071";

const getErrMsg = (err: any) => err.response?.data?.message || err.message || "Network Error";

/**
 * EXPENSES
 */

function addExpense(expense: AddExpenseForm, dispatch: AppDispatch) {
    axios.post<ApiResponse>(`${API_URL}/api/v0/expense`, expense).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(setExpense(res.data));
            dispatch(success(res.message));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

function getExpenses(start: string, end: string, dispatch: AppDispatch) {
    axios.get<ApiResponse>(`${API_URL}/api/v0/expense`, { params: { start, end } }).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(setExpenses(res.data));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

function removeExpense(id: string, dispatch: AppDispatch) {
    axios.delete<ApiResponse>(`${API_URL}/api/v0/expense`, { params: { id } }).then((response) => {
        const res = response.data;

        if (res.success) {
            // Success logic
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

/**
 * INFLOWS
 */

function addInflow(inflow: InflowForm, dispatch: AppDispatch) {
    axios.post<ApiResponse>(`${API_URL}/api/v0/inflow`, inflow).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(setInflow(res.data));
            dispatch(success(res.message));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

function getInflows(start: string, end: string, dispatch: AppDispatch) {
    axios.get<ApiResponse>(`${API_URL}/api/v0/inflow`, { params: { start, end } }).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(setInflows(res.data));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

function removeInflow(id: string, dispatch: AppDispatch) {
    axios.delete<ApiResponse>(`${API_URL}/api/v0/inflow`, { params: { id } }).then((response) => {
        const res = response.data;

        if (res.success) {
            // Success logic
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

export { addExpense, getExpenses, removeExpense, addInflow, getInflows, removeInflow }
