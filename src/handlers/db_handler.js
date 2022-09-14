const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(
    MONGO_URI,
    {
	useNewUrlParser: true,
	useUnifiedTopology: true
    }
);

let urlSchema = new mongoose.Schema({
    url: {type: String, required: true},
    shortenedUrl: String
});

let Url = mongoose.model("url", urlSchema);

const createAndSaveUrl = async (urlToBeShortened, shortUrl) => {
    let newUrl = new Url({
	url: urlToBeShortened,
	shortenedUrl: shortUrl
    });
    try {
	await newUrl.save();
    } catch (e) {
	throw `Adding new url failed!\nMessage: ${e}`
    }
};

const fetchUrl = async (shortUrl) => {
    try {
	const fullUrl = await Url
	      .findOne({ shortenedUrl: shortUrl })
	      .exec();
	console.log(fullUrl)
	return fullUrl;
    } catch (e) {
	throw "Not found";
    }
};

exports.createAndSaveUrl = createAndSaveUrl;
exports.fetchUrl = fetchUrl;
