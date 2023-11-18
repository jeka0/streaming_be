const formatToFile = (date)=>{
    return `${date.getFullYear()}-${format2(date.getMonth()+1)}-${format2(date.getDate())}-${format2(date.getHours())}-${format2(date.getMinutes())}-${format2(date.getSeconds())}`;
}

const format2 = (number)=>{
    return ("0" + number).slice(-2)
}

module.exports = {
    formatToFile
}