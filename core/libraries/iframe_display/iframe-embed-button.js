jQuery(document).ready(function($) {
	$('#edit-slug-box').on('click', '.iframe-embed-trigger-js', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var iframeEmbedButton = $(this).data( 'iframe_embed_button' );
		var content = eei18n.iframe_embed_title;
		content += '<br><textarea style="width: 100%; height: 100px;" id="' + iframeEmbedButton + '-content-js">';
		content += $( iframeEmbedButton ).html();
		content += '</textarea>';
		dialogHelper.displayModal().addContent( content );
		$( iframeEmbedButton + '-content-js').select();
	});
});
