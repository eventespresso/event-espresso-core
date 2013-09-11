<?php
//dtt debugging
$d = EEM_Datetime::instance()->get_one();
echo "<br>start date in default format:".$d->start_date();
        echo "<br>start time in default format:".$d->start_time();
        echo "<br>start time in custom format:".$d->start_time("H:i");
        echo "<br>start time in default format again:".$d->start_time("");
?>
	<?php $list_table->display_views(); ?>
    <form id="<?php echo $current_page; ?>-table-frm" action="<?php echo $table_url;?>" method="post">
		<?php echo $sortable_list_table_form_fields; ?>
    	<?php echo $list_table->search_box($search['btn_label'], $current_page); ?>
		<?php echo $list_table->display(); ?>
    </form>
    <?php echo isset($after_list_table) ? $after_list_table : ''; ?>