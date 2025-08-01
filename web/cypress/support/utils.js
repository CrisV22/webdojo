function getTodayDate() {
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
}

function isValidMD5(hash) {
    const md5Regex = /^[a-fA-F0-9]{32}$/;
    return md5Regex.test(hash);
}

export {
    getTodayDate,
    isValidMD5,
}