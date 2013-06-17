jQuery(document).ready(function($) {
	$(document).on('change', '#espresso_events_Venues_Hooks_venue_metabox_metabox #venue_id', function() {
		var selected = $("option:selected", this);
		console.log(selected);
		var v_id = selected.val();
		console.log(v_id);
		$(".eebox").hide();
		$("#eebox_"+v_id).show();
	});
});