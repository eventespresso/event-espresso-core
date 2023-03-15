<?php
/**
 * @var $_venue EE_Venue
 */
?>
<p>
    <label for="url-event">
        <?php
        esc_html_e('URL of Event:', 'event_espresso'); ?>
    </label>
    <textarea id="url-event" cols="30" rows="4" tabindex="112" name="vnu_virtual_url"><?php
        echo esc_textarea($_venue->get_f('VNU_virtual_url'));
    ?></textarea>
</p>
<p>
    <label for="call-in-num">
        <?php
        esc_html_e('Call in Number:', 'event_espresso'); ?>
    </label>
    <input type="text"
           class="all-options"
           id="call-in-num"
           name="vnu_virtual_phone"
           tabindex="113"
           value="<?php $_venue->f('VNU_virtual_phone'); ?>"
    />
</p>