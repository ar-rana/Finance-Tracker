import type { RootState } from "../store";
import type { SettingsForm } from "../types/FormsData";
import type { ReduxModalState } from "../types/ReduxData";

export const getAllModalStates = (state: RootState): ReduxModalState => {
    return {
        awardOpen: state.modals.awardOpen,
        expenseOpen: state.modals.expenseOpen,
        inflowOpen: state.modals.inflowOpen,
        settingsOpen: state.modals.settingsOpen,
        stocksOpen: state.modals.stocksOpen,
        warningOpen: state.modals.warningOpen,
        analyticsOpen: state.modals.analyticsOpen,
        successOpen: state.modals.successOpen,
    }
};

export const getAwardModalState = (state: RootState) => state.modals.awardOpen;
export const getAnalyticsModalState = (state: RootState) => state.modals.analyticsOpen;
export const getExpenseModalState = (state: RootState) => state.modals.expenseOpen;
export const getInflowModalState = (state: RootState) => state.modals.inflowOpen;
export const getSettingsModalState = (state: RootState) => state.modals.settingsOpen;
export const getStocksModalState = (state: RootState) => state.modals.stocksOpen;
export const getWarningModalState = (state: RootState) => {
    return {
        warningOpen: state.modals.warningOpen,
        warning: state.modals.warning,
    }
};
export const getSuccessModalState = (state: RootState) => {
    return {
        time: state.modals.time || 2000,
        successOpen: state.modals.successOpen,
        success: state.modals.success,
    }
};

export const getAllSettingData = (state: RootState): SettingsForm => state.settings.settings;

export const getUser = (state: RootState) => {
    return {
        user: state.user.user,
        token: state.user.token,
    }
};

export const getAwards = (state: RootState) => state.user.awards;

export const getStocks = (state: RootState) => state.data.stocks;
export const getExpenses = (state: RootState) => state.data.expenses;
export const getInflows = (state: RootState) => state.data.inflows;

export const getPieData = (state: RootState) => state.chart.pieData;
export const getExpensePieData = (state: RootState) => state.chart.expensePieData;
export const getIncomePieData = (state: RootState) => state.chart.incomePieData;
export const getHollowPieData = (state: RootState) => state.chart.hollowPieData;
export const getInHollowPieData = (state: RootState) => state.chart.inHollowPieData;
export const getOutHollowPieData = (state: RootState) => state.chart.outHollowPieData;
export const getCategoryBarData = (state: RootState) => state.chart.categoryBarData;
export const getBarData = (state: RootState) => state.chart.barData;
export const getLineData = (state: RootState) => state.chart.lineData;
export const getInScatterData = (state: RootState) => state.chart.inScatterData;
export const getOutScatterData = (state: RootState) => state.chart.outScatterData;
export const getRadarData = (state: RootState) => state.chart.radarData;