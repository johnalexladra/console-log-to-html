'use strict';

try {
	window.onerror = function(message, source, line, col, error) {
		var text = error ? error.stack || error : message + ' (at ' + source + ' : ' + line + ' : ' + col + ')';
		errors.textContent += text + '\n';
		errors.style.display = '';
	};
	console.error = (function(old) {
		return function error() {
		errors.textContent += Array.prototype.slice.call(arguments).join(' ') + '\n';
		errors.style.display = '';
		old.apply(this, arguments);
	}
	})(console.error);
	(function () {
		if (!console) {
			console = {};
		}
		var old = console.log;
		console.log = function (message) {
			if (typeof message == 'object') {
				logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
				logger.style.display = '';
			} else {
				logger.innerHTML += message + '<br />';
				logger.style.display = '';
			}
		}
	})();
	} catch(err) {
		document.getElementById("errors").innerHTML = err.message;
}


