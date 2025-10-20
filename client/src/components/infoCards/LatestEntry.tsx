import React from 'react'

type EntryType = 'income' | 'expense' | 'transfer' | 'other'

interface LatestEntryProps {
    type?: EntryType
    title?: string
    amount?: string
    date?: string
    description?: string
}

const colorMap: Record<EntryType, string> = {
    income: 'bg-green-400',
    expense: 'bg-red-400',
    transfer: 'bg-blue-400',
    other: 'bg-gray-400',
}

const LatestEntry: React.FC<LatestEntryProps> = ({
    type = 'other',
    title = 'Sample Entry',
    amount = '₹0.00',
    date = 'Today',
    description = 'No additional details',
}) => {
    const stripClass = colorMap[type] || colorMap.other

    return (
        <div className="flex flex-row bg-white rounded-lg shadow-sm pr-2 overflow-auto">
            <div
                className={`${stripClass} w-2`}
            />

            <div className="p-1 flex-1 flex flex-row items-center justify-between">
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-black">
                        {title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-800 flex truncate" title={description}>
                        {description}
                    </p>
                </div>

                <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                        {amount}
                    </div>
                    <div className="text-xs text-gray-500">{date}</div>
                </div>
            </div>
        </div>
    )
}

export default LatestEntry;