/* 
 * Hook into when the EE forms are initialized, and initialize the select2 inputs
 * indicated in the localized
 */
jQuery(document).bind( 'EEFV:initialize_specific_form', function(event, passed_in_args){
	if ( typeof passed_in_args.form_data !== 'undefined'
		&& typeof passed_in_args.form_data.other_data !== 'undefined'
		&& typeof passed_in_args.form_data.other_data.select2s !== 'undefined'
	) {
		//initialize each of these select2 inputs
		jQuery.each( passed_in_args.form_data.other_data.select2s , function( select2_input_id, select2_args ) {
			var input = jQuery( '#' + select2_input_id ).select2( select2_args );
		});
	}
});
