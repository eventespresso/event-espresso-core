<?php
/**
 * For displaying the migration options when the old version was an EE4.x version. In this case we only provide
 * the admin the option to migrate, and if they really want to nuke all their EE4 data, there's a link to the maintenance
 * page.
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
    <div class="ee-table-wrap">
        <table>
            <tbody>
            <tr>
                <td>
                    <?php
                    echo apply_filters(
                            'FHEE__ee_migration_page__option_1_main',
                            esc_html__('Before updating your database, you should first create a database backup',
                                    "event_espresso"),
                            $current_db_state,
                            $next_db_state
                    );
                    ?>
                    <a id="display-migration-details"
                       class="display-the-hidden lt-grey-text smaller-text hide-if-no-js"
                       rel="migration-details"><?php esc_html_e('How Do I Make a Database Backup?', "event_espresso"); ?>
                        &nbsp;+</a>
                </td>
                <td>
                    <a id="db-backed-up"
                       class="toggle-migration-monitor button-primary"><?php echo apply_filters('FHEE__ee_migration_page__option_1_button_text',
                                sprintf(esc_html__("My Database Is Backed Up, Continue", "event_espresso"), $current_db_state,
                                        $next_db_state), $current_db_state, $next_db_state); ?></a>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="padding: 0">
                    <div id="migration-details-dv" style="display: none; padding: 1em;">
                        <p>
                            <?php
                            printf(
                                    esc_html__('%1$sClick Here to Learn How To Backup your Database Yourself%2$s. Or have one of our dedicated support technicians help you by %3$spurchasing a Priority Support Token.%2$s',
                                            "event_espresso"),
                                    '<a target="_blank" href="http://eventespresso.com/wiki/how-to-back-up-your-site/">',
                                    "</a>",
                                    "<a target=\"_blank\" href='http://eventespresso.com/product/priority-support-tokens/'>"
                            );
                            ?>
                        </p>
                        <?php do_action('AHEE__ee_migration_page__option_1_extra_details'); ?>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <p><?php esc_html_e('Don\'t want to keep your old Event Espresso data? Alternatively, you can delete it all and start fresh.',
                'event_espresso'); ?> <a
                href="<?php echo $data_reset_page;?>"><?php esc_html_e('Visit the Maintenance Page and Reset Your Event Espresso Data',
                    'event_espresso'); ?></a></p>
    <?php do_action('AHEE__ee_migration_page__after_migration_options_table'); ?>
</div>