jQuery(document).ready(function($) {
	$('#edit-slug-box').on('click', '#js-ticket-selector-embed-trigger', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var content = eei18n.ts_embed_iframe_title + '<br><textarea style="width: 100%; height: 100px;" id="js-ts-embed-content">' + $('#js-ts-iframe').html() + '</textarea>';
		dialogHelper.displayModal().addContent( content );
		$('#js-ts-embed-content').select();
	});
});
