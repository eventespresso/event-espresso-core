jQuery(document).ready(function($) {
	$("#create_new_espresso_events_Venues_Hooks_venue_metabox_metabox").on('change', '#venue_id', function() {
		var selected = $("#venue_id option:selected");
		var v_id = selected.attr("id");
		$(".eebox").hide();
		$("#eebox_"+v_id).show();
	});
});