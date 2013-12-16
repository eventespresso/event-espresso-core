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
	
	espresso_reg_forms_show_or_hide_question_options();
	
	
});



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
	var count=jQuery('#question_options tbody tr').not('.sample').size();
	var sampleRow=jQuery('#question_options tbody tr:first-child');
	var newRow=sampleRow.clone(true);
	var newRowName=newRow.find('.option-value');
	var newRowValue=newRow.find('.option-desc');
	var name=newRowName.attr('name');
	newRowName.attr('name',name.replace("xxcountxx",count));
	var value=newRowValue.attr('name');
	newRowValue.attr('name', value.replace("xxcountxx",count));
	newRow.removeClass('sample');
	jQuery('#question_options tr:last').after(newRow);
}

function espresso_reg_forms_show_option_desc(show){
	if(show){
		jQuery('.option-desc-cell').show();
		jQuery('.option-desc-header').show();
		
	}else{
		jQuery('.option-desc-cell').hide();
		jQuery('.option-desc-header').hide();
	}
}



function espresso_reg_forms_trash_option(item){
	jQuery(item).parents('.question-option').remove();
}
