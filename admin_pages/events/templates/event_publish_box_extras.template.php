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
    <span class="dashicons dashicons-groups ee-status-color--RAP"></span>
    <a class='ee-reg-list-link ee-status-color--RAP'
       href="<?php echo esc_url_raw($view_approved_reg_url); ?>"
       target="_blank"
    >
        <span class='ee-reg-list-link__reg-count'><?php echo absint($approved_regs); ?></span>
        <?php printf(
            esc_html__('%s Registrations', 'event_espresso'),
            EEH_Template::pretty_status(EEM_Registration::status_id_approved, false, 'sentence')
        ); ?>
        <span class='dashicons dashicons-external'></span>
    </a>
</div>
<div class="misc-pub-section">
    <span class="dashicons dashicons-groups ee-status-color--RPP"></span>
    <a class='ee-reg-list-link ee-status-color--RPP'
       href="<?php echo esc_url_raw($view_pending_payment_reg_url); ?>"
       target='_blank'
    >
        <span class='ee-reg-list-link__reg-count'><?php echo absint($pending_payment_regs); ?></span>
        <?php printf(
            esc_html__('%s Registrations', 'event_espresso'),
            EEH_Template::pretty_status(EEM_Registration::status_id_pending_payment, false, 'sentence')
        ); ?>
        <span class='dashicons dashicons-external'></span>
    </a>
</div>
<div class="misc-pub-section">
    <span class="dashicons dashicons-groups ee-status-color--RNA"></span>
    <a class='ee-reg-list-link ee-status-color--RNA'
       href="<?php echo esc_url_raw($view_not_approved_reg_url); ?>"
       target='_blank'
    >
        <span class='ee-reg-list-link__reg-count'><?php echo absint($not_approved_regs); ?></span>
        <?php printf(
            esc_html__('%s Registrations', 'event_espresso'),
            EEH_Template::pretty_status(EEM_Registration::status_id_not_approved, false, 'sentence')
        ); ?>
        <span class='dashicons dashicons-external'></span>
    </a>

</div>

<?php echo $event_editor_overview_add; ?>
