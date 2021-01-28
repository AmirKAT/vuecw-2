
const chalk = require('chalk');

const customLogger = function (req, res, next) {
    let current_datetime = new Date();
    let formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;
    let log = `[${chalk.blue(formatted_date)}] ${method}:${chalk.green(url)} ${status}`;

    console.log(log);
    next();
};

module.exports = customLogger;