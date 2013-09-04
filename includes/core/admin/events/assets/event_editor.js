jQuery(document).ready(function($) {
	
	window.onbeforeunload = function(){
		var mce = typeof(tinymce) != 'undefined' ? tinymce.activeEditor : false, title, content;

		if ( mce && !mce.isHidden() ) {
			if ( mce.isDirty() )
				return UNSAVED_DATA_MSG.eventmsg;
		} else {
			if ( fullscreen && fullscreen.settings.visible ) {
				title = $('#wp-fullscreen-title').val() || '';
				content = $("#wp_mce_fullscreen").val() || '';
			} else {
				title = $('#post #title').val() || '';
				content = $('#post #content').val() || '';
			}

			if ( ( title || content ) && title + content != autosaveLast )
				return UNSAVED_DATA_MSG.eventmsg;
		}

		if ( UNSAVED_DATA_MSG.inputChanged )
			return UNSAVED_DATA_MSG.eventmsg;
	};

	// setup our listeners for change on inputs in registered autosave containers so we know to trigger EE_INPUT_CHANGED
	$.each(EE_AUTOSAVE_IDS, function(i, v) {
		$('input', '#' + v).on('change', function() {
			UNSAVED_DATA_MSG.inputChanged = 1;
		});
	});

});
