jQuery(document).ready(function($) {
	$('#post-body-content').on('click', '.iframe-embed-trigger-js', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var iframeEmbedButton = $(this).data( 'iframe_embed_button' );
		var content = eei18n.iframe_embed_title;
		content += '<br><textarea style="width: 100%; height: 100px;" id="' + iframeEmbedButton + '-content-js">';
		content += $( iframeEmbedButton ).html();
		content += '</textarea>';
		content += '<div style="text-align:right; color: #999;">' + eei18n.iframe_embed_close_msg + '</div>';
		dialogHelper.displayModal().addContent( content );
		$( iframeEmbedButton + '-content-js').select();
	});
});
