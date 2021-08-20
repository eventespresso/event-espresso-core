<?php

/**
 * This is the template for the html messenger and receipt message type attendee_list field.
 */

?>
<li class="ticket-registration">
    <table class="registration-details">
        <tr class="odd">
            <th><?php	_e('Attendee', 'event_espresso');?></th>
            <td>[FNAME] [LNAME] ([ATTENDEE_EMAIL])</td>
        </tr>
        <tr>
            <th><?php esc_html_e("Registration Code:", "event_espresso");?></th>
            <td>[REGISTRATION_CODE] - <span class="[REGISTRATION_STATUS_ID]">[REGISTRATION_STATUS_LABEL]</span></td>
        </tr>
    </table>
</li>