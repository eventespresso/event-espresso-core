<?php
/**
 * For displaying the migration options when the old version was an EE3.x version. In this case we provide the option to
 * migrate, and also the option to just start using EE4 without migrating their EE3 data. If they choose to NOT migrate,
 * the EE3 data is left mostly intact (we do, however, rewrite some EE3 shortcodes into EE4 shortcodes though), so
 * it's mostly non-destructive (whereas this same option, when migrating from EE4.x to EE4.x+1, would really nuke all
 * the EE4 data).
 *
 * @var array                         $script_names array of strings
 * @var EE_Data_Migration_Script_Base $most_recent_migration
 * @var boolean                       $show_backup_db_text
 * @var boolean                       $show_continue_current_migration_script
 * @var boolean                       $show_most_recent_migration
 * @var boolean                       $show_maintenance_switch
 * @var boolean                       $show_migration_progress
 * @var string                        $update_migration_script_page_link
 * @var string                        $current_db_state
 * @var string                        $next_db_state
 * @var string                        $ultimate_db_state
 * @var string                        $reset_db_page_link
 */
?>

<div id="migration-options-dv">
    <h2>
        <span class="dashicons dashicons-admin-tools"></span>
        <?php esc_html_e("Migration Options", "event_espresso"); ?>
        <span class="tiny-text lt-grey-text"> &nbsp; <?php esc_html_e(' to migrate or not to migrate?',
                    "event_espresso"); ?></span>
    </h2>
    <div class="ee-table-wrap">
        <table>
            <tbody>
            <tr>
                <td><h3><?php esc_html_e('1', 'event_espresso'); ?></h3></td>
                <td>
                    <?php
                    echo apply_filters(
                            'FHEE__ee_migration_page__option_1_main',
                            sprintf(
                                    esc_html__('%1$sYes. I have backed up my database%2$s, %3$sunderstand the risks involved%4$s, and am ready to migrate my existing %5$s data to %6$s.',
                                            "event_espresso"),
                                    '<strong>',
                                    '</strong>',
                                    '<a id="migration-risks" class="" title="'
                                    . esc_attr__('click for more details', "event_espresso")
                                    . '">',
                                    '</a>',
                                    $current_db_state,
                                    $next_db_state
                            ),
                            $current_db_state,
                            $next_db_state
                    );
                    ?>
                    <a id="display-migration-details"
                       class="display-the-hidden lt-grey-text smaller-text hide-if-no-js"
                       rel="migration-details"><?php esc_html_e('click for more details', "event_espresso"); ?>
                        &nbsp;+</a>
                    <a id="hide-migration-details"
                       class="hide-the-displayed lt-grey-text smaller-text hide-if-no-js"
                       rel="migration-details"
                       style="display:none;"><?php echo sprintf(esc_html__('hide%1$sdetails%1$s-',
                                'event_espresso'), '&nbsp;'); ?></a>
                </td>
                <td>
                    <a id="db-backed-up"
                       class="toggle-migration-monitor button-primary"><?php echo apply_filters('FHEE__ee_migration_page__option_1_button_text',
                                sprintf(esc_html__("Migrate My %s Data to %s", "event_espresso"), $current_db_state,
                                        $next_db_state), $current_db_state, $next_db_state); ?></a>
                </td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 0">
                    <div id="migration-details-dv" style="display: none; padding: 1em;">
<span class="reminder-spn"><?php printf(esc_html__("%s Important: %s Before migrating, please back up your database and files.",
            "event_espresso"), "<b>", "</b>"); ?></span>
                        <p>
                            <?php
                            printf(
                                    esc_html__('%1$sNot sure how to backup your existing data?%2$s Here is %3$sWordPress\'s explanation%7$s, and here\'s %6$sour explanation%7$s.%8$sYou can also search the WordPress plugin database for %4$s database backup plugins %7$s,%8$sor have one of our dedicated support technicians help you by purchasing a %5$sPriority Support Token%7$s.',
                                            "event_espresso"),
                                    '<b>',
                                    '</b>',
                                    "<a href='http://codex.wordpress.org/Backing_Up_Your_Database'>",
                                    "<a href='"
                                    . admin_url('plugin-install.php?tab=search&type=term&s=database+backup&plugin-search-input=Search+Plugins')
                                    . "'>",
                                    "<a href='http://eventespresso.com/product/priority-support-tokens/'>",
                                    '<a href="http://eventespresso.com/wiki/how-to-back-up-your-site/">',
                                    "</a>",
                                    '<br/>'
                            );
                            ?>
                        </p>
                        <?php do_action('AHEE__ee_migration_page__option_1_extra_details'); ?>
                    </div>
                </td>
            </tr>
            <tr>
                <td><h3><?php esc_html_e('2', 'event_espresso'); ?></h3></td>
                <td>
                    <?php echo apply_filters('FHEE__ee_migration_page__option_2_main',
                            sprintf(esc_html__('I do NOT want to migrate my %1$s data to %2$s at this time and just want to use %3$s without migrating data.',
                                    "event_espresso"), $current_db_state, $next_db_state,
                                    $ultimate_db_state), $current_db_state, $next_db_state,
                            $ultimate_db_state); ?><br/>
                    <span class="reminder-spn"><?php esc_html_e('Please Note: In order to avoid errors, any existing Event Espresso data (events, ticket, registrations, etc) in your db will be erased! Regular WP data will NOT be affected.',
                                'event_espresso'); ?></span>
                    <a id="display-no-migration-details"
                       class="display-the-hidden lt-grey-text smaller-text hide-if-no-js"
                       rel="no-migration-details"><?php esc_html_e('click for more details', "event_espresso"); ?>
                        &nbsp;+</a>
                    <a id="hide-no-migration-details"
                       class="hide-the-displayed lt-grey-text smaller-text hide-if-no-js"
                       rel="no-migration-details"
                       style="display:none;"><?php echo sprintf(esc_html__('hide%1$sdetails%1$s-',
                                'event_espresso'), '&nbsp;'); ?></a>
                </td>
                <td>
                    <a id="do-not-migrate" class="do-not-migrate button-primary"
                       href="<?php echo $reset_db_page_link; ?>"><?php echo apply_filters('FHEE__ee_migration_page__option_2_button_text',
                                sprintf(esc_html__("Just Start %s and Delete Existing Data", "event_espresso"),
                                        $ultimate_db_state), $ultimate_db_state); ?></a>
                </td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 0">
                    <div id="no-migration-details-dv" style="display: none; padding: 1em;">
                        <p>
                            <?php echo apply_filters('FHEE__ee_migration_page__option_2_details',
                                    sprintf(esc_html__("If your existing Event and Registration Data is no longer relevant nor required, you can just start up %s without performing a data migration.",
                                            "event_espresso"), $ultimate_db_state), $ultimate_db_state); ?>
                        </p>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <?php do_action('AHEE__ee_migration_page__after_migration_options_table'); ?>
</div>