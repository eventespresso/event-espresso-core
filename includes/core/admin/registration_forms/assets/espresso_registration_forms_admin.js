jQuery(document).ready(function($) {
	$('#QST_type').click(function(event){
		espresso_reg_forms_show_or_hide_question_options();
	});
	$('#new-question-option').click(function(){
		espresso_reg_forms_add_option();
	})
	$('.remove-option').click(function(){
		espresso_reg_forms_trash_option(this);
	})
	espresso_reg_forms_show_or_hide_question_options();
	
	
});
function espresso_reg_forms_show_or_hide_question_options(){
	var val=jQuery('#QST_type').val();
	if (val=='DROPDOWN' || val=='SINGLE' || val=='MULTIPLE'){
		jQuery('#question_options').show();
	}else{
		jQuery('#question_options').hide();
	}
}
function espresso_reg_forms_add_option(){
	var count=jQuery('#question_options tbody tr').not('.sample').size();
	var sampleRow=jQuery('#question_options tbody tr:first-child');
	var newRow=sampleRow.clone(true);
	var newRowName=newRow.find('.option-name');
	var newRowValue=newRow.find('.option-value');
	var name=newRowName.attr('name');
	newRowName.attr('name',name.replace("xxcountxx",count));
	var value=newRowValue.attr('name');
	newRowValue.attr('name', value.replace("xxcountxx",count));
	newRow.removeClass('sample');
	jQuery('#question_options tr:last').after(newRow);
}
function espresso_reg_forms_trash_option(item){
	jQuery(item).parents('.question-option').remove();
}
