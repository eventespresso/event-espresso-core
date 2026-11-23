<?php
/**
 * @var int    $colspan
 * @var string $file
 * @var bool   $is_active
 * @var string $plugin_name
 * @var string $requires_ee_core
 * @var string $slug
 * @var string $stable_version
 */
?>
<tr class="plugin-update-tr <?php echo $is_active ? 'active' : 'inactive'; ?>"
    id="<?php echo esc_attr($slug); ?>-update"
    data-slug="<?php echo esc_attr($slug); ?>"
    data-plugin="<?php echo esc_attr($file); ?>"
>
    <td colspan="<?php echo absint($colspan); ?>" class="plugin-update colspanchange">
        <div class="update-message notice inline notice-warning notice-alt">
            <p>
                <?php printf(
                    /* translators: 1: add-on name, 2: add-on version, 3: Event Espresso version */
                    esc_html__(
                        'Version %2$s of %1$s is available. It requires Event Espresso %3$s or higher. Update Event Espresso first.',
                        'event_espresso'
                    ),
                    esc_html($plugin_name),
                    esc_html($stable_version),
                    esc_html($requires_ee_core)
                ); ?>
            </p>
        </div>
    </td>
</tr>
