# Opting a WP_Query out of EE's CPT query filters

Event Espresso adds SQL to events queries during a request. The first `espresso_events` `WP_Query` of the request builds `EE_CPT_Event_Strategy`, which attaches persistent `posts_*` filters. They add a datetime `INNER JOIN` (which drops events that have no datetimes), expired-event and expired-ticket conditions, `event_start_date` ordering and a `GROUP BY` to every query whose `is_espresso_event_*` flag is set: the query the strategy was built with, when the request is a singular page, the events archive or an event-category archive (the flags come from the global conditionals), and any event-category taxonomy query. On the events archive and inside the `[ESPRESSO_EVENTS]` shortcode, `EEH_Event_Query` adds its list clauses to every secondary events query as well.

Code that runs its own events query (a page builder loop, a widget, an export) can opt that one query out of all of the above by setting the query var named by `EventEspresso\core\CPTs\CptQueryFilters::suppressFiltersQueryVarName()` to `true`:

```php
use EventEspresso\core\CPTs\CptQueryFilters;

$events = new WP_Query(
    [
        'post_type'                                    => 'espresso_events',
        CptQueryFilters::suppressFiltersQueryVarName() => true,
    ]
);
```

What an opted-out query still gets:

- `CptQueryModifier`'s post decoration: `$post->EE_Event` (or `$post->EE_Venue` for a venue query) on its posts. The decoration runs in bulk on the first query of each post type in the request; later events queries get `$post->EE_Event` lazily from the `the_post` action
- term, taxonomy and paging handling from `EE_CPT_Strategy::pre_get_posts()`
- the maintenance-mode template reroute while Event Espresso is in maintenance mode

What it does not get:

- the `posts_fields`, `posts_join`, `posts_where`, `posts_orderby` and `posts_groupby` SQL from `EE_CPT_Event_Strategy`
- the list clauses from `EEH_Event_Query`, even while the request-wide `FHEE__EEH_Event_Query__apply_query_filters` override is active: the opt-out is checked first, so that filter is not applied at all for an opted-out query

Rules:

- The var is code-only. It is not a registered public query var and is never read from the request, so `?espresso_suppress_query_filters=1` in a URL has no effect.
- The value is evaluated as a boolean: `true`, `1`, `"1"` and `"true"` opt out; `false`, `"false"`, `"0"` and `""` do not.
- Run opted-out queries after the main query has been parsed (the `wp` action or later). The first events query of a request builds the strategy from the global conditionals, and a query that runs earlier (for example on `init`) builds it with the wrong flags for the rest of the request.
- Strategies and add-ons test the flag with `CptQueryFilters::suppressFilters($wp_query)`, which returns `false` when called with no argument or `null`.
