const Movie = require('../models//movie');
const MovieComment = require('../models/movie-comment');
const https = require('https');
const request = require('request');

exports.accessMovie = function (req, res) {
    console.log('1');
    Movie.findOne( { $and: [ { id_api: req.params.id_api }, { api: req.params.api } ] }, function (err, movie) {
        if (err) { res.json(err) }
        else if (movie) {
            res.json(movie);
            console.log('2');
        } else {
            //Creer le movie
            if (req.params.api == "yts") {
                request('https://yts.am/api/v2/movie_details.json?movie_id=' + req.params.id_api, function (error, response, body) {
                   if (error) { res.json(error) }
                   else {
                       data = JSON.parse(body);
                       let newMovie = Movie({
                           id_api: req.params.id_api,
                           api: req.params.api,
                           hash: data.data.movie.torrents[0].hash
                       });
                       console.log('Sauvegarde ...');
                       newMovie.save((err2, movie) => {
                           console.log('SAVING');
                           if (err2) {
                               console.log('ERROR:', err2);
                               res.json(err2)
                           }
                           else {
                               console.log('ENVOIE DU MOVIE --------');
                               res.json(movie);
                           }
                       });
                   };
                });
            } else if (req.params.api == 'nyaapantsu') {
                    request('https://nyaa.pantsu.cat/api/search?id=' + req.params.id_api, function (error, response, body) {
                        if (error) { res.json(error) }
                        else {
                            data = JSON.parse(body);
                            let newMovie = Movie({
                                id_api: req.params.id_api,
                                api: req.params.api,
                                hash: data.torrents[0].hash
                            });
                            console.log('Sauvegarde ...');
                            newMovie.save((err2, movie) => {
                                console.log('SAVING');
                                if (err2) {
                                    console.log('ERROR:', err2);
                                    res.json(err2)
                                }
                                else {
                                    console.log('ENVOIE DU MOVIE --------');
                                    res.json(movie);
                                }
                            });
                        };
                    });
            }
        }
    });
}

/*  get.api/movie_comments */
exports.getAllComments = function (req, res) {
    MovieComment.find(function(err, comments){
       if (err) { res.json(err) }
       else if (comments) { res.json(comments) }
    });
}

/* get.api/movie_comments/:id_movie */
exports.getComments = function (req, res) {
    MovieComment.find({ id_movie: req.params.id_movie}, function(err, comments){
        if (err) { res.json(err) }
        else if (comments) { res.json(comments) }
    });
}

/*  get.api/movie_comment/:id_comment */
exports.getComment = function (req, res) {
    MovieComment.findOne({ _id: req.params.id_comment}, function(err, comment){
        if (err) { res.json(err) }
        else if (comment) { res.json(comment) }
    });
}

/* post.api/movie_comment/:id_movie */
exports.postComment = function (req, res) {
    const newComment = MovieComment ({
        id_movie: req.body.id_movie,
        id_user: req.user._id,
        content: req.body.content
    });
    newComment.save((err, comment) => {
        if (err) { res.json(err) }
        else { res.json(comment) }
    });
}