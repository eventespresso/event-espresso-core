
		<ul class="subsubsub">
			<li class="all"><a class="current" href="<?php echo $view_all_url;?>">View All <span class="count">(<?php echo $table_rows; ?>)</span></a></li>
		</ul>

		<div id="txn-filters-dv">
			<form id="txn-filters-frm" action="<?php echo $txn_overview_url;?>" method="post" name="txn-filters-frm">
				<label for="txn-filter-start-date"><?php _e( 'Display Transactions from ', 'event_espresso' ); ?></label>
				<input id="txn-filter-start-date" class="datepicker" type="text" value="<?php echo $start_date; ?>" name="txn-filter-start-date" size="15"/>	
				<label for="txn-filter-end-date"> <?php _e( 'until', 'event_espresso' ); ?> </label>
				<input id="txn-filter-end-date" class="datepicker" type="text" value="<?php echo $end_date; ?>" name="txn-filter-end-date" size="15"/>	
				<input id="submit-txn-filters-sbmt" class="button-secondary" type="submit" value="Filter Months">
			</form>
		</div>

        <form id="transactions-overview-frm" action="<?php echo $txn_overview_url;?>" method="get">
            <input type="hidden" name="page" value="<?php echo $_REQUEST['page'] ?>" />
            <input type="hidden" id="per_page" name="per_page" value="" />
            <?php echo $list_table->display(); ?>
        </form>
