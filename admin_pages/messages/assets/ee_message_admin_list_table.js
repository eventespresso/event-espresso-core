jQuery(document).ready( function($) {
    $( '#EE_Message_List_Table-table-frm').on( 'click', '.js-ee-message-action-link', function(e) {
           if ( $(this).hasClass( 'ee-message-action-link-view' ) || $(this).hasClass( 'ee-message-action-link-error' ) ) {
               e.preventDefault();
               e.stopPropagation();
               var height = $(this).hasClass( 'ee-message-action-link-view' ) ? parseInt( $(window).height() )*.75 + 'px' : '100%';
               var content = '<iframe height="' + height + '" width="100%" src="' + $(this).parent().attr('href') + '">';
               dialogHelper.displayModal().addContent(content);
           }
    });
});