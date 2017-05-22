<?php
/**
 * For displaying the migration page. Does not allow the user to migrate until all known EE
 * addons are updated from PUE. Using AJAX to run the migration and update the progress bar
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
 * @var string                        $migration_options_html
 */
if ($show_backup_db_text) { ?>
    <h1><span class="dashicons dashicons-migrate"></span><?php esc_html_e("Database Update Manager", "event_espresso"); ?>
    </h1>
<?php } ?>
<div class="padding">
    <div id="migration-prep">

        <?php if ($script_names) { ?>
            <h3 class="espresso-header">
                <span class="dashicons dashicons-flag ee-icon-size-22"></span>
                <?php
                echo apply_filters(
                        'FHEE__ee_migration_page__header',
                        sprintf(
                                esc_html__("Your Event Espresso data needs to be updated.", "event_espresso"),
                                $current_db_state,
                                $next_db_state
                        ),
                        $current_db_state,
                        $next_db_state
                );
                ?>
            </h3>
        <?php } elseif ($show_most_recent_migration) { ?>
            <h3 class="espresso-header">
                <span class="dashicons dashicons-awards ee-icon-size-22"></span>
                <?php echo apply_filters('FHEE__ee_migration_page__done_migration_header',
                        sprintf(esc_html__('Congratulations! Your database is "up-to-date" and you are ready to begin using %s',
                                "event_espresso"), $ultimate_db_state)); ?>
            </h3>
            <p>
                <?php echo apply_filters('FHEE__ee_migration_page__p_after_done_migration_header',
                        sprintf(esc_html__("Time to find out about all the great new features %s has to offer.",
                                "event_espresso"), $ultimate_db_state)); ?> &nbsp;
                <b><a id="get-started-after-migrate" class="button-primary"
                      href="<?php echo add_query_arg(array('page' => 'espresso_about'), admin_url('admin.php')); ?>">
                        <?php esc_html_e("Let's Get Started", "event_espresso"); ?>&nbsp;<span
                                class="dashicons dashicons-arrow-right ee-icon-size-22" style="margin:0;"></span>
                    </a></b>
            </p>
        <?php } ?>


        <?php if ($show_backup_db_text) {
            echo $migration_options_html;
        } ?>

        <?php
        if ($show_most_recent_migration) {
            if ($most_recent_migration && $most_recent_migration instanceof EE_Data_Migration_Script_Base) {
                if ($most_recent_migration->can_continue()) {
                    //tell the user they should continue their migration because it appears to be unfinished... well, assuming there were no errors ?>
                    <h3 class="espresso-header">
                        <span class="dashicons dashicons-star-half ee-icon-size-22"></span>
                        <?php printf(esc_html__("It appears that your previous Database Update (%s) is incomplete, and should be resumed",
                                "event_espresso"), $most_recent_migration->pretty_name()); ?>
                    </h3>
                <?php } elseif ($most_recent_migration->is_broken()) {
                    //tell the user the migration failed and they should notify EE?>
                    <h3 class="espresso-header">
                        <span class="dashicons dashicons-no ee-icon-size-22"></span>
                        <?php echo $most_recent_migration->get_feedback_message() ?>
                    </h3>
                <?php }
                //display errors or not of the most recent migration ran
                if ($most_recent_migration->get_errors()) { ?>
                    <div class="ee-attention">
                        <strong><?php printf(esc_html__("Warnings occurred during your last Database Update (%s):",
                                    'event_espresso'),
                                    $most_recent_migration->pretty_name()) ?></strong>
                        <a id="show-hide-migration-warnings" class="display-the-hidden"><?php esc_html_e("Show Warnings",
                                    'event_espresso'); ?></a>
                        <ul class="migration-warnings" style="display:none">
                            <?php foreach ($most_recent_migration->get_errors() as $error) { ?>
                                <li><?php echo htmlentities($error) ?></li>
                            <?php } ?>
                        </ul>
                    </div>
                <?php } else {
                    //there were no errors during the last migration, just say so?>
                    <h2><?php printf(esc_html__("The last Database Update (%s) ran successfully without errors.",
                                "event_espresso"), $most_recent_migration->pretty_name()) ?></h2>
                <?php }
            } else {
            }
        }
        // end of: if ( $show_most_recent_migration )
        ?>

    </div>
    <!--end of #migration-prep-->

    <?php if ($show_migration_progress) { ?>
        <div id='migration-monitor' <?php echo $show_backup_db_text ? "style='display:none'" : '' ?>>
            <?php if ($show_backup_db_text) { ?>
                <p>
                    <a class="toggle-migration-monitor small-text" style="cursor: pointer;">
                        <span class="dashicons dashicons-arrow-left-alt2"
                              style="top:0;"></span><?php esc_html_e("return to previous screen", "event_espresso"); ?>
                    </a>
                    <br/>

                </p>
            <?php } ?>
            <div id='progress-area'>
                <h3 class="espresso-header">
                    <?php
                    echo sprintf(_n(
                            "The following task needs to be performed:",
                            "The following %s tasks need to be performed:",
                            count($script_names),
                            "event_espresso"
                    ), count($script_names)); ?>
                </h3>
                <ul style="list-style: inside;">
                    <?php foreach ($script_names as $script_name) { ?>
                        <li style="margin: 0 0 1em 1em; line-height: 1.1em;"><?php echo $script_name ?></li>
                    <?php } ?>
                </ul>
                <br/>
                <?php if (count($script_names) > 1) { ?>
                    <p><?php esc_html_e("Please note: after each task is completed you will need to continue the Database Update, or report an error to Event Espresso.",
                                "event_espresso"); ?></p>
                <?php } ?>

                <div class="ee-attention">
                    <p>
					<span class="reminder-spn">
						<strong><?php esc_html_e("Please Note:", "event_espresso"); ?></strong>
					</span>
                        <br/>
                        <?php esc_html_e("Depending on the number of events and the complexity of the information in your database, this could take a few minutes.",
                                "event_espresso"); ?>
                    </p>
                    <p>
                        <?php printf(esc_html__("%sPlease be patient and do NOT navigate away from this page once the migration has begun%s. If any issues arise due to existing malformed data, an itemized report will be made available to you after the migration has completed.",
                                "event_espresso"), '<strong>', '</strong>'); ?>
                    </p>
                    <p>
                        <?php esc_html_e("Click the button below to begin the migration process.", "event_espresso") ?>
                    </p>
                </div>
                <div id="progress-responsive">
                    <figure>
                        <div id="progress-responsive__bar" style="background:#2EA2CC;"></div>
                        <div id="progress-responsive__percent"></div>
                    </figure>
                </div>
                <!-- #progress-responsive -->

                <button id='start-migration' class='button-primary'>
                    <?php echo $show_continue_current_migration_script ? esc_html__("Continue Database Update",
                            "event_espresso")
                            : esc_html__("Begin Database Update", "event_espresso"); ?>
                </button>
                <br class="clear"/>

            </div>

            <h2 id='main-message'>
                <!-- content dynamically added by js -->
            </h2>
            <div id='migration-messages' style='height:400px;overflow-y:scroll'>
                <!-- content dynamically added by js -->
            </div>

        </div>

    <?php }
    if ($show_maintenance_switch) {
        ?>
        <h2><span class="dashicons dashicons-admin-tools"></span><?php esc_html_e('Set Event Espresso Maintenance Mode',
                    'event_espresso'); ?></h2>
        <form method='post' action='<?php echo $update_migration_script_page_link ?>'>
            <div class="ee-table-wrap">
                <table>
                    <tr>
                        <td width="40px" align="center">
                            <input type="radio" id="maintenance_mode_level_off" name="maintenance_mode_level"
                                   value="0" <?php echo EE_Maintenance_Mode::instance()->level()
                                                        == EE_Maintenance_Mode::level_0_not_in_maintenance
                                    ? 'checked="checked"' : '' ?>>
                        </td>
                        <th align="left">
                            <label for="maintenance_mode_level_off"><?php esc_html_e('Maintenance Mode OFF',
                                        'event_espresso'); ?></label>
                            <p class='description' style="font-weight: normal;">
                                <?php esc_html_e("This is the normal operating mode for Event Espresso and allows all functionality to be viewed by all site visitors.",
                                        "event_espresso"); ?>
                            </p>
                        </th>
                    </tr>
                    <tr>
                        <td width="40px" align="center">
                            <input type="radio" id="maintenance_mode_level_on" name="maintenance_mode_level"
                                   value="1" <?php echo EE_Maintenance_Mode::instance()->level()
                                                        == EE_Maintenance_Mode::level_1_frontend_only_maintenance
                                    ? 'checked="checked"' : '' ?>>
                        </td>
                        <th align="left">
                            <label for="maintenance_mode_level_on">
                                <?php esc_html_e('Maintenance Mode ON', 'event_espresso') ?>
                            </label>
                            <p class='description' style="font-weight: normal;">
                                <?php esc_html_e("This disables Event Espresso frontend functionality for all site visitors that are not administrators, and allows you to configure and/or test things on the frontend of your website before others can see.",
                                        "event_espresso"); ?>
                            </p>
                        </th>
                    </tr>
                </table>
            </div>
            <p>
                <input type='submit' class="button-primary"
                       value='<?php esc_html_e("Update Maintenance Mode", "event_espresso"); ?>'>
            </p>
        </form>
        <?php
    } ?>

</div>
