jQuery(document).ready(function($) {
	$( '.datepicker' ).datepicker({
		defaultDate: "-1m",
		numberOfMonths: 2,
		dateFormat: 'mm/dd/yy'
	});
});