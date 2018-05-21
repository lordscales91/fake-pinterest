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
	wrapObject: function(obj, fields, options) {
		var itemObj = {};
		// console.log('Object keys: '+Object.keys(obj));
		// console.log('Constructor: '+obj.constructor);
		Object.keys(obj).forEach(prop => {
			if(!fields || fields && fields.indexOf(prop) > -1) {
				var val = obj[prop];
				if(options && options.formatId && prop === options.formatId) {
					val = this.formatId(val);
				}
				itemObj[prop] = val;
			}
		});
		return itemObj;
	},
	wrapInData: function(obj, fields, options) {
		var dataObj = {};
		if(options && options.isCollection) {
			dataObj =  [];
			obj.forEach(item => {
				dataObj.push(this.wrapObject(item, fields, options));
			});
		} else {
			dataObj = this.wrapObject(obj, fields, options);
		}
		var result = {data: dataObj};
		if(options && options.pagination) {
			result.page = pagination;
		}
		return result;
	}
};