jQuery(document).ready(function($) {

	var ajax_loading = false;


	// create object to hold our methods 
	EE_CNT_STA = {		
		
		// ------------------------------------------
		// get_coutry_details
		// retreives country details form based on country selected from main dropdown
		// ------------------------------------------
		get_coutry_details : function ( CNT_ISO ) {
			// post data to be sent
			var formData = {
				action: 'espresso_display_country_settings',
				country: CNT_ISO,
				noheader : 'true',
				ee_admin_ajax : true
			};			
			// console.log( JSON.stringify( formData, null, 4 ));
			$.ajax({
				type: "POST",
				url:  eei18n.ajax_url,
				data: formData,
				dataType: 'json',
				beforeSend: function() {
					do_before_admin_page_ajax();
				},
				success: function( response ) {
					// console.log(response);
					if ( response.return_data != undefined && response.return_data != false && response.return_data != null ) {
						if ( ajax_loading == false ) {
							$('#espresso-admin-page-ajax-loading').fadeOut('fast');
						}					
						$('#country-details-dv').html( response.return_data );					
						ajax_loading = false;
					} else if ( response.errors ) {
						show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2' );
					} else {
						response.errors = eei18n.invalid_server_response;
						show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2', true );
					}
				},
				error: function(response) {
					//console.log(response);
					if ( response.errors == undefined ) {
						response.errors = eei18n.error_occurred;
					}
					show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2', true );
				}
			});					
		},
	
		// ------------------------------------------
		// get_country_states
		// retreives list of states as a form based on country selected from main dropdown
		// ------------------------------------------
		get_country_states : function( CNT_ISO ) {
			// post data to be sent
			var formData = {
				action: 'espresso_display_country_states',
				country: CNT_ISO,
				ee_admin_ajax : true,
				noheader : 'true'
			};
			
			//console.log( JSON.stringify( formData, null, 4 ));
			$.ajax({
				type: "POST",
				url:  eei18n.ajax_url,
				data: formData,
				dataType: 'json',
				beforeSend: function() {
					do_before_admin_page_ajax();
				},
				success: function( response ) {
					//console.log(response);
					if ( response.return_data != undefined && response.return_data != false && response.return_data != null ) {
						if ( ajax_loading == false ) {
							$('#espresso-admin-page-ajax-loading').fadeOut('fast');
						}					
						$('#country-states-dv').html( response.return_data );
						ajax_loading = false;
					} else if ( response.errors ) {
						show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2' );					 
					} else {
						response.errors = eei18n.invalid_server_response;
						show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2', true );
					}
				},
				error: function(response) {
					//console.log(response);
					if ( response.errors == undefined ) {
						response.errors = eei18n.error_occurred;
					}
					show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2', true );
				}
			});
					
		},
		
		
		// ------------------------------------------
		// add_new_state
		// adds new state to currently selected country then re-retreives list of states
		// ------------------------------------------
		add_new_state : function () {			
			// post data to be sent
			var formData = {
				action: 'espresso_add_new_state',
				CNT_ISO: $('#country').val(),
				STA_abbrev: $('#STA_abbrev-XXX').val(),
				STA_name: $('#STA_name-XXX').val(),
				ee_admin_ajax: true,
				noheader : 'true'				
			};			
			//console.log( JSON.stringify( formData, null, 4 ));
			$.ajax({
				type: "POST",
				url:  eei18n.ajax_url,
				data: formData,
				dataType: 'json',
				beforeSend: function() {
					do_before_admin_page_ajax();
				},
				success: function( response ) {
					//console.log(response);
					if ( response.return_data != undefined && response.return_data != false && response.return_data != null ) {
						EE_CNT_STA.get_country_states( response.return_data );
					} else if ( response.errors ) {
						show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2' );					 
					} else {
						response.errors = eei18n.invalid_server_response;
						show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2', true );
					}
				},
				error: function(response) {
					//console.log(response);
					if ( response.errors == undefined ) {
						response.errors = eei18n.error_occurred;
					}
					show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2', true );
				}
			});					
		},
			
		
		// ------------------------------------------
		// delete_state
		// adds new state to currently selected country then re-retreives list of states
		// ------------------------------------------
		delete_state : function( STA_ID ) {
			if ( STA_ID == undefined || STA_ID == NaN || STA_ID == '' ) {
				response.errors = eei18n.error_occurred;
				show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2', true );
				return false;
			}
			// post data to be sent
			var formData = {
				action: 'espresso_delete_state',
				STA_ID: STA_ID,
				ee_admin_ajax : true,
				noheader : 'true'				
			};			
			//console.log( JSON.stringify( formData, null, 4 ));
			$.ajax({
				type: "POST",
				url:  eei18n.ajax_url,
				data: formData,
				dataType: 'json',
				beforeSend: function() {
					do_before_admin_page_ajax();
				},
				success: function( response ) {
					//console.log(response);
					if ( response.return_data != undefined && response.return_data != false && response.return_data != null ) {
						var row_to_delete = '#state-' + STA_ID + '-tr';
						$( row_to_delete ).fadeOut().delay(500).remove();
						$('#espresso-admin-page-ajax-loading').fadeOut('fast');				
					} else if ( response.errors ) {
						show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2' );					 
					} else {
						response.errors = eei18n.invalid_server_response;
						show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2', true );
					}
				},
				error: function(response) {
					//console.log(response);
					if ( response.errors == undefined ) {
						response.errors = eei18n.error_occurred;
					}
					show_admin_page_ajax_msg( response, '.admin-modal-dialog-h2', true );
				}
			});					
		}
	
	};



	// select a new country ?
	$('#country').on( 'change', function(){
		ajax_loading = true;
		var CNT_ISO = $( this ).val();
		if ( CNT_ISO != undefined && CNT_ISO != '' ) {
			EE_CNT_STA.get_coutry_details( CNT_ISO );
			EE_CNT_STA.get_country_states( CNT_ISO );
		}
	});


	// add new state
	$('#update_country_settings_event_form').on( 'click', '#add-new-state-btn', function( e ){
		e.preventDefault();
		e.stopPropagation();
		EE_CNT_STA.add_new_state();
	});


	// delete state
	$('#update_country_settings_event_form').on( 'click', '.delete-state-lnk', function( e ){
		e.preventDefault();
		e.stopPropagation();
		if ( confirm( eei18n.confirm_delete_state )) {
			EE_CNT_STA.delete_state( $(this).attr('rel') );
		}
	});


	// get the ball rolling on page load
	$('#country').trigger( 'change' );

	

});