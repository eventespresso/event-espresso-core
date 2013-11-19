jQuery(document).ready(function($) {
	var current_tour = 0;
	var tour_stop_cache = 0;
	var last_tour_stop = EE_HELP_TOUR.tours.length-1;
	var do_postride = true;
	var joyridepostride = function(joyride_index,current_tip) {
		v = EE_HELP_TOUR.tours[current_tour];
		$('#' + v.id).joyride("destroy");

		//check if we've ever had our final stop tour run
		if ( $.cookie(EE_HELP_TOUR.tours[last_tour_stop].id) === null ) {
			tour_stop_cache = current_tour+1;
			current_tour = last_tour_stop;
		} else {
			current_tour = tour_stop_cache > 0 ? tour_stop_cache : current_tour++;
		}
		joyridestart();
	};


	var joyridestart = function() {
		v = typeof(EE_HELP_TOUR.tours[current_tour]) !== 'undefined' ? EE_HELP_TOUR.tours[current_tour] : null;

		if ( v === null ) {
			//rewind current_tour
			current_tour--;
			return;
		}

		/**
		 * verify callbacks before sending to joyride.
		 */
		if ( typeof v.options.postExposeCallback !== 'undefined' && typeof window[v.options.postExposeCallback] !== 'function' )
			v.options.postExposeCallback = $.noop;
		if ( typeof v.options.preRideCallback !== 'undefined' && typeof window[v.options.preRideCallback] !== 'function' )
			v.options.preRideCallback = $.noop;
		if ( typeof v.options.postRideCallback !== 'undefined' && typeof window[v.options.postRideCallback] !== 'function' )
			v.options.postRideCallback = $.noop;
		if ( typeof v.options.preStepCallback !== 'undefined' && typeof window[v.options.preStepCallback] !== 'function' )
			v.options.preStepCallback = $.noop;
		if ( typeof v.options.postStepCallback !== 'undefined' && typeof window[v.options.postStepCallback] !== 'function' )
			v.options.postStepCallback = $.noop;

		if ( do_postride )
			v.options.postRideCallback = joyridepostride; //note this overrides any existing callback set for postride.  If we come into cases where we need to set a callback for post ride then this will have to be modified.

		$('#' + v.id).joyride(v.options);
	};

	//if we've got an EE_HELP_TOUR object then we can loop through it to get the stuff needed for the joyride and kick it off.
	$(window).load(function() {
		//check if they've been here if they have then let's skip to the next tour (if exists)
		if ( $.cookie(EE_HELP_TOUR.tours[current_tour].id) !== null )
			current_tour++;
		joyridestart();
	});


	//add triggers for restarting the tour
	$(document).on('click', '.trigger-ee-help-tour', function() {
		$('#contextual-help-link').trigger('click');

		//destroy current joyride
		$('#' + EE_HELP_TOUR.tours[current_tour].id).joyride("destroy");
		var tourid = $(this).attr('id').replace('trigger-tour-', '');
		var options;
		$.each(EE_HELP_TOUR.tours, function( i, v ) {
			if ( v.id == tourid ) {
				//set cookieMonster to false for this option
				EE_HELP_TOUR.tours[i].options.cookieMonster = false;
				//make sure we don't do the postride callback
				do_postride = false;
				options = i;
			}
		});
		current_tour = options;
		joyridestart();
	});
});