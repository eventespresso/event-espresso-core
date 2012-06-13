<div class="wrap">

	<div id="icon-options-event" class="icon32"></div>	
		
	<h2><?php esc_attr_e( 'Event Espresso - Registrations', 'event_espresso' ); ?>&nbsp;&nbsp;<?php //echo $add_new_btn; ?></h2>
	
	<?php echo $notices; ?>

	<h2 class="nav-tab-wrapper">
		<a class="nav-tab<?php echo $tab_active_overview;?>" href="<?php echo $tab_url_overview;?>"><?php echo $tab_lnk_overview;?></a>
		<a class="nav-tab<?php echo $tab_active_reports;?>" href="<?php echo $tab_url_reports;?>"><?php echo $tab_lnk_reports;?></a>
		<a class="nav-tab<?php echo $tab_active_setttings;?>" href="<?php echo $tab_url_setttings;?>"><?php echo $tab_lnk_setttings;?></a>			
	</h2>

	<?php echo $reg_content; ?>

</div>