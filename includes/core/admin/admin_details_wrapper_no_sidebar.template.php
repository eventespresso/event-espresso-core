	<div id="poststuff">
		<div id="post-body" class="metabox-holder columns-1">
						
			<div id="admin-page-header">
				<?php echo $admin_page_header; ?>
			</div>
			<!-- admin-page-header -->
			
			<div id="post-body-content">
				<?php echo $post_body_content; ?>
			</div>
			<!-- post-body-content -->
			
			
			<div id="postbox-container-2" class="postbox-container">
				<?php do_meta_boxes( $current_page, 'normal', NULL ); ?>
				<?php do_meta_boxes( $current_page, 'advanced', NULL ); ?>
			</div>
			<!-- postbox-container-2 -->
			
		</div>
		<!-- post-body -->
	</div>
	<!-- poststuff -->