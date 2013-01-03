	<?php $list_table->display_views(); ?>
    <form id="<?php echo $current_page; ?>-table-frm" action="<?php echo $table_url;?>" method="post">
    	<?php echo $list_table->search_box(__('Search Events', 'event_espresso'), $current_page); ?>
		<?php echo $list_table->display(); ?>
    </form>