<?php

/** @var string $before_list_table */

use EventEspresso\core\services\request\sanitizers\AllowedTags;

/** @var EE_Admin_List_Table $list_table */
/** @var string $list_table_class */
/** @var string $table_url */
/** @var array $search */
/** @var string $sortable_list_table_form_fields */
/** @var string $current_page */
/** @var string $list_table_hidden_fields */
/** @var string $after_list_table */
?>
<?php echo wp_kses($before_list_table, AllowedTags::getWithFormTags()); ?>
<form action="<?php echo esc_url_raw($table_url); ?>"
      id="<?php echo esc_attr($list_table_class); ?>-table-frm"
      method="get"
>
    <?php $list_table->search_box($search['btn_label'], $current_page); ?><br/>
    <?php echo wp_kses($sortable_list_table_form_fields, AllowedTags::getWithFormTags()); ?>
    <?php $list_table->display_views(); ?>
    <?php $list_table->display(); ?>
    <?php echo wp_kses($list_table_hidden_fields, AllowedTags::getWithFormTags()); ?>
</form>
<?php echo wp_kses($after_list_table, AllowedTags::getWithFormTags()); ?>
