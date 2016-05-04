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
			if( typeof select2_args.ajax !== 'undefined' ) {
				if( typeof select2_args.ajax.data !== 'undefined' ) {
					var function_name_or_declaration = select2_args.ajax.data;
					var function_named = window[ function_name_or_declaration ];
					if( typeof function_named === 'function' ) {
						select2_args.ajax.data = function_named;
					}
				}
				if( typeof select2_args.ajax.processResults !== 'undefined' ) {
					var function_name_or_declaration = select2_args.ajax.processResults;
					var function_named = window[ function_name_or_declaration ];
					if( typeof function_named === 'function' ) {
						select2_args.ajax.processResults = function_named;
					}
				}
			}
			var input = jQuery( '#' + select2_input_id ).select2( select2_args );
		});
	}
});

function ee_default_process_results_for_ee4_rest_api( data, params ){
	formatted_results = [];
	for( var i=0; i<data.length; i++ ) {
		formatted_results.push(
			{
				id: data[i].EVT_ID, 
				text: data[i].EVT_name
			}
		);
	}
	params.page = params.page || 1;

	return {
	  results: formatted_results,
	  pagination: {
		more: (params.page * 30) < data.total_count
	  }
	};
}

function ee_default_data_from_ee4_rest_api( data, params ) {
	return { 
		EVT_name:'thing', 
		limit: 10 };
}