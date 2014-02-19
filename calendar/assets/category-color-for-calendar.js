
jQuery(document).ready(function($){
    $('.category-color-picker').wpColorPicker();
	$('#use-color-picker').change(espresso_calendar_show_color_picker);
	espresso_calendar_show_color_picker();
});

function espresso_calendar_show_color_picker(){
	if(jQuery('#use-color-picker').val()=='1'){
		show = true;
	}else{
		show = false;
	}
	if(show){
		jQuery('#color-picker-options').show('slow');
	}else{
		jQuery('#color-picker-options').hide('slow');
	}
}