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
    },
    showIcon: function (storyUser, loggedUser, storyId, floating) {
        if (storyUser == loggedUser) {
            if (floating == 1) {
                return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab red"><i class="fa fa-pencil"></i></a>`;
            } 
            else if (floating == 2) {
                return `<a href="/stories/edit/${storyId}"><i class="fa fa-pencil"></i></a>`;
            }
        } else {
            return '';
        }
    },
    showIconComment: function (commentUser, loggedUser, storyId, commentId) {
        console.log(commentUser, loggedUser, storyId, commentId);
        if (commentUser == loggedUser) {
            return `<button class="edit-button custom-btn">
                        <i class="fa fa-pencil"></i>
                    </button>
                <form action="/stories/comment/` + storyId + `/`+ commentId +`?_method=DELETE" method="post" id="delete-form">
                    <input type="hidden" name="_method" value="DELETE">
                    <button type="submit" class="custom-btn">
                        <i class="fa fa-trash" style="color:red"></i>
                    </button>
                </form>`;
        } else {
            return '';
        }
    }
};