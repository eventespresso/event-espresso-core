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
    <p><?php esc_htmlesc_html_e('Don\'t want to keep your old Event Espresso data? Alternatively, you can delete it all and start fresh.',
                'event_espresso'); ?> <a
                href=""><?php esc_htmlesc_html_e('Visit the Maintenance Page and Reset Your Event Espresso Data',
                    'event_espresso'); ?></a></p>
    <?php do_action('AHEE__ee_migration_page__after_migration_options_table'); ?>
</div>