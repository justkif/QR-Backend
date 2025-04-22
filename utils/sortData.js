module.exports = (data, attribute) => {
    return data.sort((a, b) => {
        const aStartsWithLetter = /^[A-Za-z]/.test(a[attribute]);
        const bStartsWithLetter = /^[A-Za-z]/.test(b[attribute]);
        if (aStartsWithLetter && !bStartsWithLetter) return -1;
        if (!aStartsWithLetter && bStartsWithLetter) return 1;
        const numA = parseInt(a[attribute].replace(/[^\d]/g, ''), 10) || 0;
        const numB = parseInt(b[attribute].replace(/[^\d]/g, ''), 10) || 0;
        return numA - numB;
    });
}