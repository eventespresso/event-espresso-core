<div class="changelog point-releases">
    <!-- <h3><?php echo esc_html(
        _n('Minor Release Information', 'Minor Releases', 1, 'event_espresso')
    ); ?></h3> -->
    <h3><?php echo esc_html(
        _n('Major Release Information', 'Major Releases', 1, 'event_espresso')
    ); ?></h3>
    <?php // $type = 'minor'; ?>
    <?php $type = 'major'; ?>
    <p><?php
        printf(
            esc_html__('%1$sVersion %2$s%3$s is a %4$s release.', 'event_espresso'),
            '<strong>',
            EVENT_ESPRESSO_VERSION,
            '</strong>',
            $type
        ); ?>
        <?php
        $ver = explode('.', EVENT_ESPRESSO_VERSION);
        array_pop($ver);
        $ver = implode('.', $ver);
        ?>
        <?php printf(
            esc_html__('For more information, see %1$sthe release notes%2$s.', 'event_espresso'),
            '<a href="http://eventespresso.com/wiki/ee4-changelog/#' . $ver . '" target="_blank" rel="noopener noreferrer">',
            '</a>'
        ); ?>
    </p>
</div><!-- end .changelog .point-releases -->

<div class="changelog">
    <?php
    // maintenance mode on?
    if (EE_Maintenance_Mode::instance()->level() == EE_Maintenance_Mode::level_2_complete_maintenance) {
        ?>
        <div class="ee-attention">
            <h2 class="ee-maintenance-mode-callout"><?php
                esc_html_e('Event Espresso is in full maintenance mode.', 'event_espresso');
            ?></h2>
            <p>
                <?php
                printf(
                    esc_html__(
                        'A previous version of Event Espresso has detected. But before anything else can happen, we need to know whether or not to migrate (copy over) your existing event data so that it can be utilized by EE4. For more instructions on what to do, please visit the %1$sEvent Espresso Maintenance%2$s page.',
                        'event_espresso'
                    ),
                    '<a href="admin.php?page=espresso_maintenance_settings">',
                    '</a>'
                );
                ?>
            </p>
        </div>
        <?php
    }
    ?>

    <h2 class="about-headline-callout">Updates &amp; Fixes in EE 4.11</h2>
    <p>This release introduces an improved event editor, support for recurring events, and improvements to existing core features. Here are the most interesting updates:</p>
    <h3>New Features</h3>
    <h4>Improved Event Editor and Support for Recurring Events</h4>
    <p>In this version of Event Espresso, we've made significant improvements to the event editor to provide an easier-to-understand datetime editor and to enable the Recurring Events Manager add-on for Event Espresso 4.</p>
    <p>In previous versions of Event Espresso 4, many users faced issues when adding a lot of datetimes and tickets to a single event, which caused the event editor to break due to common server limitations. The New Event Editor interface was created to solve that issue and give our users an easier-to-use interface for creating events, adding dates, and creating tickets.</p>
    <p>Using the built-in JavaScript/REACT components in WordPress, our development team has implemented the use of pop-up modal forms for creating events, which uses browser and server resources more efficiently when adding datetimes and assigning tickets to a single event. In addition to pop-up modals, we’ve added functionality to view dates in different formats and filter datetimes and tickets from within the editor. </p>
    <p align="right"><a href="https://eventespresso.com/?p=322471?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=release_announcement_april_2021_link&ap_id=EEspresso" target="_blank">Read More</a>
    <hr>
    
    <h2 class="about-headline-callout">New Add-on Available!</h2>

    <h3><a href="https://eventespresso.com/product/eea-recurring-events-manager/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=recurring_events_manager_addon_link&ap_id=EEspresso" target="_blank">Recurring Events Manager</a></h3>
    <p><a href="https://eventespresso.com/product/eea-recurring-events-manager/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=recurring_events_manager_addon_link&ap_id=EEspresso" rel="attachment" target="_blank"><img style="width: 380px; height: 250px; padding: 5px;" alt="Recurring Events Manager Add-on" class="alignright" src="https://cdn.eventespresso.com/wp-content/uploads/2021/04/01091938/recurring-events-manager_380_250.jpg" alt="Recurring Events Manager Add-on" width="380" height="250" /></a></p>
    <p>Put your events on autopilot by scheduling recurring events, weeks, months, or years in advance. With the Recurring Events Manager, Event Espresso will automatically open and close registrations for all of your recurring events.</p>
    <p>Here is an example to help you understand how the Recurring Events Manager can work for you:</p>
    <p>The Recurring Events Manager add-on is helpful for building out a set of events that share similar details but only differ in the dates they occur. The add-on works by using a new event date as a template and creates additional dates based on the schedule that you select (e.g. create event dates that span across a few weeks, a few months, a year, etc).
Create as many events in the future as you like. Event Espresso will automatically open and close registrations for all of your recurring events.</p>
    <p><strong>Get Started!</strong><br>
        Purchase the <a href="https://eventespresso.com/product/eea-recurring-events-manager/?ee_ver=ee4&utm_source=ee4_plugin_admin&utm_medium=link&utm_campaign=event_espresso_about_page&utm_content=recurring_events_manager_addon_link&ap_id=EEspresso" target="_blank">Recurring Events Manager Add-on</a> for Event Espresso 4.</p>

    
    <hr>
</div><!-- end .changelog -->
