import { ExpenseCategories, InflowSources } from "../types/FormsData";

export const parseBarLineData = (expenses: any[], inflows: any[]) => {
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    // Aggregate by month
    const aggregated = months.reduce((acc, month) => {
        acc[month] = { expense: 0, income: 0 };
        return acc;
    }, {} as Record<string, { expense: number, income: number }>);

    expenses?.forEach(exp => {
        const m = exp.month?.toLowerCase();
        if (aggregated[m]) {
            aggregated[m].expense += Number(exp.amount) || 0;
        }
    });

    inflows?.forEach(inf => {
        const m = inf.month?.toLowerCase();
        if (aggregated[m]) {
            aggregated[m].income += Number(inf.amount) || 0;
        }
    });

    // Format for charts: only return months that have data or all up to current?
    // Let's filter to months that have at least some data, or return all standard 12.
    // Assuming we want a continuous timeline for visible months:
    return months.map(m => {
        const income = aggregated[m].income;
        const expense = aggregated[m].expense;
        return {
            month: m.charAt(0).toUpperCase() + m.slice(1).substring(0, 2), // Jan, Feb, Mar...
            fullMonth: m,
            expense: expense,
            income: income,
            amount: income - expense, // net amount
            amt: income - expense,
        };
    }).filter(data => data.expense > 0 || data.income > 0);
};

export const parseLineData = (expenses: any[], inflows: any[]) => {
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const aggregated: Record<string, { timestamp: number, dateLabel: string, expense: number, income: number, hasM: boolean }> = {};

    const process = (items: any[], type: 'expense' | 'income') => {
        items?.forEach(item => {
            const hasM = !item.day;
            const y = parseInt(item.year) || new Date().getFullYear();
            const mStr = item.month?.toLowerCase() || '';
            const m = months.indexOf(mStr) !== -1 ? months.indexOf(mStr) : 0;
            const d = hasM ? 15 : parseInt(item.day);

            const monthAbbr = mStr.charAt(0).toUpperCase() + mStr.slice(1, 3);
            const dateLabel = `${d} ${monthAbbr} ${y}`;
            const key = `${y}-${m}-${d}${hasM ? 'M' : ''}`;

            if (!aggregated[key]) {
                aggregated[key] = {
                    timestamp: new Date(y, m, d).getTime(),
                    dateLabel: `${dateLabel}${hasM ? ' (M)' : ''}`,
                    expense: 0,
                    income: 0,
                    hasM
                };
            }
            aggregated[key][type] += Number(item.amount) || 0;
        });
    };

    process(expenses, 'expense');
    process(inflows, 'income');

    return Object.values(aggregated)
        .sort((a, b) => a.timestamp - b.timestamp)
        .map(data => ({
            month: data.dateLabel, // Line chart uses 'month' attribute for XAxis
            expense: data.expense,
            income: data.income,
            amount: data.income - data.expense,
            amt: data.income - data.expense,
        }));
};

export const parsePieData = (expenses: any[], monthFilter?: string) => {
    // Group by Expense Category, optionally filtered to a specific month
    const filtered = monthFilter
        ? (expenses || []).filter(exp => exp.month?.toLowerCase() === monthFilter)
        : (expenses || []);

    const aggregated = ExpenseCategories.reduce((acc, cat) => {
        acc[cat] = 0;
        return acc;
    }, {} as Record<string, number>);

    filtered.forEach(exp => {
        const cat = exp.category;
        const amt = Number(exp.amount) || 0;
        if (aggregated[cat] !== undefined) {
            aggregated[cat] += amt;
        } else if (cat) {
            aggregated[cat] = (aggregated[cat] || 0) + amt;
        }
    });

    return Object.keys(aggregated)
        .filter(key => aggregated[key] > 0)
        .map(key => ({
            name: key.replace("_", " "),
            value: aggregated[key]
        }));
};

export const parseIncomePieData = (inflows: any[], monthFilter?: string) => {
    // Group by Inflow Source, optionally filtered to a specific month
    const filtered = monthFilter
        ? (inflows || []).filter(inf => inf.month?.toLowerCase() === monthFilter)
        : (inflows || []);

    const aggregated = InflowSources.reduce((acc, src) => {
        acc[src] = 0;
        return acc;
    }, {} as Record<string, number>);

    filtered.forEach(inf => {
        const src = inf.source;
        const amt = Number(inf.amount) || 0;
        if (aggregated[src] !== undefined) {
            aggregated[src] += amt;
        } else if (src) {
            aggregated[src] = (aggregated[src] || 0) + amt;
        }
    });

    return Object.keys(aggregated)
        .filter(key => aggregated[key] > 0)
        .map(key => ({
            name: key.replace(/_/g, " "),
            value: aggregated[key]
        }));
};

