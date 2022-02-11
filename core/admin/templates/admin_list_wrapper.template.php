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
<?php echo $before_list_table; // already escaped ?>
<form action="<?php echo esc_url_raw($table_url); ?>"
      id="<?php echo esc_attr($list_table_class); ?>-table-frm"
      method="get"
>
    <?php $list_table->search_box($search['btn_label'], $current_page); ?>
    <?php echo $sortable_list_table_form_fields; // already escaped ?>
    <?php $list_table->display_views(); ?>
    <?php $list_table->display(); ?>
    <?php echo $list_table_hidden_fields; // already escaped ?>
</form>
<?php echo $after_list_table; // already escaped ?>
