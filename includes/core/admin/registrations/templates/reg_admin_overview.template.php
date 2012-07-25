		
	<div id="reg-overview-filters-dv">
	<?php
		if( $premium_reg_filters ) :
			echo $premium_reg_filters;
		else :
	?>
		<ul class="subsubsub">
			<li class="all">
				<a class="current" href="<?php echo $view_all_url;?>">View All <span class="count">(<?php echo $table_rows; ?>)</span></a>
			</li>
		</ul>
		<div class="clear"></div>
		<form id="reg-filters-frm" action="<?php echo $reg_overview_url;?>" method="post" name="reg-filters-frm">
			<label for="reg-filter-start-date"><?php _e( 'Display Registrations from ', 'event_espresso' ); ?></label>
			<input id="reg-filter-start-date" class="datepicker" type="text" value="<?php echo $start_date; ?>" name="reg-filter-start-date" size="15"/>
			<label for="reg-filter-end-date"> <?php _e( 'until', 'event_espresso' ); ?> </label>
			<input id="reg-filter-end-date" class="datepicker" type="text" value="<?php echo $end_date; ?>" name="reg-filter-end-date" size="15"/>
			<input id="submit-reg-filters-sbmt" class="button-secondary" type="submit" value="Filter Months">
		</form>
		<p style="color:#999;">
			<?php _e('Advanced filters are available in the premium version of Event Espresso.', 'event_espresso'); ?>
			<a href="http://eventespresso.com/download/" target="_blank"><?php _e('Upgrade Now!', 'event_espresso'); ?></a>
		</p>

	<?php endif; ?>
	</div>


        <form id="registrations-overview-frm" action="<?php echo $reg_overview_url;?>" method="get">
            <input type="hidden" name="page" value="<?php echo $_REQUEST['page'] ?>" />
            <input type="hidden" id="per_page" name="per_page" value="" />
            <?php echo $list_table->display(); ?>
        </form>


	<div id="ui-datepicker-div" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>