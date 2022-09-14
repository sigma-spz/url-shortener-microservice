

const urlValidator = (url) => {
    const validUrlRegex = /((http:\/\/)|(https:\/\/))((\w+\.)|(\w+))+/;
    console.log(url.match(validUrlRegex))
    if (!url.match(validUrlRegex))
	throw "Invalid url";
    fetch(url).then(
	response => {
	    if (!response.ok)
		throw "Invalid Hostname"
	}
    )
};


exports.urlValidator = urlValidator;
