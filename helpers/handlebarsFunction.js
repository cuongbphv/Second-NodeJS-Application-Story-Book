const moment = require('moment');

module.exports = {
    // cut and show by length string
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            var new_str = str + " ";
            new_str = str.substr(0, len);
            new_str = str.substr(0, new_str.lastIndexOf(" "));
            new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
            return new_str + '...';
        }
        return str;
    },
    // skip tag html when save into database
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '');
    },
    // format date by input date and input format 
    formatDate: function (date, format) {
        return moment(date).format(format);
    },
    // translate boolean into string
    tranText: function (allowComments) {
        if (allowComments == true)
            return "Allow";
        else
            return "Not Allow";
    },
    // replace selectbox when call edit function
    select: function (selected, options) {
        return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"')
            .replace(new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
    }
};