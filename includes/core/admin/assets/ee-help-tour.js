jQuery(document).ready(function($) {
	//if we've got an EE_HELP_TOUR object then we can loop through it to get the stuff needed for the joyride and kick it off.
	$.each( EE_HELP_TOUR, function(i,v) {
		$('#' + v.id).joyride(v.options);
	});
});