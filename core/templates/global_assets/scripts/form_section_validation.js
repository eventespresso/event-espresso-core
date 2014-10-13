var EEFV;
jQuery(document).ready(function($){

	/**
	 * @function EE Form Validation (EEFV)
	 * @description uses the variables localized in EE_Form_Section_Proper's _enqueue_and_localize_form_js() to generate the validation js
	 *
	 * @namespace EEFV
	 * @type {{
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

		//foreach ee form section, compile an array of what validation rules apply to which html form
		validation_rules_per_html_form : {},
		// current form to be validated
		form_validators : {},



		/**
		 *	@function initialize
		 */
		initialize : function( form_data ) {
//			console.log( ' ' );
//			console.log( JSON.stringify( 'EEFV.initialize > ee_form_section_vars.form_data: ', null, 4 ));
//			console.log( ee_form_section_vars.form_data );
            // reset previous form validation rules
            EEFV.reset_validation_rules();
			EEFV.setup_validation_rules( form_data );
			EEFV.apply_rules();
			EEFV.add_url_validator();
			//console.log( EEFV.validation_rules_per_html_form );
			//console.log( EEFV.form_validators );
		},



        /**
         *	@function reset_validation_rules
         */
        reset_validation_rules : function() {
            EEFV.validation_rules_per_html_form = {};
            EEFV.form_validators = {};
        },



		/**
		 *	@function setup_validation_rules
		 */
		setup_validation_rules : function( form_sections_to_validate ) {
//			console.log( ' ' );
//			console.log( JSON.stringify( 'EEFV.setup_validation_rules', null, 4 ));
			// loop through all form sections
			$.each( form_sections_to_validate, function( index, form_data ){
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
//					console.log( JSON.stringify( 'EEFV.setup_validation_rules > form_id: ' + form_id, null, 4 ));
					// remove the non-js-generated server-side validation errors
					// because we will allow jquery validate to populate them
					$( form_data.form_section_id ).find('.error').remove();
					// now add form section's validation rules
					if ( typeof( EEFV.validation_rules_per_html_form[ form_id ] ) === 'undefined' ){
						EEFV.validation_rules_per_html_form[ form_id ] = {
							'rules' : form_data.validation_rules,
							'errors' : form_data.errors
						};
					} else {
						$.extend( EEFV.validation_rules_per_html_form[ form_id ].rules, form_data.validation_rules );
						$.extend( EEFV.validation_rules_per_html_form[ form_id ].errors, form_data.errors );
					}
				}

			});
//			console.log( JSON.stringify( 'EEFV.setup_validation_rules > EEFV.validation_rules_per_html_form: ', null, 4 ));
//			console.log( EEFV.validation_rules_per_html_form );
		},



		/**
		 *	@function apply_rules
		 */
		apply_rules : function() {
//			console.log( ' ' );
//			console.log( JSON.stringify( 'EEFV.apply_rules', null, 4 ));
//			console.log( JSON.stringify( 'EEFV.apply_rules > EEFV.validation_rules_per_html_form: ', null, 4 ));
//			console.log( EEFV.validation_rules_per_html_form );

			//now apply those validation rules to each html form, and show the server-side errors properly
			$.each( EEFV.validation_rules_per_html_form, function( form_id, form_validation ){
				//console.log( JSON.stringify( 'EEFV.apply_rules > form_id: ' + form_id, null, 4 ));
                if ( typeof form_validation.rules !== 'undefined' ) {

                    EEFV.form_validators[ form_id ] = $( '#'+form_id ).validate();
                    //console.log( JSON.stringify( 'EEFV.apply_rules > form_validation.errors: ', null, 4 ));
                    //console.log( form_validation.errors );
                    if ( typeof EEFV.form_validators[ form_id ] !== 'undefined' ) {
                        EEFV.form_validators[ form_id ].showErrors( form_validation.errors );
                    }

                    $.each( form_validation.rules, function ( input_name, validation_rules ) {
                        //console.log(JSON.stringify( 'apply_rules > EEFV.form_validators > input_name: ' + input_name, null, 4));
                        //console.log(JSON.stringify( 'apply_rules > EEFV.form_validators > validation_rules: ', null, 4));
                        //console.log(validation_rules );
                        var form_input = $("input[name='" + input_name + "']");
                        if ( ! form_input.length ) {
                            form_input = $("select[name='" + input_name + "']");
                        }
                        if ( form_input.length ) {
                            form_input.rules( 'add', validation_rules );
                        }
                    });

                }
			});
//			console.log( JSON.stringify( 'apply_rules > EEFV.form_validators: ', null, 4 ));
//			console.log( EEFV.form_validators );
		},



		/**
		 *	@function remove_rules
		 */
		remove_rules : function() {
			// remove any previously applied validation rules for each html form
			$.each( EEFV.form_validators, function( form_id ){
				if ( typeof EEFV.form_validators[ form_id ] !== 'undefined' && typeof EEFV.form_validators[ form_id ].settings !== 'undefined' ) {
                    //console.log( JSON.stringify( 'remove_rules > EEFV.form_validators > form_id: ' + form_id, null, 4 ));
                    $.each( EEFV.form_validators[ form_id ].settings.rules, function( input_name, validation_rules ){
                        var form_input = $("input[name='" + input_name + "']");
                        if ( ! form_input.length ) {
                            form_input = $("select[name='" + input_name + "']");
                        }
                        if ( form_input.length ) {
                            form_input.rules('remove');
                            //console.log( JSON.stringify( 'remove_rules > EEFV.form_validators > input_name: ' + input_name, null, 4 ));
                        }
                    });
				}
			});
			//console.log( JSON.stringify( 'remove_rules > EEFV.form_validators: ', null, 4 ));
			//console.log( EEFV.form_validators );
		},



		/**
		 *	@function add_url_validator
		 */
		add_url_validator : function() {
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
		}



	};
	// end of EEFV object

	/**
	 *	run EEFV
	 */
	EEFV.initialize( ee_form_section_vars.form_data );

});



