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

export const getAllSettingData = (state: RootState): SettingsForm => state.settings.settings;

export const getUser = (state: RootState) => {
    return {
        user: state.user.user,
        token: state.user.token,
    }
};

export const getAwards = (state: RootState) => state.user.awards;