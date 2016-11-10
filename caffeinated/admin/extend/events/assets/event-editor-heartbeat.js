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

});
