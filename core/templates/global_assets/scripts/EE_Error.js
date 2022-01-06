jQuery(document).ready(function($) {

	const $message = $('#ee-error-message');
	const $notices = $('#espresso-notices');
	const $body = $('body');

	let target;

	if ($message.length) {
		if ($notices.length) {
			target = $notices;
		} else if ( $('#screen-meta-links').length ) {
			target = $('#screen-meta-links');
		} else if ( $('#wpbody-content').length ) {
			target = $('#wpbody-content');
		} else {
			target = {};
		}

		if (target.length) {
			$(target).html($message).css(
				{
					'position': 'relative',
					'top': 0, 'left': 0,
					'margin': '3em 1em 0 0',
					'z-index': 5
				}
			);
		}
		//set from wp_localize_script in php
		if( ee_settings.wp_debug !== '1' ) {
			$( '.ee-error-trace-dv').hide();
		}

        $body.on( 'click', '.display-ee-error-trace-lnk', function(e) {
			e.preventDefault();
			e.stopPropagation();
			const traceTable = '#' + $(this).attr('rel') +'-dv';
			$( traceTable ).slideToggle();
		});

	}


	$('.dismiss-ee-nag-notice').click(function(event) {
		const nag_notice = $(this).data('target');
		if ( $('#'+nag_notice).length ) {
			event.preventDefault();
			$.ajax({
				type: "POST",
				url:  ee_dismiss.ajax_url,
				dataType: "json",
				data: {
					action : 'dismiss_ee_nag_notice',
					ee_nag_notice: nag_notice,
					return_url: ee_dismiss.return_url,
					noheader : 'true',
                    ee_admin_ajax: true
				},
				beforeSend: function() {
					window.do_before_admin_page_ajax();
				},
				success: function( response ){
					if ( typeof(response.errors) !== 'undefined' && response.errors !== '' ) {
						console.log( response );
						window.show_admin_page_ajax_msg( response );
					} else {
						$('#espresso-ajax-loading').fadeOut('fast');
						$('#'+nag_notice).fadeOut('fast');
					}
				},
				error: function() {
					$('#'+nag_notice).fadeOut('fast');
					const msg = {};
					msg.errors = ee_dismiss.unknown_error;
					console.log( msg );
					window.show_admin_page_ajax_msg( msg );
				}
				});
		}
	});

});
