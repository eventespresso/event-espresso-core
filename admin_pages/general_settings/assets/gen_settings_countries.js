jQuery(document).ready(function($) {

	// create object to hold our methods
	var EE_CNT_STA;

	/**
	 * @namespace EE_CNT_STA
	 * @type {{
		 *     country: object,
		 *     settings_event_form: object
		 *     ajax_loading: bool
	 * }}
	 * @namespace eei18n
	 * @type {{
		 *     ajax_url: string,
		 *     confirm_delete_state: string,
		 *     invalid_server_response: string,
		 *     error_occurred: string
		 * }}
	 */
	EE_CNT_STA = {


		country : {},
		settings_event_form : {},
		ajax_loading : false,



		/**
		 * @function init
		 */
		init : function () {
			EE_CNT_STA.country = $('#country');
			EE_CNT_STA.settings_event_form = $('#update_country_settings_event_form');
			// set listeners
			EE_CNT_STA.set_listener_for_change_country();
			EE_CNT_STA.set_listener_for_add_new_state();
			EE_CNT_STA.set_listener_for_delete_state();
			// get the ball rolling on page load
			EE_CNT_STA.country.trigger( 'change' );
		},



		/**
		 * @function set_listener_for_change_country
		 */
		set_listener_for_change_country : function () {
			// select a new country ?
			EE_CNT_STA.country.on( 'change', function(){
				EE_CNT_STA.ajax_loading = true;
				var CNT_ISO = $( this ).val();
				if ( typeof( CNT_ISO ) !== 'undefined' && CNT_ISO !== '' ) {
					EE_CNT_STA.get_country_details( CNT_ISO );
					EE_CNT_STA.get_country_states( CNT_ISO );
				}
			});
		},



		/**
		 * @function set_listener_for_add_new_state
		 */
		set_listener_for_add_new_state : function () {
			// add new state
			EE_CNT_STA.settings_event_form.on( 'click', '#add-new-state-btn', function( e ){
				e.preventDefault();
				e.stopPropagation();
				EE_CNT_STA.add_new_state();
			});
		},



		/**
		* @function set_listener_for_delete_state
		*/
		set_listener_for_delete_state : function () {
			// delete state
			EE_CNT_STA.settings_event_form.on( 'click', '.delete-state-lnk', function( e ){
				e.preventDefault();
				e.stopPropagation();
				var urlParams = $(this).eeGetParams();
				if ( confirm( eei18n.confirm_delete_state )) {
					// console.log( urlParams );
					var CNT_ISO = typeof( urlParams.CNT_ISO ) !== 'undefined' && urlParams.CNT_ISO !== '' ? urlParams.CNT_ISO : '';
					var STA_ID = typeof( urlParams.STA_ID ) !== 'undefined' && urlParams.STA_ID !== '' ? urlParams.STA_ID : '';
					var STA_abbrev = typeof( urlParams.STA_abbrev ) !== 'undefined' && urlParams.STA_abbrev !== '' ? urlParams.STA_abbrev : '';
					EE_CNT_STA.delete_state( CNT_ISO, STA_ID, STA_abbrev );
				}
			});
		},




		/**
		 * @function get_country_details
		 * retrieves country details form based on country selected from main dropdown
		 */
		get_country_details : function ( CNT_ISO ) {
			// post data to be sent
			var formData = {
                page: 'espresso_general_settings',
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
					if ( typeof(response.return_data) !== 'undefined' && response.return_data !== false && response.return_data !== null ) {
						if ( EE_CNT_STA.ajax_loading === false ) {
							$('#espresso-ajax-loading').fadeOut('fast');
						}
						$('#country-details-dv').html( response.return_data );
						EE_CNT_STA.ajax_loading = false;
					} else if ( response.errors ) {
						show_admin_page_ajax_msg( response );
					} else {
						response.errors = eei18n.invalid_server_response + ' <span class="smaller-text">get_country_details</span>';
						show_admin_page_ajax_msg( response );
					}
				},
				error: function(response) {
					//console.log(response);
					if ( typeof(response.errors) === 'undefined' ) {
						response.errors = eei18n.error_occurred;
					}
					show_admin_page_ajax_msg( response );
				}
			});
		},



		/**
		 * @function get_country_states
		 * retrieves list of states as a form based on country selected from main dropdown
		 */
		get_country_states : function( CNT_ISO ) {
			// post data to be sent
			var formData = {
                page: 'espresso_general_settings',
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
					if ( typeof response.errors !== 'undefined' && response.errors !== '' ) {
						show_admin_page_ajax_msg( response );
					} else if ( typeof(response.return_data) !== 'undefined' && response.return_data !== false && response.return_data !== null ) {
						if ( EE_CNT_STA.ajax_loading === false ) {
							$('#espresso-ajax-loading').fadeOut('fast');
						}
						$('#country-states-dv').html( response.return_data );
						EE_CNT_STA.ajax_loading = false;
					} else {
						response.errors = eei18n.invalid_server_response + ' <span class="smaller-text">get_country_states</span>';
						show_admin_page_ajax_msg( response );
					}
				},
				error: function(response) {
					//console.log(response);
					if ( typeof(response.errors) === 'undefined' ) {
						response.errors = eei18n.error_occurred;
					}
					show_admin_page_ajax_msg( response );
				}
			});

		},



		/**
		 * @function add_new_state
		 * adds new state to currently selected country then re-retrieves list of states
		 */
		add_new_state : function () {
			// post data to be sent
			var formData = {
                page: 'espresso_general_settings',
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
					if ( typeof response.errors !== 'undefined' && response.errors !== '' ) {
						show_admin_page_ajax_msg( response );
					} else if ( typeof(response.return_data) !== 'undefined' && response.return_data !== false && response.return_data !== null ) {
						EE_CNT_STA.get_country_states( response.return_data );
						show_admin_page_ajax_msg( response );
					} else {
						response.errors = eei18n.invalid_server_response + ' <span class="smaller-text">add_new_state</span>';
						show_admin_page_ajax_msg( response );
					}
				},
				error: function(response) {
					//console.log(response);
					if ( typeof(response.errors) === 'undefined' ) {
						response.errors = eei18n.error_occurred;
					}
					show_admin_page_ajax_msg( response );
				}
			});
		},



		/**
		 * @function delete_state
		 * deletes state from currently selected country
		 */
		delete_state : function( CNT_ISO, STA_ID, STA_abbrev ) {

			CNT_ISO = typeof(CNT_ISO) !== 'undefined' && CNT_ISO !== '' ? CNT_ISO : '';
			STA_ID = typeof(STA_ID) !== 'undefined' && STA_ID !== '' ? STA_ID : '';
			STA_abbrev = typeof(STA_abbrev) !== 'undefined' && STA_abbrev !== '' ? STA_abbrev : '';

			if ( CNT_ISO === '' || STA_ID === '' || STA_abbrev === '' ) {
				response.errors = eei18n.error_occurred;
				show_admin_page_ajax_msg( response );
				return false;
			}
			// post data to be sent
			var formData = {
                page: 'espresso_general_settings',
				action: 'espresso_delete_state',
				CNT_ISO: CNT_ISO,
				STA_ID: STA_ID,
				STA_abbrev: STA_abbrev,
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
					console.log(response);
					if ( typeof response.errors !== 'undefined' && response.errors !== '' ) {
						show_admin_page_ajax_msg( response, '' );
					} else if ( typeof(response.success) !== 'undefined' && response.success !== '' ) {
						var row_to_delete = '#state-' + STA_ID + '-tr';
						$( row_to_delete ).fadeOut().delay(500).remove();
						$('#espresso-ajax-loading').fadeOut('fast');
						show_admin_page_ajax_msg( response );
					} else {
						response.errors = eei18n.invalid_server_response + ' <span class="smaller-text">delete_state</span>';
						show_admin_page_ajax_msg( response );
					}
				},
				error: function(response) {
					//console.log(response);
					if ( typeof(response.errors) === 'undefined' ) {
						response.errors = eei18n.error_occurred;
					}
					show_admin_page_ajax_msg( response );
				}
			});
		}

	};

	EE_CNT_STA.init();

});