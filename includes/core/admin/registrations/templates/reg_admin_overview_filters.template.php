
	<h3 style="margin-bottom:0;"><?php echo __('Filters', 'event_espresso'); ?></h3>

	<ul class="ee_subsubsub subsubsub">
		<li>
			<strong><?php _e('Registrations', 'event_espresso'); ?> : </strong>
		</li>
		<li>
			<a class="<?php echo $reg_filter_all_class;?>" href="<?php echo $reg_filter_all_url;?>">
				<?php _e('All Registrations', 'event_espresso'); ?> <span class="count">(<?php echo espresso_total_all_attendees(); ?>)</span>
			</a>
			&nbsp;|&nbsp;
		</li>
		<li>
			<a class="<?php echo $reg_filter_month_class;?>" href="<?php echo $reg_filter_month_url;?>">
				<?php _e('This Month', 'event_espresso'); ?> <span class="count">(<?php echo espresso_total_attendees_this_month(); ?>)</span>
			</a>
			&nbsp;|&nbsp;
		</li>
		<li>
			<a class="<?php echo $reg_filter_today_class;?>" href="<?php echo $reg_filter_today_url;?>">
				<?php _e('Today', 'event_espresso'); ?> - <?php echo date( 'D M d, Y' );?>
				<span class="count">(<?php echo espresso_total_attendees_today(); ?>)</span>
			</a>

		</li>
	</ul>

	<div class="clear"></div>

	<form id="reg-overview-filters-frm" name="reg_overview_filters_frm" method="post" action="<?php echo $reg_overview_filters_frm_url ?>">
		<ul class="ee_subsubsub subsubsub">
			<li>
				<?php echo $reg_overview_filter_select_month; ?>
				<input type="submit" class="button-secondary" value="Filter Month" id="post-query-submit">
			</li>
			<li>
				<?php echo $reg_overview_filter_select_category; ?>
				<input type="submit" class="button-secondary" value="Filter Category" id="post-query-submit">
			</li>
			<li>
				<?php echo $reg_overview_filter_select_status; ?>
				<input type="submit" class="button-secondary" value="Filter Status" id="post-query-submit">
			</li>
			<li>
				<a class="button-secondary" href="<?php echo $reg_overview_filters_frm_url ?>" style=" width:40px; display:inline">
				<?php _e('Reset Filters', 'event_espresso'); ?>
				</a>
			</li>
		</ul>
	</form>

	<div class="clear"><br /></div>
