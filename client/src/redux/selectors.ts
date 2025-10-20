import type { RootState } from "../store";
import type { ReduxModalState } from "../types/SliceData";

export const getAllModalStates = (state: RootState): ReduxModalState => {
    return {
        awardOpen: state.modals.awardOpen,
        expenseOpen: state.modals.expenseOpen,
        inflowOpen: state.modals.inflowOpen,
        settingsOpen: state.modals.settingsOpen,
        stocksOpen: state.modals.stocksOpen,
    }
};

export const getAwardModalState = (state: RootState) => state.modals.awardOpen;