jQuery(document).ready(function($) {

	$.ajaxSetup ({ cache: false });

	// clear firefox and safari cache
	$(window).on("unload", function() {});

	$('#reg-admin-attendee-questions-submit').prop( 'disabled', true );


	/**
	 * datepicker functionality?
	 */
	// if datepicker function exists
	if ( $.fn.datepicker ) {
		// activate datepicker fields
		$( '.datepicker' ).datepicker({
			changeMonth: true,
			changeYear: true,
			yearRange: "-80:+20"
		});
	}


	$('#entries-per-page-slct').change( function() {
		var per_page = $(this).val();
		$('#per_page').val( per_page );
		$('#registrations-overview-frm').submit();
	});


	$( '.question-group-questions, .reg-admin-attendee-questions-input-td' ).each(function() {//also select deprecated .reg-admin-attendee-questions-input-td
		$(this).find('input').prop( 'disabled', true );
		$(this).find('select').prop( 'disabled', true );
		$(this).find('textarea').prop( 'disabled', true );
	});

	$('#reg-admin-attendee-questions-frm').on( 'click', '.reg-admin-edit-attendee-question-lnk', function(e) {
		e.preventDefault();
		$(this).closest('table.question-group-questions').find('td, .reg-admin-attendee-questions-input-td' ).each(function() {//also select deprecated .reg-admin-attendee-questions-input-td
			$(this).removeClass('disabled-input');
			$(this).find('input').prop( 'disabled', false ).addClass('editable-input');
			$(this).find('select').prop( 'disabled', false ).addClass('editable-input');
			$(this).find('textarea').prop( 'disabled', false ).addClass('editable-input');
		});
		$('#reg-admin-attendee-questions-submit').prop( 'disabled', false );
	});

	$('#reg-admin-attendee-questions-frm').on( 'change', '.editable-input', function(e) {
		$(this).removeClass('editable-input').addClass('edited-input');
		var edit_lnk = $(this).closest('table').find('.reg-admin-edit-attendee-question-td' ).html();
		edit_lnk = '<span class="reminder-spn">' + eei18n.update_att_qstns + '<span><span class="hidden">' + edit_lnk + '<span>';
		$(this).closest('table').find('.reg-admin-edit-attendee-question-td' ).html( edit_lnk );
	});


	$('#wpcontent').on('click', '.ee-more-datetimes-toggle', function(e){
	    e.preventDefault();
		$(this).toggleClass('open');
		$(this).next('.more-items').toggleClass('hidden').slideToggle();
    });



	/**
	 * catch the Check-in status triggers
	 * @return string (new html for checkin)
	 */
	$('.trigger-checkin', '#the-list').on('click', function() {
		const itemdata = $(this).data();
		const thisitem = $(this);
		const data = {
			_regid : itemdata._regid,
			dttid : itemdata.dttid,
			checkinnonce : itemdata.nonce,
			ee_admin_ajax : true,
			action : 'toggle_checkin_status',
			page : 'espresso_registrations'
		};

		const setup = {
			where: '#ajax-notices-container',
			what: 'clear'
		};

		$.ajax({
			type: "POST",
			url: ajaxurl,
			data: data,
			success: function( response, status, xhr ) {
				const ct = xhr.getResponseHeader("content-type") || "";
					if (ct.indexOf('html') > -1) {
						$(setup.where).html(response);
					}

					if (ct.indexOf('json') > -1 ) {
						const resp = response,
						content = resp.error ? resp.error : resp.content;
						if ( resp.error ) {
							$(setup.where).html(content);
						} else {
							$(setup.where).html(resp.notices);
							$('.espresso-notices').show();
							thisitem.find('.dashicons').attr('class', content);
						}
					}
			}
		});
		return false;
	});

	//validation
	try {
		$('#post').validate({
			invalidHandler: function( event, validator ) {
				//toggle the wpjs indicators
				$('.spinner').hide();
				$('#publish').removeClass('button--primary-disabled');
			}
		});/**/
	} catch(err) {
		//won't do anything just wanna make sure .validate only runs when the jQuery validate plugin is present
	}

	$('#js-ee-hide-expired-events').click( function() {
		$('#event_id').toggleClass('ee-hide-expired-events');
		// if ($(this).prop('checked')) {
		// 	$('#event_id').addClass('ee-hide-expired-events');
		// } else {
		// 	$('#event_id').removeClass('ee-hide-expired-events');
		// }
	});
	$('#js-ee-hide-upcoming-events').click( function() {
		$('#event_id').toggleClass('ee-hide-upcoming-events');
		// if ($(this).prop('checked')) {
		// 	$('#event_id').addClass('ee-hide-upcoming-events');
		// } else {
		// 	$('#event_id').removeClass('ee-hide-upcoming-events');
		// }
	});
	$('#event_id').change(function () {
		$('#DTT_ID').val(0);
		this.form.submit();
	});
	$('#DTT_ID').change(function () {
		this.form.submit();
	});
});

/**
 * hide unnecessary ui elements when viewing attendee details cpt route.
 */
jQuery('#post-status-display').parent().hide();
jQuery('#visibility').hide();
if ( typeof(ATTENDEE_DETAILS) !== 'undefined' )
	jQuery('#timestamp').html(ATTENDEE_DETAILS.att_publish_text);
