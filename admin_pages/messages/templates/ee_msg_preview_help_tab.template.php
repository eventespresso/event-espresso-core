<h2><?php esc_html_e('What the preview page shows', 'event_espresso'); ?></h2>
<p>
    <?php esc_html_e(
        'This page is accessed by clicking the preview button while editing a message template.  This feature has been created as a way of previewing what the final generated messages will look like when received.  Here\'s how the preview is prepared:',
        'event_espresso'
    ); ?>
</p>

<h3>
    <?php esc_html_e(
        '1. The system retrieves the appropriate template based on the given messenger, message type, and context',
        'event_espresso'
    ); ?>
</h3>
<p>
    <?php esc_html_e(
        'When you click the preview button, the messages system remembers what template is being "previewed" based on the messenger, message_type, context and event (if this is a custom event template).',
        'event_espresso'
    ); ?>
</p>

<h3><?php esc_html_e('2. Setup data.', 'event_espresso'); ?></h3>
<p>
    <?php esc_html_e(
        'Before any shortcodes in the template can be parsed, the previewer needs to know what data to use for the shortcodes.  Some of the data is dummy data that the previewer generates, but wherever possible the previewer will use ACTUAL data from your database.  For example, all the organization shortcodes will use actual data you\'ve setup for your organization.  For global template previews, the previewer will obtain the first active event from your database and use data from it.  If you are previewing a custom event template then THAT event will be used for the preview.  The only data that is dummy data is typically data that would be entered by a person registering for an event',
        'event_espresso'
    ); ?>
</p>

<h3><?php esc_html_e('3. Parse shortcodes', 'event_espresso'); ?></h3>
<p>
    <?php esc_html_e(
        'The previewer then goes through all the shortcodes in the template being previewed and replaces them using the prepared data. This is a good way of making sure that the shortcodes are working as you expect, and also clearly seeing what is being displayed for that shortcode when someone receives that message.',
        'event_espresso'
    ); ?>
</p>

<h3><?php esc_html_e('4. Display the preview!', 'event_espresso'); ?></h3>
<p>
    <?php esc_html_e(
        'An important thing to remember about the previewer is that for the most part, the previewer uses the same underlying system that will be used for actual outgoing messages, so you can be certain that what you see in the preview is what users will see when they receive the message.  It is yet another tool provided to make it easier for you to customize the look of your outgoing messages.',
        'event_espresso'
    ); ?>
</p>