export const parseHollowPieData = (inflows: any[]) => {
    // Group by Inflow Source
    const aggregated = InflowSources.reduce((acc, src) => {
        acc[src] = 0;
        return acc;
    }, {} as Record<string, number>);

    inflows?.forEach(inf => {
        const src = inf.source;
        const amt = Number(inf.amount) || 0;
        if (aggregated[src] !== undefined) {
            aggregated[src] += amt;
        } else if (src) {
            aggregated[src] = (aggregated[src] || 0) + amt;
        }
    });

    return Object.keys(aggregated)
        .filter(key => aggregated[key] > 0)
        .map(key => ({
            type: key.replace(/_/g, " "),
            value: aggregated[key]
        }));
};

export const parseOutflowHollowPieData = (expenses: any[]) => {
    // Group by Expense Category
    const aggregated = ExpenseCategories.reduce((acc, cat) => {
        acc[cat] = 0;
        return acc;
    }, {} as Record<string, number>);

    expenses?.forEach(exp => {
        const cat = exp.category;
        const amt = Number(exp.amount) || 0;
        if (aggregated[cat] !== undefined) {
            aggregated[cat] += amt;
        } else if (cat) {
            aggregated[cat] = (aggregated[cat] || 0) + amt;
        }
    });

    return Object.keys(aggregated)
        .filter(key => aggregated[key] > 0)
        .map(key => ({
            type: key.replace(/_/g, " "),
            value: aggregated[key]
        }));
};

export const parseRadarData = (expenses: any[], inflows: any[]) => {
    // Aggregate expenses by category (lowercase)
    const expenseMap: Record<string, number> = {};
    (expenses || []).forEach(exp => {
        const key = exp.category?.toLowerCase();
        if (key) expenseMap[key] = (expenseMap[key] || 0) + (Number(exp.amount) || 0);
    });

    // Aggregate inflows by source (lowercase)
    const incomeMap: Record<string, number> = {};
    (inflows || []).forEach(inf => {
        const key = inf.source?.toLowerCase();
        if (key) incomeMap[key] = (incomeMap[key] || 0) + (Number(inf.amount) || 0);
    });

    // Merge all unique subjects from both maps
    const allSubjects = Array.from(new Set([...Object.keys(expenseMap), ...Object.keys(incomeMap)]));

    if (allSubjects.length === 0) return [];

    return allSubjects.map(subject => {
        const expense = expenseMap[subject] ?? 0;
        const income = incomeMap[subject] ?? 0;
        const fullMark = Math.ceil(Math.max(expense, income, 1) / 100) * 100;
        return { subject, expense, income, fullMark };
    });
};

export const parseCategoryBarData = (expenses: any[], inflows: any[]) => {
    // Group by unique combination of Month + Category/Source
    const dataMap: Record<string, { name: string, expense: number, income: number, month: string }> = {};

    (expenses || []).forEach(exp => {
        const category = exp.category?.toLowerCase() || "other";
        const month = exp.month?.toLowerCase() || "unknown";
        const key = `${month}_${category}`;

        if (!dataMap[key]) {
            dataMap[key] = { name: category, expense: 0, income: 0, month: month };
        }
        dataMap[key].expense += (Number(exp.amount) || 0);
    });

    (inflows || []).forEach(inf => {
        const source = inf.source?.toLowerCase() || "other";
        const month = inf.month?.toLowerCase() || "unknown";
        const key = `${month}_${source}`;

        if (!dataMap[key]) {
            dataMap[key] = { name: source, expense: 0, income: 0, month: month };
        }
        dataMap[key].income += (Number(inf.amount) || 0);
    });

    // Return the values as a flat array
    // Optional: Sort by month order if needed, but for now we'll return all unique combinations
    return Object.values(dataMap);
};

export const parseScatterData = (expenses: any[]) => {
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    // Process and sort chronologically, but plot index-based to avoid large time gaps
    return (expenses || [])
        .map(exp => {
            const hasM = !exp.day;
            const y = parseInt(exp.year) || new Date().getFullYear();
            const mStr = exp.month?.toLowerCase() || '';
            const m = months.indexOf(mStr) !== -1 ? months.indexOf(mStr) : 0;
            const d = hasM ? 15 : parseInt(exp.day);
            return {
                ...exp,
                timestamp: new Date(y, m, d).getTime(),
                hasM
            };
        })
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((exp, index) => {
            const mStr = exp.month?.toLowerCase() || '';
            const monthAbbr = mStr.charAt(0).toUpperCase() + mStr.slice(1, 3);
            const y = parseInt(exp.year) || new Date().getFullYear();
            const d = exp.hasM ? 15 : parseInt(exp.day) || 15;

            return {
                x: index + 1,
                date: `${d} ${monthAbbr} ${y}`,
                y: Number(exp.amount) || 0,
                name: exp.category || exp.source,
                label: exp.hasM ? 'M' : '' // For tiny 'M' in LabelList
            };
        });
};
