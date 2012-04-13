(function($) {

	$.ajaxSetup ({ cache: false });

	// clear firefox and safari cache
	$(window).unload( function() {}); 
	
	// close postboxes that should be closed
	$('.if-js-closed').removeClass('if-js-closed').addClass('closed');
	// postboxes setup
	//postboxes.add_postbox_toggles('event-espresso_page_venue-seating');

	$('#entries-per-page-slct').change( function() {
		var per_page = $(this).val();
		$('#per_page').val( per_page );
		$('#transaction-admin-page-filter').submit();
	}); 

	var dates = $( "#txn-filter-start-date" ).datepicker({
		defaultDate: "-1m",
		changeMonth: true,
		//numberOfMonths: 3,
		onSelect: function( selectedDate ) {
			var option = this.id == "txn-filter-start-date" ? "minDate" : "maxDate",
				instance = $( this ).data( "datepicker" ),
				date = $.datepicker.parseDate(
					instance.settings.dateFormat ||
					$.datepicker._defaults.dateFormat,
					selectedDate, instance.settings );
			dates.not( this ).datepicker( "option", option, date );
		}
	});

	var dates = $( "#txn-filter-end-date" ).datepicker({
		//defaultDate: "-1m",
		changeMonth: true,
		//numberOfMonths: 3,
		onSelect: function( selectedDate ) {
			var option = this.id == "txn-filter-start-date" ? "minDate" : "maxDate",
				instance = $( this ).data( "datepicker" ),
				date = $.datepicker.parseDate(
					instance.settings.dateFormat ||
					$.datepicker._defaults.dateFormat,
					selectedDate, instance.settings );
			dates.not( this ).datepicker( "option", option, date );
		}
	});


	$('.confirm-delete').click(function() {
		var what = $(this).attr('rel');
		var answer = confirm('Are you absolutely sure you want to delete this '+what+'?\nThis action will delete ALL DATA asscociated with this '+what+'!!!\nThis can NOT be undone!!!');
  		return answer;
	});

	$('.updated.fade').delay(5000).fadeOut();





})(jQuery);

