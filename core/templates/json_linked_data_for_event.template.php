<?php
defined('EVENT_ESPRESSO_VERSION') || exit;
/** @var array $event_tickets */
/** @var string $currency */
/** @var string $event_attendance_mode */
/** @var string $event_description */
/** @var string $event_end */
/** @var string $event_image */
/** @var string $event_name */
/** @var string $event_permalink */
/** @var string $event_start */
/** @var string $event_status */
/** @var string $venue_address */
/** @var string $venue_locality */
/** @var string $venue_name */
/** @var string $venue_region */
/** @var string $venue_url */
?>
<script type="application/ld+json">
{
  "@context": "http://schema.org/",
  "@type": "Event",
  "name": <?php echo wp_json_encode($event_name); ?>,
  "startDate": "<?php echo esc_html($event_start); ?>",
  "endDate": "<?php echo esc_html($event_end); ?>",
  "description": <?php echo wp_json_encode($event_description); ?>,
  "url": "<?php echo esc_url_raw($event_permalink); ?>",
  "eventAttendanceMode": "<?php echo esc_url_raw('https://schema.org/' . $event_attendance_mode); ?>",
  "eventStatus": [ <?php echo esc_html($event_status); ?> ],
  "offers": [
    <?php
    $i = 0;
    foreach ($event_tickets as $ticket) {?>
    {
      "@type": "Offer",
      "url": "<?php echo esc_url_raw($event_permalink); ?>",
      "validFrom": "<?php echo esc_html($ticket['start_date']); ?>",
      "validThrough": "<?php echo esc_html($ticket['end_date']); ?>",
      "price": "<?php echo esc_html($ticket['price']); ?>",
      "priceCurrency": "<?php echo esc_html($currency); ?>"
        <?php if (isset($ticket['availability'])) {
            ?>,"availability": "<?php echo esc_url_raw('https://schema.org/' . $ticket['availability']); ?>"
        <?php } ?>
    }<?php
    $i++;
    if ($i < count($event_tickets)) {
        echo ',';
    }
    }
    ?>
    ]<?php
    if ($venue_name) {
        ?>,
  "location": {
    "@type": "Place",
    "name": <?php echo wp_json_encode($venue_name); ?>,
    "url": "<?php echo esc_url_raw($venue_url); ?>",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": <?php echo wp_json_encode($venue_locality); ?>,
      "addressRegion": <?php echo wp_json_encode($venue_region); ?>,
      "streetAddress": <?php echo wp_json_encode($venue_address); ?>
    }
  }
        <?php
    } ?>
    <?php
    if ($event_image) {
        ?>,
  "image": "<?php echo $event_image; ?>"
        <?php
    } ?>
    <?php do_action('AHEE__json_linked_data_for_event__template'); ?>
}

</script>