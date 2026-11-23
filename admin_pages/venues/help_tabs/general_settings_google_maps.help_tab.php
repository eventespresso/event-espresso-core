<p>
    <strong><?php esc_html_e('Google Maps', 'event_espresso'); ?></strong>
</p>
<p>
    <?php esc_html_e(
        'This page shows options for Google Maps. You can activate Google Maps by setting the toggle to Yes and clicking on the Save button to update settings.',
        'event_espresso'
    ); ?>
</p>
<p>
    <strong><?php esc_html_e('Map Mode', 'event_espresso'); ?></strong>
    <br />
    <?php esc_html_e(
        'Simple mode is the default for new sites. It draws the venue map with the Google Maps Embed API, which Google provides free of charge. A site that had a Google Maps API key before map modes existed stays on Advanced mode until you choose Simple. Advanced mode uses the paid Maps JavaScript, Geocoding and Static Maps APIs and adds the navigation and map type controls. Those settings apply to Advanced mode only and show after you save Advanced. Every map needs a Google Maps API key with the APIs of the selected mode enabled.',
        'event_espresso'
    ); ?>
</p>
<p>
    <?php esc_html_e(
        'The map options allow you to configure how your event map is displayed. You may configure your events lists and event registration pages independently of each other. For an event to display a Google Map you must have it enabled in the event editor or in the venue metabox. This allows you to select which events you would like to display with a map.',
        'event_espresso'
    ); ?>
</p>
<p>
    <strong><?php esc_html_e('Map Settings for Registration Page & Event List Options', 'event_espresso'); ?></strong>
</p>
<ul>
    <li>
        <strong><?php esc_html_e('Set Map Width', 'event_espresso'); ?></strong>
        <br />
        <?php printf(
            /* translators: 1: default registration page map width, 2: default registration page map height, 3: default event list map width, 4: default event list map height, 5: smallest map size in Simple mode. All in pixels. */
            esc_html__(
                'You may set a pixel width for your map. This should be entered as a numeric value with no other characters. If a value is not set then default ones are used -- registration page maps are %1$d by %2$d pixels and events list maps are %3$d by %4$d pixels. In Simple mode a map is never smaller than %5$d pixels in either direction.',
                'event_espresso'
            ),
            absint(EE_Map_Config::DEFAULT_MAP_WIDTH_EVENT_POST),
            absint(EE_Map_Config::DEFAULT_MAP_HEIGHT_EVENT_POST),
            absint(EE_Map_Config::DEFAULT_MAP_WIDTH_EVENT_LIST),
            absint(EE_Map_Config::DEFAULT_MAP_HEIGHT_EVENT_LIST),
            absint(EEH_Maps::EMBED_MAP_MIN_SIZE)
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Set Map Height', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'This setting is similar to set map width except it is for the map height. Maps will display best when matching dimensions are used.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Set Map Zoom', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'Zoom level is the level of detail that is shown when the map first renders. A smaller value means you zoom out and therefore see a wider area. A higher value means that you zoom in and see the actual address in finer detail. A default value of 12 is recommended.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Set Map Navigation Overlay', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'The navigation overlay are the controls for panning and zooming the map. Advanced mode only.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Keep Map Navigation Small', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'Keep map navigation small tells Google to only load the smaller map overlay regardless of map size. Google changes various options according to the size of a map. If you want to stop this change from happening, you can set this option to yes. Advanced mode only.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Set Map Type Control', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'The map type control is the options bar that Google sets in the top right corner. This can appear as a dropdown or horizontal bar. Advanced mode only.',
            'event_espresso'
        ); ?>
    </li>
    <li>
        <strong><?php esc_html_e('Set Map Alignment', 'event_espresso'); ?></strong>
        <br />
        <?php esc_html_e(
            'Alignment allows you to move the map left, center, or right within the parent event structure. The default alignment is left.',
            'event_espresso'
        ); ?>
    </li>
</ul>
<p>
    <strong><?php esc_html_e('Recommendations', 'event_espresso'); ?></strong>
    <br />
    <?php esc_html_e(
        'To learn more about the options on this page, take a look at the different tabs that appear on the left side of the page.',
        'event_espresso'
    ); ?>
</p>
<p>
    <strong><?php esc_html_e('Screen Options', 'event_espresso'); ?></strong>
    <br />
    <?php esc_html_e(
        'You can customize the information that is shown on this page by toggling the Screen Options tab. Then you can add or remove checkmarks to hide or show certain content.',
        'event_espresso'
    ); ?>
</p>