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
});
