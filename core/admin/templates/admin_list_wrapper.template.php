<?php
/** @var string $before_list_table */
/** @var EE_Admin_List_Table $list_table */
/** @var string $list_table_class */
/** @var string $table_url */
/** @var array $search */
/** @var string $sortable_list_table_form_fields */
/** @var string $current_page */
/** @var string $list_table_hidden_fields */
/** @var string $after_list_table */
?>
<?php echo $before_list_table; ?>
<form id="<?php echo $list_table_class; ?>-table-frm" action="<?php echo $table_url;?>" method="get">
	<?php $list_table->search_box( $search['btn_label'], $current_page ); ?><br />
	<?php echo $sortable_list_table_form_fields; ?>
	<?php $list_table->display_views(); ?>
	<?php $list_table->display(); ?>
	<?php echo $list_table_hidden_fields; ?>
</form>
<?php echo $after_list_table; ?>
