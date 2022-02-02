<?php
/**
 * @var string     $description
 * @var string     $show_form
 * @var string     $template_form_fields
 * @var string[][] $hidden_fields
 */
?>

<div class="mt-settings-content">
    <div class="mt-description">
        <p><?php echo esc_html($description); ?></p>
    </div>
    <div class="mt-settings">
        <form method="POST" action="" class="mt-settings-form<?php echo esc_attr($show_form); ?>">
            <?php
            echo $template_form_fields; // already escaped
            foreach ($hidden_fields as $field) {
                echo $field['field']; // already escaped
            }
            ?>
            <input class='button--secondary mt-settings-submit no-drag'
                   type="submit"
                   value="<?php esc_attr_e('Submit', 'event_espresso'); ?>"
            />
        </form>
    </div>
</div>
