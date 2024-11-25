jQuery(document).ready(function($) {

	$.ajaxSetup ({ cache: false });

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
		const per_page = $(this).val();
		$('#per_page').val( per_page );
		$('#registrations-overview-frm').submit();
	});


    $('#reg-admin-attendee-questions-submit').on( 'click', function(e) {
        if (! confirm(eei18n.confirm_update_reg_details)) {
            e.preventDefault();
        }
    });


	$('#wpcontent').on('click', '.ee-more-datetimes-toggle', function(e){
	    e.preventDefault();
		$(this).toggleClass('open');
		$(this).parent().next('.more-items').slideToggle()
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
			invalidHandler: function() {
				//toggle the wpjs indicators
				$('.spinner').hide();
				$('#publish').removeClass('button--primary-disabled');
			}
		});/**/
	} catch(err) {
		//won't do anything just wanna make sure .validate only runs when the jQuery validate plugin is present
	}

	$('#js-ee-hide-expired-events').click( function() {
		$('#EVT_ID').toggleClass('ee-hide-expired-events');
	});
	$('#js-ee-hide-upcoming-events').click( function() {
		$('#EVT_ID').toggleClass('ee-hide-upcoming-events');
	});
	$('#EVT_ID').change(function () {
		$('#DTT_ID').val(0);
        $('#reg_datetime_id').val(0);
        $('#reg_event_id').val($(this).val());
	});
});

/**
 * hide unnecessary ui elements when viewing attendee details cpt route.
 */
jQuery('#post-status-display').parent().hide();
jQuery('#visibility').hide();
if ( typeof(ATTENDEE_DETAILS) !== 'undefined' )
	jQuery('#timestamp').html(ATTENDEE_DETAILS.att_publish_text);
