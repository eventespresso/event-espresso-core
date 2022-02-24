jQuery(document).ready(function($) {

    $('#post-body').on('change', '#QST_type', function () {
        espresso_reg_forms_show_or_hide_question_options();
    }).on('click', '#new-question-option', function () {
        espresso_reg_forms_add_option();
    }).on('click', '.remove-option', function () {
        espresso_reg_forms_trash_option(this);
    }).on('click', '#QST_admin_only', function () {
        espresso_maybe_switch_required(this);
    }).on('keydown', '.question-options-table input', function (e) {
        var keyPressed = e.which;
        if (keyPressed === 13) { //enter key
            e.preventDefault();
            e.stopPropagation();
            espresso_reg_forms_add_option();
        }
    });

	espresso_reg_forms_show_or_hide_question_options();

	/** sortable options **/
	$('.question-options-table').sortable({
		cursor: 'move',
		items: '.ee-options-sortable',
		update: function() {
			espresso_update_option_order();
		}
	});

});




function espresso_update_option_order() {
	var allOptions = jQuery( '.question-options-table tr.ee-options-sortable' );
	allOptions.each( function(i) {
	    //always add one to the index because there should always be a default option for selects
		jQuery('.QSO_order', this).val(i+1);
	});
}



function espresso_reg_forms_show_or_hide_question_options(){
	var val=jQuery('#QST_type').val();
	if ( ee_question_data.question_type_with_options.indexOf(val) !== -1 ){
		jQuery('#question_options').show();
		espresso_reg_forms_show_option_desc();
	}else{
		jQuery('#question_options').hide();
	}
	if ( ee_question_data.question_types_with_max.indexOf(val) !== -1){
		jQuery('#text_input_question_options').show();
	}else{
		jQuery('#text_input_question_options').hide();
	}
	jQuery('.question_type_description' ).hide();
	jQuery('#question_type_description-' + val ).show();
	//alert( 'question_type_description ID = ' + '#question_type_description-' + val );

}



function espresso_reg_forms_add_option(){

    const $question_options = jQuery('#question_options');
	const $question_options_count = jQuery('#question_options_count');
	let count =  $question_options_count.val();
	count++;

	const sampleRow = $question_options.find('tbody tr:first-child');
	const newRow=sampleRow.clone(true);
	const newRowName=newRow.find('.option-value');
	newRow.removeClass('sample');
	newRow.addClass('ee-options-sortable');
	// since html() only returns the inner HTML,
	// we need to wrap the row in a dummy p tag and then traverse up to the parent
	// so that the call to html() will return the actual row as well
	const newRowHtml = newRow.wrap('<p/>').parent().html();
	// use global regex to replace ALL counts with new value
	const newContent = newRowHtml.replace(new RegExp("xxcountxx", 'g'), count);

	//add to dom
    $question_options.find('tr:last').after(newContent);
	//add new count to dom.
    $question_options_count.val(count);

	//make sure QSO_order is correct on all sortable options in the dom
    espresso_update_option_order();

	newRowName.focus();
}

function espresso_reg_forms_show_option_desc(){
	jQuery('.option-desc-cell').show();
	jQuery('.option-desc-header').show();
	/** focus on value field **/
	jQuery('.option-value').focus();
}


function espresso_maybe_switch_required(item) {
	if (jQuery(item).prop('checked') ) {
		jQuery('#QST_required').val('0').prop('disabled', true);
		jQuery('#required_toggled_on').show();
		jQuery('#required_toggled_off').hide();
	} else {
		jQuery('#QST_required').prop('disabled', false);
		jQuery('#required_toggled_on').hide();
		jQuery('#required_toggled_off').show();
	}
}



function espresso_reg_forms_trash_option(item){
	jQuery(item).parents('.question-option').remove();
}
