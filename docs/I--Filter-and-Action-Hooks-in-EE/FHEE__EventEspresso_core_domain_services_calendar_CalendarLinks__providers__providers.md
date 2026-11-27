# FHEE__EventEspresso_core_domain_services_calendar_CalendarLinks__providers__providers

Filters the "Add to Calendar" providers offered by the `CalendarLinks` service, as an array of provider key => translated label. Remove a key to hide a provider everywhere (template tag, message shortcodes, add-ons), or add a key and supply its URL via `FHEE__EventEspresso_core_domain_services_calendar_CalendarLinks__url__url`.

`FHEE__EventEspresso_core_domain_services_calendar_CalendarLinks__providers__providers`

**Found in:** `core/domain/services/calendar/CalendarLinks.php`

**Parameters:** `array $providers` (core keys: `ics`, `google`, `outlook`, `office365`, `yahoo`)

## Usage Example:

```php
function my_calendar_providers(array $providers): array
{
    unset($providers['yahoo']);
    $providers['my_calendar'] = esc_html__('My Calendar', 'my-text-domain');
    return $providers;
}
add_filter(
    'FHEE__EventEspresso_core_domain_services_calendar_CalendarLinks__providers__providers',
    'my_calendar_providers'
);
```
