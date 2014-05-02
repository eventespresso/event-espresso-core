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
		if ( keyPressed == 13 ) { //enter key
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
	var curid,
	allOptions = jQuery( '.question-options-table tr.ee-options-sortable' );
	allOptions.each( function(i) {
		jQuery('.QSO_order', this).val(i);
	});
	return;
}



function espresso_reg_forms_show_or_hide_question_options(){
	var val=jQuery('#QST_type').val();
	if ( val=='SINGLE' || val=='MULTIPLE'){
		jQuery('#question_options').show();
		espresso_reg_forms_show_option_desc(true);
	}else if(val=='DROPDOWN'){
		jQuery('#question_options').show();
		espresso_reg_forms_show_option_desc(false);
	}else{
		jQuery('#question_options').hide();
		espresso_reg_forms_show_option_desc(false);
	}
}



function espresso_reg_forms_add_option(){
	var count=jQuery('#question_options_count').val();
	count++;
	var sampleRow=jQuery('#question_options tbody tr:first-child');
	var newRow=sampleRow.clone(true);
	var newRowName=newRow.find('.option-value');
	var newRowValue=newRow.find('.option-desc');
	var newRowOrder = newRow.find('.QSO_order');
	var name=newRowName.attr('name');
	newRowName.attr('name',name.replace("xxcountxx",count));
	var value=newRowValue.attr('name');
	newRowValue.attr('name', value.replace("xxcountxx",count));
	var order=newRowOrder.attr('name');
	newRowOrder.attr('name', order.replace("xxcountxx",count));
	newRowOrder.val(count);
	newRow.removeClass('sample');
	newRow.addClass('ee-options-sortable');
	jQuery('#question_options tr:last').after(newRow);
	//add new count to dom.
	jQuery('#question_options_count').val(count);
	newRow.find('input[type="text"]').focus();
}

function espresso_reg_forms_show_option_desc(show){
	if(show){
		jQuery('.option-desc-cell').show();
		jQuery('.option-desc-header').show();
		jQuery('.option-value-header').css('width', '45%');
		jQuery('.option-value-cell').css('width','45%');
	}else{
		jQuery('.option-desc-cell').hide();
		jQuery('.option-desc-header').hide();
		jQuery('.option-value-header').css('width', '90%');
		jQuery('.option-value-cell').css('width', '90%');
	}
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
