<h2><?php esc_html_e('Please Confirm You Want to Permanently Delete the Following Data', 'event_espresso'); ?></h2>
<?php
if (WP_DEBUG) { ?>
    <p class="attention"><?php esc_html_e('Because WP_DEBUG is on, ALL models being deleted are mentioned below.', 'event_espresso'); ?></p>
    <?php
}
foreach ($models_and_ids_to_delete as $model_name => $ids) {
    $model = EE_Registry::instance()->load_model($model_name);
    $count = count($ids);
    ?><h3><?php echo esc_html(
        sprintf(
            _x('%1$d %2$s', 'Count of items', 'event_espresso'),
            $count,
            $model->item_name($count)
        )
    ); ?></h3>
    <?php
    $sample_only = false;
    if ($count > $quantity_to_preview) {
        $sample_only = true;
        $ids = array_slice($ids, 0, $quantity_to_preview);
    }
    if ($sample_only) {
        ?><p><?php
        echo esc_html(
            sprintf(
                __('First %1$d %2$s to Delete...', 'event_espresso'),
                count($ids),
                $model->item_name($count)
            )
        ); ?></p>
        <?php
    }
    ?>
    <ul>
        <?php foreach ($ids as $id) {
            $model_obj = $model->get_one_by_ID($id);
            if (!$model_obj instanceof EE_Base_Class) {
                continue;
            }
            if ($model_obj instanceof EE_Datetime) {
                $model_obj_name = $model_obj->get_dtt_display_name(true);
            } else {
                $model_obj_name = $model_obj->name();
            }

            ?>
            <li>
                <?php echo esc_html(
                    sprintf(
                        _x('%1$s (ID "%2$s")', 'Model object name (ID)', 'event_espresso'),
                        $model_obj_name,
                        $model_obj->ID()
                    )
                ); ?>
            </li>
            <?php
        }
        ?>
    </ul>


    <?php
}
?>
<form action="<?php echo $form_url; ?>" method="POST">
    <input type="hidden" value="<?php echo esc_attr($deletion_job_code); ?>" name="deletion_job_code">
    <input type="submit" value="<?php echo esc_attr(esc_html__('Confirm', 'event_espresso')); ?>">
</form>
