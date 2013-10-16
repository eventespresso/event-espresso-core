jQuery(document).ready(function($) {
	//if we've got an EE_HELP_TOUR object then we can loop through it to get the stuff needed for the joyride and kick it off.
	$(window).load(function() {
		$.each( EE_HELP_TOUR, function(i,v) {
			/**
			 * verify callbacks before sending to joyride.
			 */
			if ( typeof v[0].options.postExposeCallback !== 'undefined' && typeof window[v[0].options.postExposeCallback] !== 'function' )
				v[0].options.postExposeCallback = $.noop;
			if ( typeof v[0].options.preRideCallback !== 'undefined' && typeof window[v[0].options.preRideCallback] !== 'function' )
				v[0].options.preRideCallback = $.noop;
			if ( typeof v[0].options.postRideCallback !== 'undefined' && typeof window[v[0].options.postRideCallback] !== 'function' )
				v[0].options.postRideCallback = $.noop;
			if ( typeof v[0].options.preStepCallback !== 'undefined' && typeof window[v[0].options.preStepCallback] !== 'function' )
				v[0].options.preStepCallback = $.noop;
			if ( typeof v[0].options.postStepCallback !== 'undefined' && typeof window[v[0].options.postStepCallback] !== 'function' )
				v[0].options.postStepCallback = $.noop;

			$('#' + v[0].id).joyride(v[0].options);
		});
	});

	//add triggers for restarting the tour
	$(document).on('click', '.trigger-ee-help-tour', function() {
		$('#screen-meta').slideToggle();
		$('#screen-options-link-wrap').css('visibility', 'visible');
		var tourid = $(this).attr('id').replace('trigger-tour-', '');
		var options;
		$.each(EE_HELP_TOUR, function( i, v ) {
			if ( v[0].id == tourid )
				options = v[0].options;
		});
		//destroy initial joyride
		$('#' + tourid).joyride("destroy");
		//restart but with cookie set to false
		options.cookieMonster = false;
		$('#' + tourid).joyride(options);
	});
});