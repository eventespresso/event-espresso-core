jQuery(document).ready(function($) {

	// disable state dropdown if adding a new state
	$('.ee-form-add-new-state-submit').click(function(e) {
		// get STATE ABBREV input id from "this" (the control element's) "rel" attribute
		var new_state_rel = $(this).attr("rel");
		// create id for new STATE NAME input
		var new_state_name_id = new_state_rel.replace('new_state', 'new_state_name');
		// create id for new STATE NAME input
		var new_state_abbrv_id = new_state_rel.replace('new_state', 'new_state_abbrv');
		// create id for new state COUNTRY input
		var new_state_country_id = new_state_rel.replace('new_state', 'new_state_country');
		// COUNTRY DETAILS
		var  new_state_country_iso = $('#'+new_state_country_id).children(':selected').val();
		var  new_state_country_name = $('#'+new_state_country_id).children(':selected').text();
		var new_state_name = $('#'+new_state_name_id).val();
		var new_state_abbrv = $('#'+new_state_abbrv_id).val();

		if ( espresso_validate_new_state_data( new_state_country_iso, new_state_name, new_state_abbrv )) {
			// submit data via AJAX for db insertion
			espresso_save_new_state_to_db( new_state_country_iso, new_state_name, new_state_abbrv, new_state_rel );
		}
		e.preventDefault();
		e.stopPropagation();
	});



	function espresso_validate_new_state_data( state_country_iso, state_name, state_abbrv ) {
		if ( typeof state_country_iso === 'undefined' || state_country_iso === '' ) {
			display_espresso_ajax_notices( 'In order to proceed, you need to select the Country that your State/Province belongs to.' );
			return false;
		}
		if ( typeof state_name === 'undefined' || state_name === '' ) {
			display_espresso_ajax_notices( 'In order to proceed, you need to enter the name of your State/Province.' );
			return false;
		}
		if ( typeof state_abbrv === 'undefined' || state_abbrv === '' ) {
			display_espresso_ajax_notices( 'In order to proceed, you need to enter an abbreviation for the name of your State/Province.' );
			return false;
		}
		return true;
	}
		
	

	function espresso_save_new_state_to_db( state_country_iso, state_name, state_abbrv, new_state_rel ) {
		
		if ( ! espresso_validate_new_state_data( state_country_iso, state_name, state_abbrv )) {
			return false;
		}
		
		$.ajax({
			type: "POST",
			url:  eei18n.ajax_url,
			dataType: "json",
			data: {
				action : 'espresso_add_new_state',
				ee_front_ajax: 1,
				add_new_state: 1,
				new_state_country: state_country_iso,
				new_state_name: state_name,
				new_state_abbrv: state_abbrv,
				noheader : 'true'
			},
			
			beforeSend: function() {
				$('#espresso-ajax-loading').show();
			},
			
			success: function( response ){
				$('#espresso-ajax-loading').fadeOut('fast');
				if ( typeof response.success !== 'undefined' && response.success === true ) {
					display_espresso_ajax_notices( 'The new state was successfully saved to the database.', 'success' );
					espresso_process_new_state( response, new_state_rel );
				} else if ( typeof response.error !== 'undefined' && response.error !== '' ) {
					display_espresso_ajax_notices( response.error );
				} else {
					display_espresso_ajax_notices( 'An unknown error has occurred on the server while saving the new state to the database.' );
				}
						
			},
			
			error: function( response ) {
				$('#espresso-ajax-loading').fadeOut('fast');
				display_espresso_ajax_notices( 'An unknown error has occurred on the server while saving the new state to the database.' );
			}
					
		});
	}

	
		
	

	function espresso_process_new_state( new_state, new_state_rel ) {
		if ( typeof new_state.success !== 'undefined' && new_state.success === true ) {
			// TARGET INPUTS
			var state_select_id  = new_state_rel.replace('new_state', 'state');
			var state_select_dv = state_select_id +'-dv';
			var country_select_id = new_state_rel.replace('new_state', 'country');

			// find all inputs with country in the ID
			$("#single-page-checkout select[id*='-country']").each( function() {
				var country_select_id_to_set = $(this).attr('id');
				var set_selected = country_select_id_to_set == country_select_id ? true : false;
				// if country option already exists in Country dropdown
				if( $(this).find('option[value="' + new_state.country_iso + '"]').size() > 0 && set_selected ) {
					$('#'+country_select_id).find(':selected').prop('selected', false);
					$('#'+country_select_id + ' option[value="' + new_state.country_iso + '"]').prop('selected', true);
				} else {
					espresso_add_option_to_dropdown( country_select_id_to_set, new_state.country_iso, new_state.country_name, true );
				}
			});
			// find all inputs with state in the ID
			$("#single-page-checkout select[id*='-state']").each( function() {
				var select_id = $(this).attr('id');
				var set_selected = $(this).attr('id') == state_select_id ? true : false;
				// set target select's value to this input's value
				espresso_add_option_to_dropdown( select_id, new_state.id, new_state.name, set_selected, new_state.country_name );
			});
			var add_new_state = new_state_rel.replace('new_state', 'add_new_state');
			$('#'+add_new_state).val('1');
			// hide the target's div container - use slideToggle or addClass
			$('#'+state_select_dv).slideToggle(250, function() {
				var display_lnk = new_state_rel.replace('new_state', 'state');
				// display the control element that toggles display of this element
				$('#display-'+display_lnk).show().fadeIn(50);
			});
		}
	}
	
		
	

	function espresso_add_option_to_dropdown( target_id, new_value, new_text, set_selected, opt_group ) {
		new_text = typeof new_text !== 'undefined' && new_text !== '' ? new_text : new_value;
		new_value = typeof new_value !== 'undefined' && new_value !== '' ? new_value : new_text;
		opt_group = typeof opt_group !== 'undefined' && opt_group !== '' ? opt_group : '';
		
		if ( opt_group !== '' ) {
			if ( $( '#' + target_id + " optgroup[label='" + opt_group + "']" ).size() === 0 ) {
				$( '#' + target_id ).find('option[value=""]').after( '<optgroup label="' + opt_group + '"></optgroup>' );
			}
			$( '#' + target_id + " optgroup[label='" + opt_group + "']" ).prepend( '<option value="' + new_value + '">' + new_text + '</option>');
			
		} else {
			$( '#' + target_id ).find('option[value=""]').after( '<option value="' + new_value + '">' + new_text + '</option>');
		}
		
		if ( set_selected === true ) {
			$( '#' + target_id ).children(':selected').prop('selected', false);
			$( '#' + target_id ).val( new_value );
			$( '#' + target_id  + ' option[value="' + new_value + '"]').prop('selected', true);
		}
	}
		
	

	// disable state dropdown if adding a new state
	$('.ee-form-cancel-new-state-lnk').click(function(e) {
		// get target element from "this" (the control element's) "rel" attribute
		var item_to_cancel = $(this).attr("rel");
		var item_to_hide = item_to_cancel.replace('new_state', 'state');
		// hide the target's div container - use slideToggle or addClass
		$('#'+item_to_hide+'-dv').slideToggle(250, function() {
			// display the control element that toggles display of this element
			$('#display-'+item_to_hide).show().fadeIn(50);
			// find all input's and add css classes: required and needs-value
			$( '#'+item_to_hide+'-dv' ).find(':input').each( function() {
				$(this).removeClass('required needs-value').trigger('change');
			});
		});

		e.preventDefault();
		e.stopPropagation();
		
	});
		
	

	// display add new state microform
	$('.ee-form-add-new-state-lnk').click(function(e) {
		// get target element from "this" (the control element's) "rel" attribute
		var add_new_state_dv = '#'+$(this).attr('rel') +'-dv';
		// find all input's and add css classes: required and needs-value
		$( add_new_state_dv ).find(':input').each( function() {
			$(this).addClass('required needs-value').trigger('change');
		});
	});



	function display_espresso_ajax_notices( message, type ) {
		type = typeof type !== 'undefined' && type !== '' ? type : 'error';
		var notice_id = '#espresso-ajax-notices-' + type;
		$( notice_id + ' .espresso-notices-msg' ).text( message );
		$( '#espresso-ajax-notices' ).eeCenter();
		$( notice_id ).slideDown('fast');
		$('.espresso-ajax-notices.fade-away').delay(10000).slideUp('fast');
	}
		
});