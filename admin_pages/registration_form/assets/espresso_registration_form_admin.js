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
	if ( val === 'RADIO_BTN' || val === 'CHECKBOX' || val === 'MULTI_SELECT' || val === 'DROPDOWN' ){
		jQuery('#question_options').show();
		espresso_reg_forms_show_option_desc();
	}else{
		jQuery('#question_options').hide();
	}
	if ( val === 'TEXT' || val === 'TEXTAREA' || val === 'HTML_TEXTAREA' ){
		jQuery('#text_input_question_options').show();
	}else{
		jQuery('#text_input_question_options').hide();
	}
	jQuery('.question_type_description' ).hide();
	jQuery('#question_type_description-' + val ).show();
	//alert( 'question_type_description ID = ' + '#question_type_description-' + val );

}



function espresso_reg_forms_add_option(){

    var $question_options = jQuery('#question_options');
    var $question_options_count = jQuery('#question_options_count');
	var count =  $question_options_count.val();
	count++;

    var sampleRow = $question_options.find('tbody tr:first-child');
	var newRow=sampleRow.clone(true);
	var newRowName=newRow.find('.option-value');
	var newRowValue=newRow.find('.option-desc');
	var newRowOrder=newRow.find('.QSO_order');
	var name=newRowName.attr('name');
    var value=newRowValue.attr('name');
    var order=newRowOrder.attr('name');
    newRowName.attr('name',name.replace("xxcountxx",count));
	newRowValue.attr('name', value.replace("xxcountxx",count));
	newRowOrder.attr('name', order.replace("xxcountxx",count));
	newRow.removeClass('sample');
	newRow.addClass('ee-options-sortable');

	//add to dom
    $question_options.find('tr:last').after(newRow);
	//add new count to dom.
    $question_options_count.val(count);

	//make sure QSO_order is correct on all sortable options in the dom
    espresso_update_option_order();

	newRowName.focus();
}

function espresso_reg_forms_show_option_desc(){
	jQuery('.option-desc-cell').show();
	jQuery('.option-desc-header').show();
	jQuery('.option-value-header').css('width', '45%');
	jQuery('.option-value-cell').css('width','45%');
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
