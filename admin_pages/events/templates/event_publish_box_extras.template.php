<?php
/**
 * @var string $approved_regs
 * @var string $event_editor_overview_add
 * @var string $not_approved_regs
 * @var string $pending_payment_regs
 * @var string $view_approved_reg_url
 * @var string $view_not_approved_reg_url
 * @var string $view_pending_payment_reg_url
 */
?>
<div class="misc-pub-section">
    <span class="dashicons dashicons-groups ee-icon-color-ee-green ee-icon-size-20"></span>
    <a href="<?php echo esc_url_raw($view_approved_reg_url); ?>" target="_blank">
        <?php printf(
            esc_html__('%s Registrations', 'event_espresso'),
            EEH_Template::pretty_status(EEM_Registration::status_id_approved, false, 'sentence')
        ); ?>
    </a>
    :
    <?php echo absint($approved_regs); ?>
</div>
<div class="misc-pub-section">
    <span class="dashicons dashicons-groups ee-icon-color-ee-blue ee-icon-size-20"></span>
    <a href="<?php echo esc_url_raw($view_pending_payment_reg_url); ?>" target='_blank'>
        <?php printf(
            esc_html__('%s Registrations', 'event_espresso'),
            EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, false, 'sentence')
        ); ?>
    </a>
    :
    <?php echo absint($pending_payment_regs); ?>
</div>
<div class="misc-pub-section">
    <span class="dashicons dashicons-groups ee-icon-color-ee-orange ee-icon-size-20"></span>
    <a href="<?php echo esc_url_raw($view_not_approved_reg_url); ?>" target='_blank'>
        <?php printf(
            esc_html__('%s Registrations', 'event_espresso'),
            EEH_Template::pretty_status(EEM_Registration::status_id_not_approved, false, 'sentence')
        ); ?>
    </a>
    :
    <?php echo absint($not_approved_regs); ?>
</div>

<?php echo esc_html($event_editor_overview_add); ?>
<br />
