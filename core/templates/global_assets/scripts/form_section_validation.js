var EEFV;
jQuery(document).ready(function($){

	/**
	 * @function EE Form Validation (EEFV)
	 * @description uses the variables localized in EE_Form_Section_Proper's _enqueue_and_localize_form_js() to generate the validation js
	 *
	 * @namespace EEFV
	 * @type {{
	 *     validation_rules_array: object,
	 *     validation_rules_per_html_form: object,
	 *     form_validators: object,
	 * }}
	 * @namespace ee_form_section_vars
	 * @type {{
	 *     form_data: object,
	 *     form_section_id: string,
	 *     validation_rules: object,
	 *     errors: object
	 * }}
	 */
	EEFV = {

		// validation rules from the eei18n localized JSON array
		validation_rules_array : ee_form_section_vars.form_data,
		//foreach ee form section, compile an array of what validation rules apply to which html form
		validation_rules_per_html_form : {},
		// current form to be validated
		form_validators : {},



		/**
		 *	@function initialize
		 */
		initialize : function( form_data ) {
            // reset previous form validation rules
            EEFV.reset_validation_rules();
			EEFV.initialize_datepicker_inputs();
			EEFV.validation_rules_array = form_data;
			EEFV.setup_validation_rules( form_data );
			EEFV.add_custom_validators();
		},



        /**
         *	@function reset_validation_rules
         */
        reset_validation_rules : function() {
			EEFV.remove_previous_validation_rules();
			EEFV.validation_rules_per_html_form = {};
            EEFV.form_validators = {};
        },



		/**
		 * @function initialize_datepicker_inputs
		 */
		initialize_datepicker_inputs : function() {
			// if datepicker function exists
			if ( $.fn.datepicker ) {
				// activate datepicker fields
				$( '.datepicker' ).datepicker({
					changeMonth: true,
					changeYear: true,
					yearRange: eei18n.datepicker_yearRange
					// yearRange: "-150:+20"
				});
			}
			// to internationalize the datepicker, copy the following to somewhere safe,
			// then edit and use the language code returned from the WP PHP function: get_bloginfo( 'language' ) for the array key.
			// Multiple languages can be added this way
			/*
			$.datepicker.regional['fr_FR'] = {
				closeText: 'Fermer',
				prevText: 'Précédent',
				nextText: 'Suivant',
				currentText: 'Aujourd\'hui',
				monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
				'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
				monthNamesShort: ['janv.', 'févr.', 'mars', 'avril', 'mai', 'juin',
				'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
				dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
				dayNamesShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
				dayNamesMin: ['D','L','M','M','J','V','S'],
				weekHeader: 'Sem.',
				dateFormat: 'dd/mm/yy',
				firstDay: 1,
				isRTL: false,
				showMonthAfterYear: false,
				yearSuffix: ''
			};
			$.datepicker.setDefaults($.datepicker.regional[ eei18n.language ]);
			//	will automagically produce something like:	$.datepicker.setDefaults($.datepicker.regional['fr_FR']);
			 */
		},


		/**
		 *	@function setup_validation_rules
		 */
		setup_validation_rules : function( form_sections_to_validate ) {
			//EEFV.console_log( 'EEFV.setup_validation_rules > form_sections_to_validate', form_sections_to_validate, true );
			// loop through all form sections
			$.each( form_sections_to_validate, function( index, form_data ){
				//EEFV.console_log( 'EEFV.setup_validation_rules > form_sections_to_validate > index', index, true );
				//EEFV.console_log( 'EEFV.setup_validation_rules > form_sections_to_validate > form_data', form_data, false );
				if ( typeof form_data.form_section_id !== 'undefined' && typeof form_data.validation_rules !== 'undefined' ) {

					// grab the actual html form from the DOM
					var html_form = $( form_data.form_section_id ).closest('form');
					// IF one exists, that is ...
					if ( html_form.length ) {
						//make sure the form tag has an id
						var form_id = html_form.attr('id');
						if ( typeof form_id === 'undefined' || form_id === '' ) {
							form_id = EEFV.generate_random_string(15);
							html_form.attr( 'id', form_id );
						}
						// if the form already exists, then let's reset it
						if ( typeof EEFV.form_validators[ form_id ] !== 'undefined' ) {
							EEFV.form_validators[ form_id ].resetForm();
						}
						// remove the non-js-generated server-side validation errors
						// because we will allow jquery validate to populate them
						html_form.find( '.ee-error-label' ).remove();
						// need to call validate() before doing anything else, i know, seems counter intuitive...
						EEFV.form_validators[ form_id ] = html_form.validate();
						// now add form section's validation rules
						EEFV.add_rules( form_data.form_section_id, form_data.validation_rules );
						// and cache incoming form sections and rules so that they can be later removed if necessary
						EEFV.validation_rules_per_html_form[ form_data.form_section_id ] = form_data.validation_rules;
					}
				}

			});

		},



		/**
		 *	@function apply_rules
		 */
		add_rules : function( form_id, form_data ) {
			//EEFV.console_log( 'EEFV.apply_rules', '', true );
			//console.log( form_data );
			//now apply those validation rules to each html form, and show the server-side errors properly
			$.each( form_data, function( input_id, validation_rules ){
				var form_input = $( input_id );
				//EEFV.console_log( 'EEFV.apply_rules > input_id', input_id, false );
				//alert( 'form_input ID = ' + form_input.attr('id') );
				if ( typeof form_input !== 'undefined' && form_input.length ) {
					form_input.rules( 'add', validation_rules );
				}
			});
		},



		/**
		 *	@function remove_previous_validation_rules
		 */
		remove_previous_validation_rules : function() {
			// remove any previously applied validation rules for each html form
			$.each( EEFV.validation_rules_per_html_form, function( form_section_id, form_data ){
				if ( typeof form_section_id !== 'undefined' && typeof $( form_section_id ).attr('id') !== 'undefined' && typeof form_data !== 'undefined' ) {
					EEFV.remove_rules( form_data );
				}
			});
		},



		/**
		 *	@function apply_rules
		 */
		remove_rules : function( form_data ) {
			//EEFV.console_log( 'EEFV.remove_rules', '', true );
			//console.log( form_data );
			//now apply those validation rules to each html form, and show the server-side errors properly
			$.each( form_data, function( input_id ){
				var form_input = $( input_id );
				if ( typeof form_input !== 'undefined' && form_input.length ) {
					//alert( 'remove_rules input_id = ' + input_id + '\n' + 'form_input ID = ' + form_input.attr('id') );
					form_input.rules( 'remove' );
				}
			});
		},



		/**
		 *	@function add_custom_validators
		 */
		add_custom_validators : function() {
			//adds a method used for validation URLs, which isn't native to jquery validate
			$.validator.addMethod( "validUrl",
				function( value, element ) {
					if ( this.optional( element )){
						return true;
					} else {
						var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
						return RegExp.test(value);
					}
				},
				ee_form_section_vars.localized_error_messages.validUrl
			);
			$.validator.addMethod(
				"regex",
				function(value, element, regexp) {
					//remove the delimiter PHP needed
//					var reMeta = /(^|[^\\])\/(\w+$){0,1}/;
//
//					regexp = new RegExp( regexp.replace(reMeta,'$1') );
					// after replace it looks like: "hello\/slash\/"
					var re = new RegExp(regexp);
					return this.optional(element) || re.test(value);
				},
				ee_form_section_vars.localized_error_messages.regex
		);
		},



		/**
		 * for generating a random string to make an ID for an html form
		 * if it doesn't have one already
		 */
		generate_random_string : function( n ) {
			if( ! n ) {
				n = 5;
			}
			var text = '';
			var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			for( var i=0; i < n; i++ ) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		},



		/**
		 *  @function console_log
		 *  print to the browser console
		 * @param  {string} item_name
		 * @param  {*} value
		 * @param  {boolean} spacer
		 */
		console_log: function ( item_name, value, spacer ) {
			if ( eei18n.wp_debug ) {
				if ( typeof spacer !== 'undefined' && spacer === true ) {
					console.log( ' ' );
				}
				if ( typeof value === 'object' ) {
					EEFV.console_log_object( item_name, value, 0 );
				} else {
					if ( typeof item_name !== 'undefined' && typeof value !== 'undefined' && value !== '' ) {
						console.log( item_name + ' = ' + value );
					} else if ( typeof item_name !== 'undefined' ) {
						console.log( item_name );
					}
				}
			}
		},

		/**
		 * @function console_log_object
		 * print object to the browser console
		 * @param  {string} obj_name
		 * @param  {object} obj
		 * @param  {number} depth
		 */
		console_log_object: function ( obj_name, obj, depth ) {
			if ( eei18n.wp_debug ) {
				depth = typeof depth !== 'undefined' ? depth : 0;
				var spacer = '';
				for ( var i = 0; i < depth; i++ ) {
					spacer = spacer + '. ';
				}
				if ( typeof obj === 'object' ) {
					if ( typeof obj_name !== 'undefined' ) {
						//console.log( obj_name );
						EEFV.console_log( spacer + obj_name );
					} else {
						//console.log( 'console_log_object : ' );
						EEFV.console_log( spacer + 'console_log_object : ' );
					}
					spacer = spacer + '. ';
					depth++;
					$.each( obj, function( index, value ){
						if ( typeof value === 'object' ) {
							if ( depth < 4 ) {
								EEFV.console_log_object( index, value, depth );
							}
						} else {
							EEFV.console_log( spacer + index, value, depth );
							depth++;
						}
					});
				} else {
					EEFV.console_log( spacer + obj_name, obj, true );
				}
			}
		}


	};
	// end of EEFV object

});

// example  ee_form_section_vars
//var ee_form_section_vars = {
//	"form_data":{
//		"ee-single-page-checkout-dv":{
//			"form_section_id":"#ee-single-page-checkout-dv",
//			"validation_rules":[],
//			"errors":[]
//		},
//		"ee-spco-attendee_information-reg-step-form":{
//			"form_section_id":"#ee-spco-attendee_information-reg-step-form",
//			"validation_rules":{
//				"#ee_reg_qstn-1-9694e9fa065278f0aca66280b6be7f7a-fname":{
//					"required":true
//				},
//				"#ee_reg_qstn-1-9694e9fa065278f0aca66280b6be7f7a-lname":{
//					"required":true
//				},
//				"#ee_reg_qstn-1-9694e9fa065278f0aca66280b6be7f7a-email":{
//					"required":true
//				},
//				"#ee_reg_qstn-1-9694e9fa065278f0aca66280b6be7f7a-country":{
//					"required":true
//				}
//			},
//			"errors":[]
//		}
//	},
//	"localized_error_messages":{
//		"validUrl":"This is not a valid absolute URL. Eg, http:\/\/domain.com\/monkey.jpg"
//	}
//};
