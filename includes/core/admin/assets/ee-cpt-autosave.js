jQuery(document).ready(function($) {

	$(document).ajaxSend( function( e, x, a ) {
		var ee_autosave_data = {};
		//loop through the id containers and add the fields to the ee_autosave_data object.
		$.each( EE_AUTOSAVE_IDS, function(index, value) {
			ee_autosave_data[value] = $('#' + value).find(':input').serializeFullArray();
		});
		//console.log(ee_autosave_data);
		a.data += '&' + $.param( {ee_autosave_data : ee_autosave_data } );
	});

});