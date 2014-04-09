
//uses the variables localized in EE_Form_Section_Proper's _enqueue_and_localize_form_js()
//to generate the validation js
jQuery(document).ready(function(){
	//foreach ee form section
	//compile an array of what validation rules apply to which html form
	validation_rules_per_html_form = {};
	jQuery.each(ee_form_section_vars.form_data,function(index,form_data){
		//add its validation rules
		html_form = jQuery(form_data.form_section_id).closest('form');
		//make sure the form tag has an id
		id = html_form.attr('id');
		if(typeof(id) == 'undefined' || id == ''){
			html_form.attr('id',Date.now());
			id = html_form.attr('id')
		}
		if(typeof(validation_rules_per_html_form[id]) == 'undefined'){
			validation_rules_per_html_form[id] = form_data.validation_rules;
		}else{
			jQuery.extend(validation_rules_per_html_form[id],form_data.validation_rules);
		}
	});
	//now apply those validation rules to each html form
	jQuery.each(validation_rules_per_html_form,function(index,validation_rules_per_form){
		jQuery('#'+index).validate({
			rules : validation_rules_per_form
		});
	});
});

//adds a method used for validation URLs, which isn't native to jquery validate
jQuery(document).ready(function(){
	jQuery.validator.addMethod("validUrl", function(value, element) {
		if(this.optional(element)){
			return true;
		}else{
			var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

			if(RegExp.test(value)){
				return true;
			}else{
				return false;
			}
		}
	}, ee_form_section_vars.localized_error_messages.validUrl);
});