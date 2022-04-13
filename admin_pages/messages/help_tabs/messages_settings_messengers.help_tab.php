<p>
    <strong><?php esc_html_e('Activating / Deactivating Messengers', 'event_espresso'); ?></strong>
</p>
<p>
    <?php esc_html_e(
        'You can select Messengers via the tabs across the top of the settings page. The available messengers you see depends on what version of Event Espresso you have and what addons are installed. Every install include an "Email" messenger tab.  When you click one of those tabs it will display that messenger.',
        'event_espresso'
    ); ?>
</p>
<p>
    <?php esc_html_e(
        'There are two ways to determine whether a messenger is active or not.  The first way is via the messenger tab itself.',
        'event_espresso'
    ); ?>
</p>
<p>
    <?php printf(
        esc_html__(
            'The green colored gear %s indicates that this messenger is currently active.',
            'event_espresso'
        ),
        '<img class="inline-text" src="' . EE_MSG_ASSETS_URL . 'images/email-tab-active.png' . '"'
        . ' alt="' . esc_attr__('Active Email Tab', 'event_espresso') . '" />'
    );
    printf(
        esc_html__(
            ' The white colored gear %s indicates the messenger is inactive. This is very helpful for seeing at a glance all the messengers that are active when you first view the page.',
            'event_espresso'
        ),
        '<img class="inline-text" src="' . EE_MSG_ASSETS_URL . 'images/email-tab-inactive.png'
        . '" alt="' . esc_attr__('Inactive Email Tab', 'event_espresso') . '" />'
    ); ?>
</p>
<p>
    <?php esc_html_e(
        'The second way to determine whether a messenger is active or not is via the "on/off" button in the top right corner of the active messenger displayed content:',
        'event_espresso'
    ); ?>
</p>
<p>
    <?php printf(
        esc_html__(
            '%1$s means of course that the messenger is active and %2$s means the messenger is inactive.',
            'event_espresso'
        ),
        '<div class="switch">'
        . '<input class="ee-on-off-toggle ee-toggle-round-flat" type="checkbox" checked disabled>'
        . '<label for="ee-on-off-toggle-on"></label>'
        . '</div>',
        '<div class="switch">'
        . '<input class="ee-on-off-toggle ee-toggle-round-flat" type="checkbox" disabled>'
        . '<label for="ee-on-off-toggle-on"></label>'
        . '</div>'
    ); ?>
</p>
<p>
    <?php
    esc_html_e(
        'The on/off toggle is also what you use to activate or deactivate a messenger.',
        'event_espresso'
    ); ?>
</p>
<p>
    <?php esc_html_e(
        'What happens when you click the toggle to activate is the messenger is activated and the system determines what default message types are activated with the messenger.  Then, if there are any default settings for either the messenger or message types those settings are saved.  Next, the system will generate any default templates (if none have been generated before, if there are previously generated templates then they are reactivated).  Finally, you will see the display change to reflect that the messenger is active. If the messenger has settings you can modify them then. Any message types that have settings will also automatically expand so you can see the default settings and make any changes as necessary to fit your needs. Usually the defaults are sufficient however.',
        'event_espresso'
    ); ?>
</p>
<p>
    <?php esc_html_e(
        'When you deactivate a messenger, the system will first check if there are any custom event templates for that messenger. If there are you will be unable to deactivate the messenger. This is a fail safe to make sure you know that no messages will go out for those specific events so you don\'t accidentally deactivate.  If this check passes, then the system will deactivate any global templates for that messenger (note the templates are not erased, they just become inactive, so if you decide to reactivate the messenger later all your customizations are preserved). Then the display will change to reflect the deactivation.',
        'event_espresso'
    ); ?>
</p>
<p>
    <strong><?php esc_html_e('Important', 'event_espresso'); ?></strong><br />
    <?php esc_html_e(
        'Although customizations made to global templates are preserved when a messenger is deactivated, any settings for that messenger (or the message types that were attached to it) are lost on deactivation.  Also, once you deactivate a messenger, no more messages will be delivered using that messenger for any of your events.',
        'event_espresso'
    ); ?>
</p>
