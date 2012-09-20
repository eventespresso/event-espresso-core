<div id="poststuff">
	<div id="dashboard-widgets" class="metabox-holder <?php echo $current_screen_widget_class; ?>">
		<div id="admin-page-header">
			<?php echo $admin_page_header; ?>
		</div> <!-- admin-page-header -->

		<div id="post-body-content">
			<?php echo $post_body_content; ?>
		</div> <!-- post-body-content -->

		<div id='postbox-container-1' class='postbox-container'>
			<?php do_meta_boxes( $current_page, 'normal', '' ); ?>
		</div>

		<div id='postbox-container-2' class='postbox-container'>
			<?php do_meta_boxes( $current_page, 'side', '' ); ?>
		</div>

		<div id='postbox-container-3' class='postbox-container'>
			<?php do_meta_boxes( $current_page, 'column3', '' ); ?>
		</div>

		<div id='postbox-container-4' class='postbox-container'>
			<?php do_meta_boxes( $current_page, 'column4', '' ); ?>
		</div>
	</div> <!-- post-body -->
	<?php
		wp_nonce_field( 'closedpostboxes', 'closedpostboxesnonce', false );
		wp_nonce_field( 'meta-box-order', 'meta-box-order-nonce', false );
	?>
</div> <!-- poststuff -->