<?php
/**
 * @var string $img1
 * @var string $img2
 * @var string $img3
 * @var string $img4
 */
?>

<h2><?php esc_html_e('About the Messages Settings Page', 'event_espresso'); ?></h2>
<p>
    <?php esc_html_e('Here are a few things you should know about the Messages Settings:', 'event_espresso'); ?>
</p>

<h3><?php esc_html_e('1. Defaults', 'event_espresso'); ?></h3>
<p>
    <?php esc_html_e(
        'When Event Espresso is first activated, the plugin takes care of setting up the core messenger (Email) and message types (Registration, and Payment).  This is so users don\'t have to worry about any setup of templates etc. and it just works right out of the box.  So when you first visit the page you\'ll see the Email messenger displayed with those two message types in the "Active" area for that messenger',
        'event_espresso'
    ); ?>
</p>
<h3><?php esc_html_e('2. Activating or Deactivating Messengers', 'event_espresso'); ?></h3>
<p>
    <?php esc_html_e(
        'You can select messengers via the tabs across the top of the settings page.  The available messengers you see depends on what version of Event Espresso you have and what addons are installed.  Every install will see at the very least an "Email" messenger tab.  When you click one of those tabs it will display that messenger.',
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
    <?php echo esc_html($img1);
    esc_html_e('The green colored gear indicates that this messenger is currently active.', 'event_espresso');
    echo esc_html($img2);
    esc_html_e(
        'Here the white colored gear indicates the messenger is inactive. This is very helpful for seeing at a glance all the messengers that are active when you first view the page.',
        'event_espresso'
    ); ?>
</p>
<p>
    <?php esc_html_e(
        'The second way to determine whether a messenger is active or not is via the "on/off" button in the top right corner of the active messenger displayed content:',
        'event_espresso'
    ); ?>
</p>
<p>
    <?php echo esc_html($img3);
    printf(
        esc_html__(
            'On means of course that the messenger is active and %s means the messenger is inactive.',
            'event_espresso'
        ),
        $img4
    ); ?>
</p>
<p>
    <?php esc_html_e(
        'Incidentally, the on/off toggle is also what you use to activate or deactivate a messenger.',
        'event_espresso'
    ); ?>
</p>
<p>
    <?php esc_html_e(
        'What happens when you click the toggle to activate is the messenger is activated and the system determines what default message types are activated with the messenger.  Then, if there are any default settings for either the messenger or message types those settings are saved.  Next, the system will generate any default templates (if none have been generated before, if there are previously generated templates then they are reactivated).  Finally, you will see the display change to reflect that the messenger is active. If the messenger has settings you can modify them then.  Any message types that have settings will also automatically expand so you can see the default settings and make any changes as necessary to fit your needs. Usually the defaults are sufficient however.',
        'event_espresso'
    ); ?>
</p>
<p>
    <?php esc_html_e(
        'When you deactivate a messenger, the system will first check if there are any custom event templates for that messenger.  If there are you will be unable to deactivate the messenger.  This is a fail safe to make sure you know that no messages will go out for those specific events so you don\'t accidentally deactivate.  If this check passes, then the system will deactivate any global templates for that messenger (note the templates are not erased, they just become inactive, so if you decide to reactivate the messenger later all your customizations are preserved). Then the display will change to reflect the deactivation.',
        'event_espresso'
    ); ?>
</p>
<p>
    <?php printf(
        esc_html__(
            '%sVery important!%s Although customizations made to global templates are preserved when a messenger is deactivated, any settings for that messenger (or the message types that were attached to it) are lost on deactivation.  Keep that in mind. Also, once you deactivate a messenger, no more messages will be delivered using that messenger for any of your events.',
            'event_espresso'
        ),
        '<strong>',
        '</strong>'
    ); ?>
</p>
<h3><?php esc_html_e('3. Activating or Deactivating Message Types', 'event_espresso'); ?></h3>
<p>
    <?php esc_html_e(
        'There may be times where you just want to deactivate (or activate new) message types for a particular messenger.  The messages system makes it super easy to do so.  To deactivate, what you do is drag the message type box from the "active area" below the messenger description (of an active messenger) into the "inactive" area in the right sidebar.  To activate you do the reverse.  Just remember that when you deactivate a message type, if that message type has any settings, the settings will be lost.  However, any message templates that match the messenger and message type you deactivated will be preserved, they are just marked "inactive" in the database',
        'event_espresso'
    ); ?>
</p>