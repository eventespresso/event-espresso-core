jQuery(document).ready(function($) {

	$.ajaxSetup ({ cache: false });

	// clear firefox and safari cache
	$(window).unload( function() {}); 
	


	$('#entries-per-page-slct').change( function() {
		var per_page = $(this).val();
		$('#per_page').val( per_page );
		$('#registrations-overview-frm').submit();
	}); 

	var dates = $( "#reg-filter-start-date" ).datepicker({
		defaultDate: "-1m",
		changeMonth: true,
		//numberOfMonths: 3,
		onSelect: function( selectedDate ) {
			var option = this.id == "reg-filter-start-date" ? "minDate" : "maxDate",
				instance = $( this ).data( "datepicker" ),
				date = $.datepicker.parseDate(
					instance.settings.dateFormat ||
					$.datepicker._defaults.dateFormat,
					selectedDate, instance.settings );
			dates.not( this ).datepicker( "option", option, date );
		}
	});

	var dates = $( "#reg-filter-end-date" ).datepicker({
		//defaultDate: "-1m",
		changeMonth: true,
		//numberOfMonths: 3,
		onSelect: function( selectedDate ) {
			var option = this.id == "reg-filter-start-date" ? "minDate" : "maxDate",
				instance = $( this ).data( "datepicker" ),
				date = $.datepicker.parseDate(
					instance.settings.dateFormat ||
					$.datepicker._defaults.dateFormat,
					selectedDate, instance.settings );
			dates.not( this ).datepicker( "option", option, date );
		}
	});




	
	$( '.reg-admin-attendee-questions-input-td' ).each(function() {
		$(this).find('input').prop( 'disabled', true );
	});	
	
	$('#reg-admin-attendee-questions-frm').on( 'click', '.reg-admin-edit-attendee-question-lnk', function(e) {
		e.preventDefault();
		$(this).closest('table').find('.reg-admin-attendee-questions-input-td' ).each(function() {
			$(this).removeClass('disabled-input');
			$(this).find('input').prop( 'disabled', false ).addClass('editable-input');
		});	
	});
	
	$('#reg-admin-attendee-questions-frm').on( 'change', '.editable-input', function(e) {
		$(this).removeClass('editable-input').addClass('edited-input');
		var edit_lnk = $(this).closest('table').find('.reg-admin-edit-attendee-question-td' ).html();
		var edit_lnk = '<span class="reminder-spn">' + eei18n.update_att_qstns + '<span><span class="hidden">' + edit_lnk + '<span>';
		$(this).closest('table').find('.reg-admin-edit-attendee-question-td' ).html( edit_lnk );
		$('#reg-admin-attendee-questions-submit').prop( 'disabled', false );
	});


});


