var methods = {
	slugify: slugify,
	unSlugify: unSlugify
};

function slugify(text) {
	text = text.trim();
	text = text.toLowerCase().replace(/[^\w\s]|[_]|[)]/g, "").replace(/\s/g, '-');
	return text;
}

function unSlugify(text) {
	text = text.replace('-', ' ');
	text = _capitalizeFirst(text);
	return text;
}

function _capitalizeFirst(text) {
	var str = text.split(' ');
	for (var i = 0; i < str.length; i++) {
		var word = str[i];
		word = word.charAt(0).toUpperCase() + word.slice(1);
		str[i] = word;
	}
	str = str.join(' ');
	return str;
}

module.exports = methods;
    	