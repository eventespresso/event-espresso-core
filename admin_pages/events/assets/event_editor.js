jQuery(document).ready(function($) {
	window.onbeforeunload = function(){
		if ( UNSAVED_DATA_MSG.inputChanged === 1 )
			return UNSAVED_DATA_MSG.eventmsg;
	};

	// setup our listeners for change on inputs in registered autosave containers so we know to trigger EE_INPUT_CHANGED
	$.each(EE_AUTOSAVE_IDS, function(i, v) {
		$('input', '#' + v).on('focus', function() {
			UNSAVED_DATA_MSG.inputChanged = 1;
		});
	});

	//make sure clicking the wp save draft/publish or update button resets our inputChanged var
	$('#submitdiv').on('click', '.button', function() {
		UNSAVED_DATA_MSG.inputChanged = 0;
	});
    /**
     * Capture timezone change submissions.
     */
    $('#message').on('click', '.timezone-submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.spinner','#message').addClass('is-active');
        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: {
                action: 'ee_save_timezone_setting',
                page: 'espresso_events',
                ee_admin_ajax: true,
                timezone_selected: $('#timezone_string').val()
            },
            success: function(response, status, xhr) {
                var ct = xhr.getResponseHeader("content-type") || "";
                if (ct.indexOf('json') > -1 ) {
                    if (response.success) {
                        window.location.reload(true);
                    }
                }
            },
            error: function(response, status, xhr) {
                $('.spinner', '#message').removeClass('is-active');
            }
        })
    });
});
