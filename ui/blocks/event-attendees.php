<?php

/**
 * Template for EventAttendees block render
 * Template variables passed in:
 *
 * @type EE_Attendee[] $attendees
 * @type array         $attributes  Original attributes saved for the block.
 * @throws EE_Error
 */

?>
<div id="ee-block-event-attendees" class="ee-core-blocks event-espresso-blocks event-attendees">
    <ul>
        <?php
        foreach ($attendees as $attendee) {

            $attendee_name = esc_html($attendee->full_name());

            $gravatar = $attributes['showGravatar']
                ? get_avatar_url(
                    $attendee->email(),
                    array(
                        'width'   => $attributes['avatarSize'],
                        'height'  => $attributes['avatarSize']
                    )
                )
                : '';

            $gravatar_class = $attributes['avatarClass']
                ? $attributes['avatarClass'] . ' contact-avatar-img avatar'
                : 'contact-avatar-img avatar';

            $gravatar = $gravatar !== ''
                ? '
                <div class="contact-image-wrap-div">
                    <img class="' . esc_attr($gravatar_class) . '"
                         width="' . esc_attr($attributes['avatarSize']) . '"
                         height="' . esc_attr($attributes['avatarSize']) . '"
                         src="' . esc_url_raw($gravatar) . '" 
                         alt="contact avatar"
                     >
                 </div>'
                : '';

            echo "
            <li>
                {$gravatar}<span>{$attendee_name}</span>
            </li>";
        }
        ?>
    </ul>
</div>
