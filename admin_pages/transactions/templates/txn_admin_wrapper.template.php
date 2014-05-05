<div class="wrap">

	<h2><?php esc_attr_e( 'Event Espresso', 'event_espresso' ); ?>&nbsp;-&nbsp;<?php esc_attr_e( $admin_page_title, 'event_espresso' ); ?></h2>

	<h2 class="nav-tab-wrapper">
		<a class="nav-tab<?php echo $tab_active_overview; ?>" href="<?php echo $tab_url_overview; ?>"><?php echo $tab_lnk_overview; ?></a>
		<?php if ( $tab_details ) : ?>
			<a class="nav-tab<?php echo $tab_active_details; ?>" href="<?php echo $tab_url_details; ?>"><?php echo $tab_lnk_details; ?></a>
		<?php endif; ?>
		<a class="nav-tab<?php echo $tab_active_reports; ?>" href="<?php echo $tab_url_reports; ?>"><?php echo $tab_lnk_reports; ?></a>
		<a class="nav-tab<?php echo $tab_active_setttings; ?>" href="<?php echo $tab_url_setttings; ?>"><?php echo $tab_lnk_setttings; ?></a>
	</h2>

	<?php echo $admin_page_content; ?>

</div>
