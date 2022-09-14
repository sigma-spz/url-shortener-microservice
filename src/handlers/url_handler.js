const db_handler = require('./db_handler');
const createAndSaveUrl = db_handler.createAndSaveUrl;
const fetchUrl = db_handler.fetchUrl;
const urlValidator = require('../tools/url_validations').urlValidator;

const postUrl = (req, res) => {
    const url = req.body.url
    const shortUrl = Math.floor(Math.random() * 1000)//Math.random().toString(36).slice(2);
    try {
	urlValidator(req.body.url);
	createAndSaveUrl(url, shortUrl);
	res.json({ original_url: res.url, short_url: shortUrl });
    } catch (e) {
	res.json({ error: e });
    }
};

const goToUrl = async (req, res) => {
    const shortUrlKey = req.params.key;
    console.log(shortUrlKey)
    try {
	if (!shortUrlKey) throw "Not found";
	const originalUrl = await fetchUrl(shortUrlKey);
	console.log(originalUrl)
	res.redirect(301, originalUrl.url);
    } catch (e) {
	res.json({ error: e });
    }
};

exports.postUrl = postUrl;
exports.goToUrl = goToUrl;
