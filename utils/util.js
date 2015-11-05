exports.massageReturn = function(result, callback) {
	var data = [];
	for (var j = 0; j < result.data.length; j++) {
		var element = result.data[j];
		var row = {};
		for (var i = 0; i < element.length; i++) {

			row[result.columns[i]] = element[i];
		}
		data.push(row);
	}
	callback(data);
};

exports.getDayOfweek = function(day) {
	if (day === 0) {
		return 'sunday';
	} else if (day === 1) {
		return 'monday';
	} else if (day === 2) {
		return 'tuesday';
	} else if (day === 3) {
		return 'wednesday';
	} else if (day === 4) {
		return 'thursday';
	} else if (day === 5) {
		return 'friday';
	} else if (day === 6) {
		return 'saturday';
	}
};

function formatHour(date) {
	var hour = '0' + date.getHours();
	var minutes = '0' + date.getMinutes();
	if (hour.length === 3) {
		hour = hour.substring(1, 3);
	}
	if (minutes.length === 3) {
		minutes = minutes.substring(1, 3);
	}
	return hour + minutes + '00';
}

exports.modifyDate = function modifyDate(currentDate, minutesToChange) {
	var modifiedDate = new Date(currentDate.getTime() + (1000 * (60 * minutesToChange)));
	var formatedModifiedDate = formatHour(modifiedDate);
	return formatedModifiedDate;
};