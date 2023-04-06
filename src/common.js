
class Common {

    //取得日期格式資料
    getDateFormat(date = new Date(), separator = '-') {
        let year = date.getFullYear()
        let month = (date.getMonth() + 1).toString().padStart(2, '0')
        let day = date.getDate().toString().padStart(2, '0')
        return `${year}${separator}${month}${separator}${day}`
    }

}

export default new Common()