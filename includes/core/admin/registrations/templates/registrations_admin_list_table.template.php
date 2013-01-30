		
	<div class="wrap">
	
		<div id="icon-options-event" class="icon32"></div>
			
		<h2><?php esc_attr_e( 'Registrations Overview', 'event_espresso' ); ?></h2>
		
		<?php echo $notices; ?>

		<ul class="subsubsub">
			<li class="all"><a class="current" href="<?php echo $view_all_url;?>">View All <span class="count">(<?php echo $table_rows; ?>)</span></a></li>
		</ul>

		<div id="reg-filters-dv">
			<form id="reg-filters-frm" action="<?php echo REG_ADMIN_URL;?>" method="post" name="reg-filters-frm">
				<label for="reg-filter-start-date">Display Registrations from </label>
				<input id="reg-filter-start-date" class="datepicker" type="text" value="<?php echo $start_date; ?>" name="reg-filter-start-date" size="15"/>	
				<label for="reg-filter-end-date"> until </label>
				<input id="reg-filter-end-date" class="datepicker" type="text" value="<?php echo $end_date; ?>" name="reg-filter-end-date" size="15"/>	
				<input id="submit-reg-filters-sbmt" class="button-secondary" type="submit" value="Filter Months">
			</form>
		</div>

        <form id="registration-admin-page-filter" action="<?php echo REG_ADMIN_URL;?>" method="get">
            <input type="hidden" name="page" value="<?php echo $_REQUEST['page'] ?>" />
            <input type="hidden" id="per_page" name="per_page" value="" />
            <?php echo $list_table->display(); ?>
        </form>

	</div>		
	<div id="ui-datepicker-div" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>