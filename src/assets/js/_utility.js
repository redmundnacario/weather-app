
/// ====================================================== //
// UTILITIES PURE FUNCTIONS
// ====================================================== //

    // let unix_timestamp = 1549312452
const convertUnix = function(unix_timestamp){
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var dateObj = new Date(unix_timestamp * 1000);
    // // Hours part from the timestamp
    // var hours = date.getHours();
    // // Minutes part from the timestamp
    // var minutes = "0" + date.getMinutes();
    // // Seconds part from the timestamp
    // var seconds = "0" + date.getSeconds();

    // // Will display time in 10:30:23 format
    // var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    return days[dateObj.getDay()] + ", "+ dateObj.toLocaleDateString() +" at "+ dateObj.toLocaleTimeString();

    // return(formattedTime);
}
const covertUnixToDayPHT = function(unix_timestamp){
    var dateObj = new Date(unix_timestamp * 1000);
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[dateObj.getDay()] 
}
const covertUnixToDatePHT = function(unix_timestamp){
    var dateObj = new Date(unix_timestamp * 1000);
    return dateObj.toLocaleDateString()
}

const covertUnixToHoursMinutesPHT = function(unix_timestamp){
    var dateObj = new Date(unix_timestamp * 1000);
    // console.log(dateObj)

    // Hours part from the timestamp
    var hours = dateObj.getHours();
    // Minutes part from the timestamp
    var minutes = dateObj.getMinutes();

    var ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime
}

const covertUnixToHoursPHT = function(unix_timestamp){
    var dateObj = new Date(unix_timestamp * 1000);
    // console.log(dateObj)

    // Hours part from the timestamp
    var hours = dateObj.getHours();

    var ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = hours + ampm;
    return strTime
}
