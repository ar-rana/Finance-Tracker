import React from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { removeExpense, removeInflow } from '../../api/inflow-outflow'

type EntryType = 'income' | 'expense' | 'transfer' | 'other'

interface LatestEntryProps {
    id?: string
    type?: EntryType
    title?: string
    amount?: string
    date?: string
    day?: string | number
    description?: string
}

const colorMap: Record<EntryType, string> = {
    income: 'bg-green-400',
    expense: 'bg-red-400',
    transfer: 'bg-blue-400',
    other: 'bg-gray-400',
}

const LatestEntry: React.FC<LatestEntryProps> = ({
    id,
    type = 'other',
    title = 'Sample Entry',
    amount = '₹0.00',
    date = 'Today',
    day,
    description = 'No additional details',
}) => {
    const dispatch = useAppDispatch();
    const stripClass = colorMap[type] || colorMap.other

    const displayDate = day ? `${day} ${date}` : date;

    const handleDelete = () => {
        if (!id) return;
        if (window.confirm("Are you sure you want to delete this entry?")) {
            if (type === 'expense') {
                removeExpense(id, dispatch)
            } else if (type === 'income') {
                removeInflow(id, dispatch)
            }
        }
    }

    return (
        <div className="flex flex-row bg-white rounded-lg shadow-sm pr-2 overflow-auto">
            <div
                className={`${stripClass} w-2`}
            />

            <div className="p-1 flex-1 flex flex-row items-center justify-between">
                <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-sm font-medium text-black truncate">
                        {title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-800 flex truncate" title={description}>
                        {description}
                    </p>
                </div>

                <div className="text-right flex items-center justify-end gap-3">
                    <div>
                        <div className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                            {amount}
                        </div>
                        <div className="text-xs text-gray-500 whitespace-nowrap">{displayDate}</div>
                    </div>
                    {id && (type === 'expense' || type === 'income') && (
                        <button
                            onClick={handleDelete}
                            title="Delete"
                            className="text-red-500 hover:text-red-700 p-1 flex items-center justify-center transition-colors"
                        >
                            <i className="fa fa-trash text-sm"></i>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LatestEntry;