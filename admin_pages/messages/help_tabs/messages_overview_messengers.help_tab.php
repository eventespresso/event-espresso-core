<p><strong><?php esc_html_e('Messengers', 'event_espresso'); ?></strong></p>
<p>
    <?php
    printf(
        esc_html__(
            'Messengers are the vehicles that deliver messages to individuals (recipients). By default, every install of Event Espresso has the %sEmail%s messenger active. The Email messenger is a vehicle for delivering messages.  Other possible vehicles might be any social media applications, 3rd party API\'s etc.',
            'event_espresso'
        ),
        '<strong>',
        '</strong>'
    );
    ?>
</p>