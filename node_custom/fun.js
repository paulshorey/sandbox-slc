exports.hash_int = function(str) {
	str = str.replace(/[^A-Za-z0-9]/g, '');
	var hash = 0;
	if (str.length == 0) {
		return hash;
	}
	for (i = 0; i < str.length; i++) {
		char = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};

exports.hash_str = function(str) {
	// number
	str = str.replace(/[^A-Za-z0-9]/g, '');
	var hash = 0;
	if (str.length == 0) {
		return hash;
	}
	for (i = 0; i < str.length; i++) {
		char = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	// string
	return str.substr(0,40) + hash;
};

exports.hash_random = function(length) {
	length = parseInt(length);
	if (!length) {
		length = 11;
	}
	var text = "";
	var possible = "abcdefghijklmnopqrstuvwxyz";
	text += possible.charAt(Math.floor(Math.random() * possible.length));
	possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (i = 1; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

exports.to_query_string = function(obj) {
	var parts = [];
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
		}
	}
	return parts.join("&");
};

exports.trim = function(str){
	str = str.replace(/(^[^a-zA-Z0-9]*)|([^a-zA-Z0-9]*$)/g, '');
	return str;
};

exports.pad = function(str) {
	str = str.toString();
	var strlen = str.length || 1;
	return (strlen < 2 ? "0" + str : str);
};

exports.capitalize = function(str) {
	str = str.toLowerCase();
	return str.charAt(0).toUpperCase() + str.slice(1);
};

exports.decycle = function(a,b){"use strict";var c=[],d=[];return function a(e,f){var g,h;return void 0!==b&&(e=b(e)),"object"!=typeof e||null===e||e instanceof Boolean||e instanceof Date||e instanceof Number||e instanceof RegExp||e instanceof String?e:(g=c.indexOf(e),g>=0?{$ref:d[g]}:(c.push(e),d.push(f),Array.isArray(e)?(h=[],e.forEach(function(b,c){h[c]=a(b,f+"["+c+"]")})):(h={},Object.keys(e).forEach(function(b){h[b]=a(e[b],f+"["+JSON.stringify(b)+"]")})),h))}(a,"$")};

exports.shallow_copy = function(obj) {
	var out = {};
	for (var i in obj) {
		if (typeof obj[i]=='object' && obj[i]!=null) {
			out[i] = {};
		} else {
			out[i] = obj[i];
		}
	}
	return out;
};