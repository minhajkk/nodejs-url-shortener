var randomstring = require("randomstring")
    , Url = require('../models/url.js');

module.exports = function(app, io, server) {

    app.get('/:slug', function(req, res){
        if (req.params.slug) {
            Url.findOne({'slug': req.params.slug}, function(err, urlObj){
                if(err) {
                    console.log("Error occurred while searching url for slug:" + req.params.slug);
                }

                if(urlObj){
                    var _url2Redirect = urlObj.url;
                    return res.render('redir', {redirect: _url2Redirect});
                } else {
                    req.session.flash = {
                        type: 'danger',
                        intro: 'Uh oh,',
                        message: 'We couldn\'t find a link for the URL you clicked.'
                    };
                    res.redirect('/');
                }
            });
        }
    });

    /* GET home page. */
    app.get('/', function(req, res){
        res.render('home');
    });
    
    /* Creating short url. */
    app.post('/shortener',  function(req, res){ 
        var url = new Url({
            url: req.body.url,
            slug: randomstring.generate(5)
        });
        url.save(function (err, url) {
            if (err) {
                req.session.flash = {
                    type: 'danger',
                    intro: 'Ooops!',
                    message: 'There was an error processing your request.'
                };
            } else {
                req.session.flash = {
                    type: 'success',
                    intro: 'DONE!!',
                    message: 'YOU\'VE CREATED YOUR URL SHORTENER!',
                    slug: url.slug
                };
                setTimeout(function(){
                    io.to('clients').emit("url.changed", {url: url.url});
                }, 0);
            }
            res.redirect(303, '/');
        });
    });
};

