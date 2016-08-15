jQuery(document).ready(function($) {

	/**
	 * @namespace EE_ANS
	 * @type {{
	 *		message: String(""),
	 *		initialize: Function,
	 *		set_listeners: Function,
	 *		display_add_new_state_form: Function,
	 *		submit_new_state: Function,
	 *		validate_new_state_data: Function,
	 *		process_new_state: Function,
	 *		add_option_to_dropdown: Function,
	 *		save_new_state_to_db: Function,
	 *		cancel_new_state: Function
	 * }}
	 * @namespace new_state
	 * @type {{
	 *     success: boolean,
	 *     id: number,
	 *     name: string,
	 *     abbrev: string,
	 *     country_iso: string,
	 *     country_name: string
	 * }}
	 * @namespace eei18n
	 * @type {{
	 *     ans_no_country: string,
	 *     ans_no_name: string,
	 *     ans_no_abbreviation: string,
	 *     ans_save_success: string,
	 *     ans_server_save_error: string
	 * }}
	 * @namespace response
	 * @type {{
	 *     error: string,
	 *     attention: string,
	 *     success: string
	 * }}
	 */
	var EE_ANS = {

		// notification to be displayed to user
		message : '',



		/**
		 * @function initialize
		 */
		initialize : function() {
			EE_ANS.set_listeners();
		},



		/**
		 * @function set_listeners
		 */
		set_listeners : function() {

			// disable state dropdown if adding a new state
			$('.ee-form-add-new-state-submit').click(function(e) {
				SPCO.enable_submit_buttons();
				EE_ANS.submit_new_state( $(this) );
				e.preventDefault();
				e.stopPropagation();
			});

			// disable state dropdown if adding a new state
			$('.ee-form-cancel-new-state-lnk').click(function(e) {
				SPCO.enable_submit_buttons();
				EE_ANS.cancel_new_state( $(this) );
				e.preventDefault();
				e.stopPropagation();
			});

			// display add new state microform
			$('.ee-form-add-new-state-lnk').click(function(e) {
				SPCO.disable_submit_buttons();
				EE_ANS.display_add_new_state_form( $(this) );
				e.preventDefault();
				e.stopPropagation();
			});

		},



		/**
		* @function display_add_new_state_form
		* @param  {object} display_add_new_state_button
		*/
		display_add_new_state_form : function( display_add_new_state_button ) {
			// get target element from "this" (the control element's) "data" attribute
			var add_new_state_dv = '#'+display_add_new_state_button.data('target') +'-dv';
			// find all input's and add css classes: required and needs-value
			$( add_new_state_dv ).find(':input').each( function() {
				$(this).addClass('required needs-value').trigger('change');
				$( add_new_state_dv ).slideDown();
			});
		},



		/**
		* @function submit_new_state
		* @param  {object} new_state_submit_button
		*/
		submit_new_state : function( new_state_submit_button ) {
			// get STATE ABBREV input id from "this" (the control element's) "data" attribute
			var new_state_target = new_state_submit_button.data( 'target' );
			// create id for new STATE NAME input
			var new_state_name_id = new_state_target.replace('new_state', 'nsmf_new_state_name');
			// create id for new STATE NAME input
			var new_state_abbrv_id = new_state_target.replace('new_state', 'nsmf_new_state_abbrv');
			// create id for new state COUNTRY input
			var new_state_country_id = new_state_target.replace('new_state', 'nsmf_new_state_country');
			// COUNTRY DETAILS
			var  new_state_country = $('#'+new_state_country_id);
			var  new_state_country_iso = new_state_country.children(':selected').val();
			//var  new_state_country_name = new_state_country.children(':selected').text();
			var new_state_name = $('#'+new_state_name_id).val();
			var new_state_abbrv = $('#'+new_state_abbrv_id).val();

			if ( EE_ANS.validate_new_state_data( new_state_country_iso, new_state_name, new_state_abbrv )) {
				// submit data via AJAX for db insertion
				EE_ANS.save_new_state_to_db( new_state_country_iso, new_state_name, new_state_abbrv, new_state_target );
			}
		},



		/**
		* @function validate_new_state_data
		* @param  {string} state_country_iso
		* @param  {string} state_name
		* @param  {string} state_abbrv
		*/
		validate_new_state_data : function( state_country_iso, state_name, state_abbrv ) {
			if ( typeof state_country_iso === 'undefined' || state_country_iso === '' ) {
				EE_ANS.message = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'Add New State: validate_new_state_data', eei18n.ans_no_country ), '' );
				SPCO.scroll_to_top_and_display_messages( SPCO.main_container, EE_ANS.message, true );
				return false;
			}
			if ( typeof state_name === 'undefined' || state_name === '' ) {
				EE_ANS.message = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'Add New State: validate_new_state_data', eei18n.ans_no_name ), '' );
				SPCO.scroll_to_top_and_display_messages( SPCO.main_container, EE_ANS.message, true );
				return false;
			}
			if ( typeof state_abbrv === 'undefined' || state_abbrv === '' ) {
				EE_ANS.message = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'Add New State: validate_new_state_data', eei18n.ans_no_abbreviation ), '' );
				SPCO.scroll_to_top_and_display_messages( SPCO.main_container, EE_ANS.message, true );
				return false;
			}
			return true;
		},



		/**
		 * @function process_new_state
		 * @param  {object} new_state
		 * @param  {string} new_state_target
		 */
		process_new_state : function( new_state, new_state_target ) {
			if ( typeof new_state.success !== 'undefined' && new_state.success === true ) {
				//SPCO.console_log( 'PROCESS_NEW_STATE', '', true );
				//SPCO.console_log_object( 'new_state', new_state, false );
				//SPCO.console_log_object( 'new_state_target', new_state_target, false );
				// TARGET INPUTS
				var state_select_id  = new_state_target.replace('new_state', 'state');
				var state_select_dv = state_select_id +'-dv';
				var country_select_id = new_state_target.replace('new_state', 'country');

				//SPCO.console_log( 'state_select_id', state_select_id, false );
				//SPCO.console_log( 'country_select_id', country_select_id, false );
				//SPCO.console_log_object( 'new_state', new_state, 0 );

				// find all inputs with country in the ID
				SPCO.main_container.find("select[id*='-country']").each( function() {
					var country_select_id_to_set = $(this).attr('id');
					var set_selected = country_select_id_to_set === country_select_id;

					//SPCO.console_log( 'PROCESS COUNTRY', true, true );
					//SPCO.console_log( 'country_select_id_to_set', country_select_id_to_set, false );
					//SPCO.console_log( 'set_selected', set_selected, false );

					// if country option already exists in Country dropdown
					var existing_country_iso = $(this).find('option[value="' + new_state.country_iso + '"]');
					if( existing_country_iso.size() > 0 ) {
						//SPCO.console_log( 'EXISTING_COUNTRY_ISO', existing_country_iso, false );
						if( set_selected ) {
							//SPCO.console_log( '>>> SET ' + new_state.country_iso + ' Country selected', country_select_id, false );
							$( '#' + country_select_id ).find( ':selected' ).prop( 'selected', false );
							existing_country_iso.prop( 'selected', true );
						}
					} else {
						EE_ANS.add_option_to_dropdown( country_select_id_to_set, new_state.country_iso, new_state.country_name, set_selected, '' );
					}
				});
				// find all inputs with state in the ID
				SPCO.main_container.find("select[id*='-state']").each( function() {
					var select_id = $(this).attr('id');
					//SPCO.console_log( 'PROCESS STATE', true, true );
					//SPCO.console_log( 'select_id', select_id, false );
					var set_selected = $(this).attr('id') === state_select_id;
					// set target select's value to this input's value
					EE_ANS.add_option_to_dropdown( select_id, new_state.id, new_state.name, set_selected, new_state.country_name );
				});
				var add_new_state = new_state_target.replace('new_state', 'add_new_state');
				$('#'+add_new_state).val('1');
				// hide the target's div container - use slideToggle or addClass
				$('#'+state_select_dv).slideToggle(250, function() {
					var display_lnk = new_state_target.replace('new_state', 'state');
					// display the control element that toggles display of this element
					$('#display-'+display_lnk).show().fadeIn(50);
				});
			}
		},



		/**
		 * @function add_option_to_dropdown
		 * @param  {string} target_id
		 * @param  {string} new_value
		 * @param  {string} new_text
		 * @param  {boolean} set_selected
		 * @param  {string} opt_group
		 */
		add_option_to_dropdown : function( target_id, new_value, new_text, set_selected, opt_group ) {

			new_text = typeof new_text !== 'undefined' && new_text !== '' ? new_text : new_value;
			new_value = typeof new_value !== 'undefined' && new_value !== '' ? new_value : new_text;
			opt_group = typeof opt_group !== 'undefined' && opt_group !== '' ? opt_group : '';

			//SPCO.console_log( 'ADD_OPTION_TO_DROPDOWN', '', true );
			//SPCO.console_log( 'new_text', new_text, false );
			//SPCO.console_log( 'new_value', new_value, false );
			//SPCO.console_log( 'target_id', target_id, false );

			var target = $( '#' + target_id );
			//SPCO.console_log( 'found target', target.attr('id'), false );

			if ( opt_group !== '' ) {
				//SPCO.console_log( 'opt_group', opt_group, false );
				var target_optgroup = target.find("optgroup[label='" + opt_group + "']" );
				if ( target_optgroup.size() === 0 ) {
					target.append( '<optgroup label="' + opt_group + '"></optgroup>' );
					target_optgroup = target.find("optgroup[label='" + opt_group + "']" );
				}
				//SPCO.console_log( 'found target_optgroup', target_optgroup.attr('id'), false );
				if ( target_optgroup.find("option[value='" + new_value + "']" ).size() === 0 ) {
					target_optgroup.prepend( '<option value="' + new_value + '">' + new_text + '</option>');
				}

			} else {
				if ( target.find("option[value='" + new_value + "']" ).size() === 0 ) {
					target.append( '<option value="' + new_value + '">' + new_text + '</option>');
				}
			}

			if ( set_selected === true ) {
				//SPCO.console_log( '>>> SET ' + new_text + ' selected', target_id, false );
				target.children(':selected').prop('selected', false);
				target.val( new_value );
				target.find('option[value="' + new_value + '"]').prop('selected', true);
			}
		},



		/**
		 * @function save_new_state_to_db
		 * @param  {string} state_country_iso
		 * @param  {string} state_name
		 * @param  {string} state_abbrv
		 * @param  {string} new_state_target
		 */
		save_new_state_to_db : function( state_country_iso, state_name, state_abbrv, new_state_target ) {

			if ( ! EE_ANS.validate_new_state_data( state_country_iso, state_name, state_abbrv )) {
				return false;
			}

			$.ajax({
				type: "POST",
				url:  eei18n.ajax_url,
				dataType: "json",
				data: {
					action : 'espresso_add_new_state',
					ee_front_ajax: 1,
					nsmf_add_new_state: 1,
					nsmf_new_state_country: state_country_iso,
					nsmf_new_state_name: state_name,
					nsmf_new_state_abbrv: state_abbrv,
					EESID: eei18n.EESID,
					noheader : 'true'
				},

				beforeSend: function() {
					$('#espresso-ajax-loading').show();
				},

				success: function( response ){
					$('#espresso-ajax-loading').fadeOut('fast');
					if ( typeof response.success !== 'undefined' && response.success === true ) {
						EE_ANS.message = SPCO.generate_message_object( SPCO.tag_message_for_debugging( 'Add New State: save_new_state_to_db', eei18n.ans_save_success ), '', '' );
						SPCO.scroll_to_top_and_display_messages( SPCO.main_container, EE_ANS.message, true );
						EE_ANS.process_new_state( response, new_state_target );
					} else if ( typeof response.error !== 'undefined' && response.error !== '' ) {
						EE_ANS.message = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'Add New State: save_new_state_to_db', response.error ), '' );
						SPCO.scroll_to_top_and_display_messages( SPCO.main_container, EE_ANS.message, true );
					} else {
						EE_ANS.message = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'Add New State: save_new_state_to_db', eei18n.ans_server_save_error ), '' );
						SPCO.scroll_to_top_and_display_messages( SPCO.main_container, EE_ANS.message, true );
					}

				},

				error: function() {
					$('#espresso-ajax-loading').fadeOut('fast');
					EE_ANS.message = SPCO.generate_message_object( '', SPCO.tag_message_for_debugging( 'Add New State: save_new_state_to_db', eei18n.ans_server_save_error ), '' );
					SPCO.scroll_to_top_and_display_messages( SPCO.main_container, EE_ANS.message, true );
				}

			});
		},



		/**
		 * @function cancel_new_state
		 * @param  {object} cancel_new_state_link
		 */
		cancel_new_state : function( cancel_new_state_link ) {
			// get target element from "this" (the control element's) "data" attribute
			var item_to_cancel = cancel_new_state_link.data( 'target' );
			var item_to_hide = item_to_cancel.replace('nsmf_new_state', 'state');
			// hide the target's div container - use slideToggle or addClass
			$('#'+item_to_hide+'-dv').slideToggle(250, function() {
				// display the control element that toggles display of this element
				$('#display-'+item_to_hide).show().fadeIn(50);
				// find all input's and add css classes: required and needs-value
				$( '#'+item_to_hide+'-dv' ).find(':input').each( function() {
					$(this).removeClass('required needs-value').trigger('change');
				});
			});
		}



	};

	SPCO.main_container.on( 'spco_display_step', function() {
		EE_ANS.initialize();
	});

	SPCO.main_container.on( 'spco_switch_payment_methods', function() {
		EE_ANS.initialize();
	});

	EE_ANS.initialize();

});