jQuery(document).ready(function($){
	$("input[name='calendar[time][format]']").click(function(){
			if ( "time_format_custom_radio" != $(this).attr("id") )
			$("input[name='time_format_custom']").val( $(this).val() ).siblings('.example').text( $(this).siblings('span').text() );
		});
	$("input[name='time_format_custom']").focus(function(){
			$("#time_format_custom_radio").attr("checked", "checked");
		});
		
	espresso_calendar_show_hide_inputs('select#calendar\\[display\\]\\[use_pickers\\] option:selected','.requires-color-pickers','0');
	espresso_calendar_show_hide_inputs('select#calendar\\[tooltip\\]\\[show\\] option:selected','.requires-tooltips','0');
	$('select#calendar\\[display\\]\\[use_pickers\\]').change(function(){
		espresso_calendar_show_hide_inputs('select#calendar\\[display\\]\\[use_pickers\\] option:selected','.requires-color-pickers','slow');
	});
	$('select#calendar\\[tooltip\\]\\[show\\]').change(function(){
		espresso_calendar_show_hide_inputs('select#calendar\\[tooltip\\]\\[show\\] option:selected','.requires-tooltips','slow');
	});
	 $('.color-picker').wpColorPicker();
	// disable color picker & thumb sizes inputs & fade if not use controls true
//	window.scp = $('select#calendar-use_pickers option:selected').val();
//	window.ectt = $('select#calendar-tooltip-show option:selected').val();
//
//	// color picker settings
//	if(window.scp === ''){
//		$('input#background-color, input#text-color').attr('disabled', true);
//		$('.color-picker-style').attr('style', "opacity: .3");
//		$('tr.color-picker-selections th, tr.color-picker-selections td').attr('style', "opacity: .3");
//	}
//	$('select#espresso_use_pickers').change(function(){
//			window.scp = $('select#espresso_use_pickers option:selected').val();
//			if(window.scp === ''){
//				$('input#event-background, input#event-text').attr('disabled', true);
//				$('tr.color-picker-selections th, tr.color-picker-selections td').attr('style', "opacity: .3");
//			}else {
//				$('input#event-background, input#event-text').removeAttr('disabled', true);
//				$('tr.color-picker-selections th, tr.color-picker-selections td').removeAttr('style');
//			}
//		});
//	$('#colorpicker-1').hide();
//	$('#colorpicker-2').hide();
//	$('#colorpicker-1').farbtastic("#background-color");
//	$('#colorpicker-2').farbtastic("#text-color");
//	$("#background-color").click(function(){$('#colorpicker-1').slideToggle();});
//	$("#text-color").click(function(){$('#colorpicker-2').slideToggle();});
//
//
//	// tooltip settings initialization
//	if(window.ectt === ''){
//		$('input#show_tooltips').attr('disabled', true);
//		$('.tooltip-positions').attr('style', "opacity: .3");
//		$('tr.tooltip-position-selections th, tr.tooltip-position-selections td').attr('style', "opacity: .3");
//	}
//	$('select#show_tooltips').change(function(){
//			window.ectt = $('select#show_tooltips option:selected').val();
//			if(window.ectt === ''){
//				$('input#event-background, input#event-text').attr('disabled', true);
//				$('tr.tooltip-position-selections th, tr.tooltip-position-selections td').attr('style', "opacity: .3");
//			}else {
//				$('input#tooltips_pos_my_1, input#tooltips_pos_my_2, input#tooltips_pos_at_1, input#tooltips_pos_at_2').removeAttr('disabled', true);
//				$('tr.tooltip-position-selections th, tr.tooltip-position-selections td').removeAttr('style');
//			}
//		});

});

function espresso_calendar_show_hide_inputs(dropdown_control_selector,div_to_hide_selector,speed_string){
	if(jQuery(dropdown_control_selector).val()=='1'){
		show = true;
	}else{
		show = false;
	}
	if(show){
		jQuery(div_to_hide_selector).show(speed_string);
	}else{
		jQuery(div_to_hide_selector).hide(speed_string);
	}
}