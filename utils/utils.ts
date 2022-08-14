export function handleDate():String {
    const date = new Date();
    let year: number = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();
    const Hours:number = date.getHours();
    const Minutes: number = date.getMinutes();
    const Seconds: number = date.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    let s_createtime: String = year + '-' + month + '-' + day + ' ' + Hours + ':' + Minutes + ':' + Seconds;
    return s_createtime
}