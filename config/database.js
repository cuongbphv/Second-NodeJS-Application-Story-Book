if(process.env.NODE_ENV === 'production'){
    module.exports = {
        mongoURI: 'mongodb://bphvcg:03091997@ds241869.mlab.com:41869/story-books-bphvcg'
    };
}
else{
    module.exports = {
        mongoURI: 'mongodb://localhost/storybooks'
    };
}