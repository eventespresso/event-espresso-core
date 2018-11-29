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
                ? '<div class="contact-image-wrap-div">'
                    . '<img class="' . $gravatar_class . '"'
                    . ' width="' . $attributes['avatarSize'] . '"'
                    . ' height="' . $attributes['avatarSize'] . '"'
                    . ' src="' . $gravatar . '" alt="contact avatar">'
                    . '</div>'
                : '';
            echo "<li>{$gravatar}<span>{$attendee->full_name()}</span>";
        }
        ?>
    </ul>
</div>
