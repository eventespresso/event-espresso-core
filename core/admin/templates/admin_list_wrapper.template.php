<?php echo $before_list_table; ?>
<?php $list_table->display_views(); ?>
<form id="<?php echo $list_table_class; ?>-table-frm" action="<?php echo $table_url;?>" method="get">
	<?php echo $sortable_list_table_form_fields; ?>
	<?php echo $list_table->search_box($search['btn_label'], $current_page); ?>
	<?php echo $list_table->display(); ?>
	<?php echo $list_table_hidden_fields; ?>
</form>
<?php echo $after_list_table; ?>
