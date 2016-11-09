/**
 * Contains all the js code hooking into the WordPress heartbeat api in the event editor.
 */
/**  HEARTBEAT HOOKS **/
jQuery(document).ready(function($) {
	//hooking into the heartbeat send.
	$(document).on('heartbeat-send', function(e, data) {
		//get a count of all inputs on the page.
		data['input_count'] = $('input').length + $('select').length + $('textarea').length;
		data['ee_admin_ajax'] = true;
	});

	//Listen for the custom event "heartbeat-tick" on $(document).
	$(document).on( 'heartbeat-tick', function(e, data) {
		if ( ! data['max_input_vars_check'] ) {
            return;
        }
		//if no space left then let's show a dialog with the message.
		if ( ! data['max_input_vars_check'] !== '' ) {
			dialogHelper.displayModal().addContent( data['max_input_vars_check'] );
		}
	});
    // if the Address Information question group value changes
    $('[name="add_attendee_question_groups[2]"]').on('click', function() {
        // check if it's checked, and if so
        if ($(this).prop('checked')) {
            // then check off the Personal Information question group as well
            $('[name="add_attendee_question_groups[1]"]').prop('checked', true);
            // and display a notice
            $('#question-group-requirements-notice-pg').stop().slideDown(100);
        } else {
            // otherwise hide the notice
            $('#question-group-requirements-notice-pg').stop().slideUp(100);
        }
    });
    // if the Personal Information question group is clicked
    $('[name="add_attendee_question_groups[1]"]').on('click', function(e) {
        // check if the Address Information question group is checked
        if ($('[name="add_attendee_question_groups[2]"]').prop('checked')) {
            // and don't let this input be unchecked
            e.preventDefault();
            e.stopPropagation();
        }
    });

});
