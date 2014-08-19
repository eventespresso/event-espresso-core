
//uses the variables localized in EE_Form_Section_Proper's _enqueue_and_localize_form_js()
//to generate the validation js
jQuery(document).ready(function($){
    //foreach ee form section
    //compile an array of what validation rules apply to which html form
    var validation_rules_per_html_form = {};

	$.each( ee_form_section_vars.form_data, function( index, form_data ){
		//add its validation rules
		var html_form = $(form_data.form_section_id).closest('form');
		//make sure the form tag has an id
		var id = html_form.attr('id');
		if ( typeof ( id ) === 'undefined' || id === '' ) {
			var new_id = ee_rand_string(15);
			html_form.attr('id', new_id);
			id = new_id;
		}
		//remove the non-js-generated server-side validation errors
		//because we will allow jquery validate to populate them
		$(form_data.form_section_id+' '+'.error').remove();

		if ( typeof(validation_rules_per_html_form[id]) === 'undefined'){
			validation_rules_per_html_form[id] = {
				'rules':form_data.validation_rules,
				'errors':form_data.errors
			};
		} else {
			$.extend( validation_rules_per_html_form[id].rules, form_data.validation_rules );
			$.extend( validation_rules_per_html_form[id].rules, form_data.e );
		}
	});

	//now apply those validation rules to each html form, and show the server-side errors properly
	$.each(validation_rules_per_html_form,function( index, validation_rules_per_form ){
//		console.log( JSON.stringify( 'index: ' + index, null, 4 ));
//		console.log( validation_rules_per_form );
	var validator = $('#'+index).validate({
		rules : validation_rules_per_form.rules
	});
//		console.log( JSON.stringify( 'validator: ' + validator, null, 4 ));
		if ( typeof validator !== 'undefined' ) {
			validator.showErrors( validation_rules_per_form.errors );
		}
	});

	//adds a method used for validation URLs, which isn't native to jquery validate
	$.validator.addMethod( "validUrl",
		function(value, element) {
			if(this.optional(element)){
				return true;
			}else{
				var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
				return RegExp.test(value);
			}
		},
		ee_form_section_vars.localized_error_messages.validUrl
	);


});

/**
 * for generating a random string to make an ID for an html form
 * if it doesn't have one already
 */
function ee_rand_string(n)
{
    if(!n) {
        n = 5;
    }

    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(var i=0; i < n; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
