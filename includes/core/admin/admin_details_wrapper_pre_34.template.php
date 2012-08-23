	<div id="poststuff" class="metabox-holder has-right-sidebar">

		<div id="admin-page-header">
			<?php echo $admin_page_header; ?>
		</div>
		<!-- admin-page-header -->
		
		<div id="side-info-column" class="inner-sidebar">
				<?php do_meta_boxes( $current_page, 'side', NULL ); ?>
		</div> 
		<!-- side-info-column -->
		
		<div id="post-body">
			<div id="post-body-content">
				<?php echo $post_body_content; ?>
				<?php do_meta_boxes( $current_page, 'normal', NULL ); ?>
				<?php do_meta_boxes( $current_page, 'advanced', NULL ); ?>
			</div> 
			<!-- post-body-content -->
		</div> 
		<!-- post-body -->
		
	</div> 
	<!-- poststuff -->