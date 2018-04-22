var numeral = require('numeral');

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
	}
};