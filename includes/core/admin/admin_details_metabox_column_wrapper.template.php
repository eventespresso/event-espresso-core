<div id="poststuff">
	<div id="dashboard-widgets" class="metabox-holder <?php echo $current_screen_widget_class; ?>">
		<div id="admin-page-header">
			<?php echo $admin_page_header; ?>
		</div> <!-- admin-page-header -->

		<div id="post-body-content">
			<?php echo $post_body_content; ?>
		</div> <!-- post-body-content -->

		<?php
		//let's loop through the columns
		 for ( $i = 1; $i <= $num_columns; $i++ ) {
		 	$metaref = ( $i === 1 ) ? 'normal' : 'side';
		 	$metaref = ( $i > 2 ) ? 'column'.$i : $metaref;
		 ?>

			<div id='postbox-container-<?php echo $i; ?>' class='postbox-container'>
				<?php do_meta_boxes( $current_page, $metaref, NULL ); ?>
			</div>
		<?php }// end column loop ?>
	</div> <!-- post-body -->
</div> <!-- poststuff -->
