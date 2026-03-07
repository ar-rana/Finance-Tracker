// Compact Indian-style: 100 → "100", 10000 → "10k", 150000 → "1.5L"
export const fmtVal = (val: number): string => {
    if (val >= 10000000) return `${(val / 10000000).toFixed(1)}Cr`;
    if (val >= 100000) return `${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
    return String(val);
};
