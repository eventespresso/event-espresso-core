jQuery(document).ready(function($) {

	$('#post-body').on('change', '#QST_type', function(event){
		espresso_reg_forms_show_or_hide_question_options();
	});

	$('#post-body').on('click', '#new-question-option', function(){
		espresso_reg_forms_add_option();
	});

	$('#post-body').on('click', '.remove-option', function(){
		espresso_reg_forms_trash_option(this);
	});

	$('#post-body').on('click', '#QST_admin_only', function() {
		espresso_maybe_switch_required(this);
	});

	$('#post-body').on('keydown', '.question-options-table input', function(e) {
		var keyPressed = e.which;
		if ( keyPressed === 13 ) { //enter key
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
		update: function(event,ui) {
			espresso_update_option_order();
		}
	});

});




function espresso_update_option_order() {
	allOptions = jQuery( '.question-options-table tr.ee-options-sortable' );
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


//set variable intended to have global state here
var espresso_option_has_default = false;
function espresso_reg_forms_add_option(){
	var count=jQuery('#question_options_count').val();
	count++;

	//get first row
    var firstRow = jQuery('.question-option:not(.sample)','#question_options').first();
    console.log(firstRow.hasClass('default-option'));
    console.log(firstRow);

	//only do this if there is no default row
    if ( ! espresso_option_has_default && ( count===0 || ! firstRow.hasClass('default-option') ) ) {
        var defaultOptionSampleRow = jQuery('#question_options tbody tr:first-child');
        var newDefaultRow = defaultOptionSampleRow.clone(true);
        var newDefaultRowName = newDefaultRow.find('.option-value-hidden');
        var newDefaultRowValue = newDefaultRow.find('.options-desc');
        var newDefaultRowOrder = newDefaultRow.find('.QSO_order');
        var defaultName = newDefaultRowName.attr('name');
        var defaultValue = newDefaultRowValue.attr('name');
        var defaultOrder = newDefaultRowOrder.attr('name');
        //manipulate
        newDefaultRowName.attr('name', defaultName.replace("xxcountxx", count));
        newDefaultRowValue.attr('name', defaultValue.replace("xxcountxx", count));
        newDefaultRowOrder.attr('name', defaultOrder.replace("xxcountxx", count));
        newDefaultRow.removeClass('sample');
        //this is ALWAYS given a QSO_order of 0
        newDefaultRowOrder.val(0);

        //add this to the beginning of the options
        jQuery('tr.ee-options-sortable:first', '#question_options').before(newDefaultRow);

        espresso_option_has_default=true;
        //bump count for actual new row
        count++;
    }
    var sampleRow=jQuery('#question_options tbody tr:nth-child(2)');
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
	jQuery('#question_options tr:last').after(newRow);
	//add new count to dom.
	jQuery('#question_options_count').val(count);

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
	var admin_only = jQuery(item).prop('checked');
	if ( admin_only ) {
		jQuery('#QST_required').val('0');
		jQuery('#QST_required').prop('disabled', true);
		jQuery('#required_toggled_on').show();
		jQuery('#required_toggled_off').hide();
		return;
	} else {
		jQuery('#QST_required').prop('disabled', false);
		jQuery('#required_toggled_on').hide();
		jQuery('#required_toggled_off').show();
		return;
	}
}



function espresso_reg_forms_trash_option(item){
	jQuery(item).parents('.question-option').remove();
}
