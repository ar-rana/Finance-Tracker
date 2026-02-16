import axios from "axios";
import type { AppDispatch } from "../store";
import { success, warn } from "../redux/modalSlice";
import type { Response as ApiResponse } from "../types/APIData";
import type { StocksFormData } from "../types/FormsData";
import { setStock, setStocks } from "../redux/dataSlice";

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:7071";

const getErrMsg = (err: any) => err.response?.data?.message || err.message || "Network Error";

/**
 * STOCK TRACKING
 */

function addStock(stock: StocksFormData, dispatch: AppDispatch) {
    axios.post<ApiResponse>(`${API_URL}/api/v0/stock`, stock).then((response) => {
        const res = response.data;

        if (res.success) {
            // After successful creation
            dispatch(setStock(res.data));
            dispatch(success(res.message));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

function getStocks(start: string, end: string, dispatch: AppDispatch) {
    // start and end are expected to be strings like "31/01/2026"
    axios.get<ApiResponse>(`${API_URL}/api/v0/stock`, { params: { start, end } }).then((response) => {
        const res = response.data;

        if (res.success) {
            dispatch(setStocks(res.data));
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

function removeStock(id: string, dispatch: AppDispatch) {
    axios.delete<ApiResponse>(`${API_URL}/api/v0/stock`, { params: { id } }).then((response) => {
        const res = response.data;

        if (res.success) {
            // Refresh logic can be handled by the component or by calling getStocks again
        } else {
            dispatch(warn(res.message));
        }
    }).catch((err) => {
        console.log(err);
        dispatch(warn(getErrMsg(err)));
    })
}

export { addStock, getStocks, removeStock }
