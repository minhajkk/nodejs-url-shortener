var express = require('express');
var randomstring = require("randomstring");
var router = express.Router();
var Url = require('../models/url.js');
router.get('/:slug', function(req, res){
    //var query  = Url.where({ slug: req.params.slug });
    Url.findOne({'slug': req.params.slug}, function(err, urlObj){
        console.log('into mongoose findone');
        console.log(urlObj)
        if(err) {
            console.log("Error occurred while searching url for slug:" + req.params.slug);
            console.log("Error-> " + err);
        }

        if(urlObj){
            var _url2Redirect = urlObj.url;
            console.log("Found Url-> " + _url2Redirect);
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
});

/* GET home page. */
router.get('/', function(req, res){
    res.render('home');
});

router.post('/shortener',  function(req, res){
    console.log("Called shortener");

    var url = new Url({
        url: req.body.url,
        slug: randomstring.generate(5)
    });
    url.save(function (err, url) {
        if (err) {
            console.error(err);
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

            console.log("Saved Url:" +  req.body.url);
            console.log("Slug:" +  url.slug);
        }
        res.redirect(303, '/');
    });
});

module.exports = router;
