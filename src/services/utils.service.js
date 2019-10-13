'use strict';

exports.getModuleByUrl = (url) => {
	return url.replace('/api/', '').split('/')[0];
}