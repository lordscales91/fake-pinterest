var numeral = require('numeral');
const PASS_KEY = process.env.SECRET || 'secret';

let crypto;

try {
	crypto = require('crypto');
} catch(ex) {
	console.log('crypto is unavailable');
}

module.exports = {
	formatId: function(value) {
		if(!value) {
			return null;
		}
		return numeral(value).format('000000000000000000');
	},
	formatDate: function(value) {
		if(!value) {
			return null;
		}
		var val = new Date(value);
		var year = val.getFullYear();
		var month = val.getMonth();
		var day = val.getDate();
		var hours = val.getHours();
		var minutes = val.getMinutes();
		var seconds = val.getSeconds();
		return year+'-'+numeral(month).format('00')+'-'+numeral(day).format('00')
				+ 'T' + numeral(hours).format('00')+':'+numeral(minutes).format('00')
				+ ':' + numeral(seconds).format('00');
	},
	encodePassword: function(pass) {
		if(crypto) {
			hmac = crypto.createHmac('sha512', PASS_KEY);
			hmac.update(pass);
			return hmac.digest('hex');
		}
		return pass;
	},
	wrapInData: function(obj, fields, pagination) {
		var dataObj = {};
		Object.keys(obj).forEach(prop => {
			if(!fields || fields && fields.indexOf(prop) > -1) {
				dataObj[prop] = obj[prop];
			}
		});
		var result = {data: dataObj};
		if(pagination) {
			result.page = pagination;
		}
		return result;
	}
};