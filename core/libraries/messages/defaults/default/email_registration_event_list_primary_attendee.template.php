<div class="content">
    <table>
        <tbody>
            <tr>
                <td>
                    <p class="callout"><strong><?php esc_html_e('Event:', 'event_espresso'); ?> [EVENT_LINK]
                            <?php esc_html_e('Venue:', 'event_espresso'); ?>
                            <a href="[VENUE_URL]" target="_blank">[VENUE_TITLE]</a> ([VENUE_CITY], [VENUE_STATE])</strong>
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<div class="column-wrap">
    <div class="column">
        <table align="left">
            <tbody>
                <tr>
                    <td>
                        <h3><?php esc_html_e('Registrant(s):', 'event_espresso'); ?></h3>
                        [ATTENDEE_LIST]
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="column">
        <table align="left">
            <tbody>
                <tr>
                    <td>
                        <ul class="sidebar">
                            <li><h5><?php esc_html_e('Venue', 'event_espresso'); ?> »</h5></li>
                            <li>[VENUE_IMAGE]</li>
                            <li>[VENUE_TITLE]</li>
                            <li>[VENUE_ADDRESS]</li>
                            <li>[VENUE_CITY]</li>
                            <li>[VENUE_STATE], [VENUE_ZIP]</li>
                            <li><a href="[GOOGLE_MAP_URL]"><?php esc_html_e('Map and Directions', 'event_espresso'); ?></a></li>
                        </ul>
                        <table class="social" width="100%" bgcolor="">
                            <tbody>
                                <tr>
                                    <td>
                                        <table width="100%" align="left">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <h6><?php esc_html_e('Connect with this Event:', 'event_espresso'); ?></h6>
                                                        <a class="soc-btn fb" href="[EVENT_FACEBOOK_URL]"><?php esc_html_e('Facebook', 'event_espresso'); ?></a>
                                                        <a class="soc-btn tw" href="[EVENT_TWITTER_URL]"><?php esc_html_e('Twitter', 'event_espresso'); ?></a>
                                                        <h6><?php esc_html_e('Contact Info:', 'event_espresso'); ?></h6>
                                                        <?php esc_html_e('Phone:', 'event_espresso'); ?>
                                                        <strong>[EVENT_PHONE]</strong>
                                                        <?php esc_html_e('Email:', 'event_espresso'); ?>
                                                        <strong><a href="mailto:[EVENT_AUTHOR_EMAIL]">[EVENT_AUTHOR_EMAIL]</a></strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="clear"></div>
</div>