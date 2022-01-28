<?php
/**
 * @var string $event_name
 * @var string $step_content
 */
?>

    <h1>
        <span class="small-text not-bold">
            <?php esc_html_e('Adding Registration For: ', 'event_espresso'); ?>
        </span>
        <?php echo $event_name; // already escaped ?>
    </h1>

    <?php echo $step_content; // already escaped
