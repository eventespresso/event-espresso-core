<?php
/**
 * @var bool   $active
 * @var string $content
 * @var string $hide_on_message
 * @var string $messenger
 * @var string $active_message_types
 */
?>

<div class="<?php echo esc_attr($messenger); ?>-content">
    <?php echo $content; // already escaped ?>
    <?php if (empty($inactive_message_types) && empty($active_message_types)) :
        echo '<p>'
             . esc_html__(
                 'This messenger is not currently used with any message types for templates but merely adds to the shortcodes available for templates on other messenger and message types.',
                 'event_espresso'
             )
             . '</p>';
    else : ?>
        <p class="active-on-message <?php echo esc_attr($hide_on_message); ?>">
            <?php printf(
                esc_html__(
                    'Below are message types that are currently %sactive%s with this messenger. Drag them over to the "Inactive Message Types" box to deactivate them.',
                    'event_espresso'
                ),
                '<strong>',
                '</strong>'
            );
            ?>
        <p>
        <div<?php if ($active) : ?>
            id="active-message-types"
        <?php endif; ?>
            class="mt-tab-container <?php echo esc_attr($hide_on_message); ?>"
        >
            <ul class="messenger-activation">
                <?php echo $active_message_types; // already escaped ?>
            </ul>
            <div class="ui-helper-clearfix"></div>
        </div>
    <?php endif; ?>
</div>
