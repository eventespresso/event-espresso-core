<table class="form-table">
    <tr>
        <td valign="top">
            <fieldset>
                <p>
                    <label for="url-event" style="display:inline-block; width:100px; vertical-align:top;">
                        <?php esc_html_e('URL of Event:', 'event_espresso'); ?>
                    </label>
                    <?php //phpcs:disable Generic.Files.LineLength.TooLong
                    // no new lines within <textarea> here because they'll output whitespace ?>
                    <textarea id="url-event" cols="30" rows="4" tabindex="112" name="vnu_virtual_url"><?php $_venue->f('VNU_virtual_url'); ?></textarea>
                    <?php //phpcs:enable ?>
                </p>
                <p>
                    <label for="call-in-num" style="display:inline-block; width:100px;">
                        <?php esc_html_e('Call in Number:', 'event_espresso'); ?>
                    </label>
                    <input id="call-in-num" class="all-options" tabindex="113" type="text"
                           value="<?php $_venue->f('VNU_virtual_phone'); ?>" name="vnu_virtual_phone"/>
                </p>
            </fieldset>
        </td>
    </tr>
</table>