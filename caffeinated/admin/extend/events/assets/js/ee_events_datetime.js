jQuery(document).ready(function($) {
	var counter = $('#datetime_total_rows').val();

	$('#event-datetimes-dv', document).on('click', '#add-new-date-time', function(){
		var newRow = "<tr valign='top' id='event-dates-and-times-row-"+counter+"'><td><div class='small-screen-table-label'>"+eei18n.event_starts_on+"</div><input id='event-start-"+counter+"' name='event_datetimes["+counter+"][evt_start]' type='text' class='dtm-es-picker dtm-inp medium-text' value=''/><input name='event-start-row-"+counter+"' type='hidden' value='"+counter+"'/><input id='is-primary-"+counter+"' name='event_datetimes["+counter+"][is_primary]' type='hidden' value='' /></td><td><div class='small-screen-table-label'>"+eei18n.event_ends_on+"</div><input id='event-end-"+counter+"' name='event_datetimes["+counter+"][evt_end]' type='text' class='dtm-ee-picker dtm-inp medium-text' value=''/><input name='event-end-row-"+counter+"' type='hidden' value='"+counter+"'/></td><td><div class='small-screen-table-label'>"+eei18n.registration_starts_on+"</div><input id='reg-start-"+counter+"' name='event_datetimes["+counter+"][reg_start]' type='text' class='dtm-rs-picker dtm-inp medium-text' value='' /><input name='reg-start-row-"+counter+"' type='hidden' value='"+counter+"'/></td><td><div class='small-screen-table-label'>"+eei18n.registration_ends_on+"</div><input id='reg-end-"+counter+"' name='event_datetimes["+counter+"][reg_end]' type='text' class='dtm-re-picker dtm-inp medium-text' value='' /><input name='reg-end-row-"+counter+"' type='hidden' value='"+counter+"'/></td>" + /* DO NOT DELETE - NEW FEATURE IN PROGRESS <?php if ($org_options['time_reg_limit']) : ?><td><input type='text' id='reg-limit-"+counter+"' name='event_datetimes["+counter+"][reg_limit]' class='small-text dtm-inp' style='text-align:right;' value=''/></td><?php endif; // time_reg_limit   ?><td><input type='text' id='tckts-left-"+counter+"' name='event_datetimes["+counter+"][tckts_left]' class='small-text dtm-inp' style='text-align:right;' value=''/></td> */ "<td><div class=small-screen-table-label>"+eei18n.event_datetime_actions+"</div><a class='clone-date-time dtm-inp-btn' rel='"+counter+"' title='"+eei18n.event_clone_dt_msg+"' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'><img src='"+eei18n.clone_trooper_img_src+"' width='16' height='16' alt='"+eei18n.clone_trooper_img_alt+"'/></a><a class='remove-xtra-time dtm-inp-btn' rel='"+counter+"' title='"+eei18n.remove_event_dt_msg+"' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'><img src='"+eei18n.trash_img_src+"' width='16' height='16' alt='"+eei18n.trash_img_alt+"'/></a></td></tr>";
		$('#event-dates-and-times tr:last').after( newRow );
		counter++;
	});
	

	$('#event-datetimes-dv', document).on('click', '.clone-date-time', function(){
		var cloneRow = $(this).attr('rel');
		var newRow = "<tr valign='top' id='event-dates-and-times-row-"+counter+"'><td><div class='small-screen-table-label'>"+eei18n.event_starts_on+"</div><input id='event-start-"+counter+"' name='event_datetimes["+counter+"][evt_start]' type='text' class='dtm-es-picker dtm-inp medium-text' value=''/><input name='event-start-row-"+counter+"' type='hidden' value='"+counter+"'/><input id='is-primary-"+counter+"' name='event_datetimes["+counter+"][is_primary]' type='hidden' value='' /></td><td><div class='small-screen-table-label'>"+eei18n.event_ends_on+"</div><input id='event-end-"+counter+"' name='event_datetimes["+counter+"][evt_end]' type='text' class='dtm-ee-picker dtm-inp medium-text' value=''/><input name='event-end-row-"+counter+"' type='hidden' value='"+counter+"'/></td><td><div class='small-screen-table-label'>"+eei18n.registration_starts_on+"</div><input id='reg-start-"+counter+"' name='event_datetimes["+counter+"][reg_start]' type='text' class='dtm-rs-picker dtm-inp medium-text' value='' /><input name='reg-start-row-"+counter+"' type='hidden' value='"+counter+"'/></td><td><div class='small-screen-table-label'>"+eei18n.registration_ends_on+"</div><input id='reg-end-"+counter+"' name='event_datetimes["+counter+"][reg_end]' type='text' class='dtm-re-picker dtm-inp medium-text' value='' /><input name='reg-end-row-"+counter+"' type='hidden' value='"+counter+"'/></td>" /* DO NOT DELETE - NEW FEATURE IN PROGRESS <?php if ($org_options['time_reg_limit']) : ?><td><input type='text' id='reg-limit-"+counter+"' name='event_datetimes["+counter+"][reg_limit]' class='small-text dtm-inp' style='text-align:right;' value=''/></td><?php endif; // time_reg_limit   ?><td><input type='text' id='tckts-left-"+counter+"' name='event_datetimes["+counter+"][tckts_left]' class='small-text dtm-inp' style='text-align:right;' value=''/></td>  */ + "<td><div class=small-screen-table-label>"+eei18n.event_datetime_actions+"</div><a class='clone-date-time dtm-inp-btn' rel='"+counter+"' title='"+eei18n.event_clone_dt_msg+"' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'><img src='"+eei18n.clone_trooper_img_src+"' width='16' height='16' alt='"+eei18n.clone_trooper_img_alt+"'/></a><a class='remove-xtra-time dtm-inp-btn' rel='"+counter+"' title='"+eei18n.remove_event_dt_msg+"' style='position:relative; top:6px; margin:0 0 0 10px; font-size:.9em; cursor:pointer;'><img src='"+eei18n.trash_img_src+"' width='16' height='16' alt='"+eei18n.trash_img_alt+"'/></a></td></tr>";
		$('#event-dates-and-times-row-'+cloneRow).after( newRow );
		$('#event-start-'+counter).val( $('#event-start-'+(cloneRow)).val() );
		$('#event-end-'+counter).val( $('#event-end-'+(cloneRow)).val() );
		$('#reg-start-'+counter).val( $('#reg-start-'+(cloneRow)).val() );
		$('#reg-end-'+counter).val( $('#reg-end-'+(cloneRow)).val() );
		/*
		DO NOT DELETE - NEW FEATURE IN PROGRESS
		$('#reg-limit-'+counter).val( $('#reg-limit-'+(cloneRow)).val() );
		$('#tckts-left-'+counter).val( $('#tckts-left-'+(cloneRow)).val() );
		*/
		counter++;
	});

	$('#event-datetimes-dv', document).on("click", '.remove-xtra-time', function(){
		var whichRow = '#event-dates-and-times-row-' + $(this).attr('rel');
		$(whichRow).remove();
		counter--;
	});
});