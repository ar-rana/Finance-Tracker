import React, { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getInHollowPieData, getOutHollowPieData } from "../../redux/selectors";

export const INCOME_COLOR = "#82ca9d";
export const EXPENSE_COLOR = "#8884d8";

interface RenderProps {
    data: any[];
    color: string;
    label: string;
}

interface ColorToggleBtnProps {
    inData?: any[];
    outData?: any[];
    children: (props: RenderProps) => React.ReactNode;
}

const ColorToggleBtn: React.FC<ColorToggleBtnProps> = ({ inData, outData, children }) => {
    const [showIncome, setShowIncome] = useState(true);

    const reduxInData = useAppSelector(getInHollowPieData);
    const reduxOutData = useAppSelector(getOutHollowPieData);

    const actualInData = inData !== undefined ? inData : reduxInData;
    const actualOutData = outData !== undefined ? outData : reduxOutData;

    const data = showIncome ? actualInData : actualOutData;
    const color = showIncome ? INCOME_COLOR : EXPENSE_COLOR;
    const label = showIncome ? "Income" : "Expense";

    return (
        <div className="relative w-full h-full bg-white">
            <button
                title={`Switch to ${showIncome ? "Expense" : "Income"}`}
                onClick={() => setShowIncome(prev => !prev)}
                className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110"
                style={{ backgroundColor: color }}
            />
            {children({ data, color, label })}
        </div>
    );
};

export default ColorToggleBtn;
