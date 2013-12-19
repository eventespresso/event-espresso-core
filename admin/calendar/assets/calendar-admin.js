jQuery(document).ready(function($){
	$("input[name='time_format']").click(function(){
			if ( "time_format_custom_radio" != $(this).attr("id") )
			$("input[name='time_format_custom']").val( $(this).val() ).siblings('.example').text( $(this).siblings('span').text() );
		});
	$("input[name='time_format_custom']").focus(function(){
			$("#time_format_custom_radio").attr("checked", "checked");
		});
	// disable color picker & thumb sizes inputs & fade if not use controls true
	window.scp = $('select#espresso_use_pickers option:selected').val();
	window.ect = $('select#enable-calendar-thumbs option:selected').val();
	window.ectt = $('select#show_tooltips option:selected').val();


	if(window.ect == 'false'){
		$('tr#thumbnail-sizes td input').attr('disabled', true);
		$('tr#thumbnail-sizes').attr('style', "opacity: .3");
	}
	$('select#enable-calendar-thumbs').change(function(){
			window.ect = $('select#enable-calendar-thumbs option:selected').val();
			if(window.ect == 'false'){
				$('tr#thumbnail-sizes td input').attr('disabled', true);
				$('tr#thumbnail-sizes').attr('style', "opacity: .3");
			}else{
				$('tr#thumbnail-sizes td input').removeAttr('disabled', true);
				$('tr#thumbnail-sizes').removeAttr('style', "opacity: .3");
			}
		});

	// color picker settings
	if(window.scp === ''){
		$('input#event-background, input#event-text').attr('disabled', true);
		$('.color-picker-style').attr('style', "opacity: .3");
		$('tr.color-picker-selections th, tr.color-picker-selections td').attr('style', "opacity: .3");
	}
	$('select#espresso_use_pickers').change(function(){
			window.scp = $('select#espresso_use_pickers option:selected').val();
			if(window.scp === ''){
				$('input#event-background, input#event-text').attr('disabled', true);
				$('tr.color-picker-selections th, tr.color-picker-selections td').attr('style', "opacity: .3");
			}else {
				$('input#event-background, input#event-text').removeAttr('disabled', true);
				$('tr.color-picker-selections th, tr.color-picker-selections td').removeAttr('style');
			}
		});
	$('#colorpicker-1').hide();
	$('#colorpicker-2').hide();
	$('#colorpicker-1').farbtastic("#background-color");
	$('#colorpicker-2').farbtastic("#text-color");
	$("#background-color").click(function(){$('#colorpicker-1').slideToggle();});
	$("#text-color").click(function(){$('#colorpicker-2').slideToggle();});


	// tooltip settings initialization
	if(window.ectt === ''){
		$('input#show_tooltips').attr('disabled', true);
		$('.tooltip-positions').attr('style', "opacity: .3");
		$('tr.tooltip-position-selections th, tr.tooltip-position-selections td').attr('style', "opacity: .3");
	}
	$('select#show_tooltips').change(function(){
			window.ectt = $('select#show_tooltips option:selected').val();
			if(window.ectt === ''){
				$('input#event-background, input#event-text').attr('disabled', true);
				$('tr.tooltip-position-selections th, tr.tooltip-position-selections td').attr('style', "opacity: .3");
			}else {
				$('input#tooltips_pos_my_1, input#tooltips_pos_my_2, input#tooltips_pos_at_1, input#tooltips_pos_at_2').removeAttr('disabled', true);
				$('tr.tooltip-position-selections th, tr.tooltip-position-selections td').removeAttr('style');
			}
		});

});