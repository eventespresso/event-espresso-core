# FHEE__espresso_add_to_calendar_links__html

Filters the HTML returned by the `espresso_add_to_calendar_links()` template tag (an `<ul class="ee-add-to-calendar-links">` list, or an empty string when no datetime is found). When echoed, the result is passed through `wp_kses()` with EE's allowed tags.

`FHEE__espresso_add_to_calendar_links__html`

**Found in:** `public/template_tags.php`

**Parameters:** `string $html`, `EE_Datetime|null $datetime`, `string[] $providers`

## Usage Example:

```php
function my_add_to_calendar_heading(string $html, ?EE_Datetime $datetime, array $providers): string
{
    return $html !== ''
        ? '<h4>' . esc_html__('Add to your calendar', 'my-text-domain') . '</h4>' . $html
        : $html;
}
add_filter('FHEE__espresso_add_to_calendar_links__html', 'my_add_to_calendar_heading', 10, 3);
```
