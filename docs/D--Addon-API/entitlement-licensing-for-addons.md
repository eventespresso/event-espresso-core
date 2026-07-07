# Entitlement Licensing for Add-ons

Event Espresso core ships with a small, add-on agnostic **entitlement service** that turns an
add-on's cached license verdict into a clear runtime decision: *may this add-on run its
licensed functionality right now?* It also provides grace periods so a site is never
abruptly cut off, and a ready-made persistent admin notice for the blocked state.

This guide explains the service and shows how to wire it into any new Event Espresso
add-on. The examples use a placeholder add-on slug (`eea-example`) — substitute your
own add-on's slug, namespace, and constants throughout.

> Namespace: `EventEspresso\core\domain\services\licensing\entitlement`
> Location: `core/domain/services/licensing/entitlement/`

## Table of Contents

- [When to use it](#when-to-use-it)
- [Components](#components)
- [How the state machine works](#how-the-state-machine-works)
- [Grace windows](#grace-windows)
- [Integrating into a new add-on](#integrating-into-a-new-add-on)
  - [1. Declare your Domain constants](#1-declare-your-domain-constants)
  - [2. Subclass the resolver](#2-subclass-the-resolver)
  - [3. Register the resolver as a shared service](#3-register-the-resolver-as-a-shared-service)
  - [4. Gate execution](#4-gate-execution)
  - [5. Wire the blocked admin notice](#5-wire-the-blocked-admin-notice)
- [Filtering the grace period](#filtering-the-grace-period)
- [Testing your resolver](#testing-your-resolver)
- [Method reference](#method-reference)

## When to use it

Use the entitlement service when your add-on has **gated functionality** that should stop
running once a license lapses — for example background delivery jobs, bulk processors,
test sends, or "run now" actions — while still allowing the operator to *see* their
existing setup and historical data.

It does **not** verify licenses or talk to the licensing API. It reads the license verdict
that core has already cached (via `LicenseKeyData`) and maps it to a decision. License
activation and remote verification are handled separately by core's licensing services.

## Components

| Class | Role |
| --- | --- |
| `EntitlementState` | Constants naming the five possible states. |
| `EntitlementStateResolver` (abstract) | The shared state machine. You subclass it once per add-on and supply five small values. |
| `EntitlementChecker` | Holds no state of its own. Wraps a resolver and answers the questions callers actually ask: `canExecute()`, `isBlocked()`, `canViewHistory()`, plus label/description for display. |
| `EntitlementNoticeSync` | Keeps one persistent admin notice in sync with the BLOCKED state — shows a warning when blocked, removes it otherwise. |

The five states (`EntitlementState`):

| State | Meaning | `canExecute()` |
| --- | --- | --- |
| `ACTIVE` | Licensed and valid. | yes |
| `INITIAL_GRACE` | Never licensed yet, still inside the initial grace window. | yes |
| `EXPIRED_GRACE` | License expired, still inside the post-loss grace window. | yes |
| `VERIFICATION_UNAVAILABLE` | A key is cached but the API returned no verdict (e.g. unreachable). Provisionally allowed. | yes |
| `BLOCKED` | Definitive negative verdict, or a grace window has ended. | **no** |

`canViewHistory()` always returns `true` — read-only history stays visible in every state,
including `BLOCKED`. Only forward-acting functionality should be gated on `canExecute()`.

## How the state machine works

`EntitlementStateResolver::resolveState()` reads the cached license object's `license`
status string and maps it as follows:

| Cached `license` status | Resulting state |
| --- | --- |
| `valid`, `active` | `ACTIVE` (and both grace windows are cleared) |
| `disabled`, `invalid`, `revoked`, `site_inactive` | `BLOCKED` |
| `expired` | enter the post-loss grace window → `EXPIRED_GRACE`, or `BLOCKED` once it ends |
| `none`, or empty with no cached license signal | enter the initial grace window → `INITIAL_GRACE`, or `BLOCKED` once it ends |
| empty *with* a cached license signal | `VERIFICATION_UNAVAILABLE` |
| any other non-empty status | `BLOCKED` |

The resolved state is memoized per resolver instance, so registering the resolver as a
shared service means the verdict (and any grace-window option writes) is computed once per
request.

## Grace windows

Two **independent** grace windows protect operators from sudden cut-off, each persisted in
its own WordPress option and each starting the first time it is entered:

- **Initial window** — for sites that have *never* been licensed for the add-on
  (`none`/empty status). Persisted in your `initialGraceOption()`.
- **Post-entitlement-loss window** — for sites whose license has *expired*. Persisted in
  your `postLossGraceOption()`.

Entering one window deletes the other's option, and returning to `ACTIVE` clears both.
Both default to the same length (`defaultGraceDays()`), filterable per add-on (see below).

## Integrating into a new add-on

### 1. Declare your Domain constants

Put the slug, grace-window option names, default length, and product label in your add-on's
`Domain` class:

```php
// plugins/eea-example/domain/Domain.php
const LICENSE_PLUGIN_NAME                        = 'Example Add-on';
const LICENSE_DATA_SLUG                          = 'example';
const OPTION_ENTITLEMENT_INITIAL_GRACE_STARTED   = 'eea_example_entitlement_initial_grace_started';
const OPTION_ENTITLEMENT_POST_LOSS_GRACE_STARTED = 'eea_example_entitlement_post_loss_grace_started';
const ENTITLEMENT_GRACE_DAYS_DEFAULT             = 30;
```

> **Slug gotcha:** `licenseSlug()` must return the key your license data is stored under in
> the `event-espresso-license-keys` option (`LicenseKeyData`).
> An add-on might register with `plugin_slug => 'eea-example'` yet store its
> license data under `'example'` — in which case `LICENSE_DATA_SLUG` is `'example'`, not
> `'eea-example'`. Confirm the actual stored key for your add-on.

Use option names unique to your add-on (prefix with your add-on slug) so two add-ons never
collide on grace state.

### 2. Subclass the resolver

All the state-machine logic lives in core. Your subclass just supplies five values, and may
optionally override the label/description copy to name your specific gated features:

```php
namespace EventEspresso\Example\domain\services\entitlement;

use EventEspresso\core\domain\services\licensing\entitlement\EntitlementStateResolver as CoreEntitlementStateResolver;
use EventEspresso\Example\domain\Domain;

class EntitlementStateResolver extends CoreEntitlementStateResolver
{
    protected function licenseSlug(): string        { return Domain::LICENSE_DATA_SLUG; }
    protected function initialGraceOption(): string { return Domain::OPTION_ENTITLEMENT_INITIAL_GRACE_STARTED; }
    protected function postLossGraceOption(): string{ return Domain::OPTION_ENTITLEMENT_POST_LOSS_GRACE_STARTED; }
    protected function defaultGraceDays(): int       { return Domain::ENTITLEMENT_GRACE_DAYS_DEFAULT; }
    protected function productLabel(): string        { return Domain::LICENSE_PLUGIN_NAME; }

    // Optional: override to name the exact features each state gates.
    public function currentStateDescription(): string { /* ... */ }
}
```

You do **not** write a constructor. The base resolver's constructor takes a core
`LicenseKeyData` dependency, which the loader auto-wires for you (next step).

### 3. Register the resolver as a shared service

Because the resolver memoizes its verdict, you want a single shared instance per request.
Resolve it through the loader wherever you need it:

```php
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\Example\domain\services\entitlement\EntitlementStateResolver;

$resolver = LoaderFactory::getShared(EntitlementStateResolver::class);
```

`LicenseKeyData` is auto-wired by reflection, so no explicit DI registration is required.

The `EntitlementChecker` holds no state of its own — it just wraps the resolver and
answers questions about it. Create a new one wherever you need it, passing in the shared
resolver, instead of registering the checker as shared:

```php
use EventEspresso\core\domain\services\licensing\entitlement\EntitlementChecker;

$checker = new EntitlementChecker(
    LoaderFactory::getShared(EntitlementStateResolver::class)
);
```

### 4. Gate execution

Guard your gated entry points with `canExecute()`, and stop early when it returns `false`:

```php
$checker = new EntitlementChecker(
    LoaderFactory::getShared(EntitlementStateResolver::class)
);

if (! $checker->canExecute()) {
    return; // license lapsed — skip the gated work
}
```

> Check once at the entry point, not in every helper. If several callers (cron, REST, CLI)
> reach the same gated operation, put the check in the one method they all call.

Gate only the **actions**, not viewing. Use `canExecute()` to hide or disable action
buttons — "Run now", "Replay", "Test send", "Edit", etc. — but use `canViewHistory()`
(always `true`) for list tables and detail views so existing data stays readable:

```php
$template_args['can_run_action'] = $checker->canExecute();
$template_args['can_view_list']  = $checker->canViewHistory();
```

### 5. Wire the blocked admin notice

`EntitlementNoticeSync` manages a single persistent notice for you. Supply a unique notice
id and the capability required to see it, then call `syncBlockedNotice()` on `admin_init`.
For example, from your add-on's registration method:

```php
use EventEspresso\core\domain\services\licensing\entitlement\EntitlementChecker;
use EventEspresso\core\domain\services\licensing\entitlement\EntitlementNoticeSync;

$notice_sync = new EntitlementNoticeSync(
    new EntitlementChecker(LoaderFactory::getShared(EntitlementStateResolver::class)),
    'eea-example-entitlement-blocked', // unique notice id
    'ee_read_example',                 // capability
    'view example entitlement notice'  // context
);
add_action('admin_init', [$notice_sync, 'syncBlockedNotice']);
```

The notice text comes from `currentStateDescription()`, so override that on your resolver
to describe exactly what is paused. The sync removes the notice automatically once the
add-on leaves the BLOCKED state.

## Filtering the grace period

Each add-on's grace length is filterable. The filter name is derived from the concrete
resolver class (backslashes replaced with underscores):

```
FHEE__<Fully_Qualified_Resolver_Class>__grace_days
```

For the example resolver above:

```php
add_filter(
    'FHEE__EventEspresso_Example_domain_services_entitlement_EntitlementStateResolver__grace_days',
    static function (int $days): int {
        return 14; // shorten both grace windows to 14 days
    }
);
```

The value is clamped to a minimum of 1 day. The same filtered length applies to both the
initial and post-loss windows, and to the day count quoted in the blocked-state admin
notice — so the number shown to the operator always matches the window actually enforced.

## Method reference

`EntitlementChecker`:

| Method | Returns | Notes |
| --- | --- | --- |
| `currentState()` | `string` | One of the `EntitlementState` constants. |
| `isBlocked()` | `bool` | True only in the `BLOCKED` state. |
| `canExecute()` | `bool` | True in every state except `BLOCKED`. Gate forward-acting features on this. |
| `canViewHistory()` | `bool` | Always `true`. |
| `currentStateLabel()` | `string` | Short human-readable label. |
| `currentStateDescription()` | `string` | Full admin-facing explanation. |

`EntitlementStateResolver` — abstract methods you must implement:

| Method | Returns | Supplies |
| --- | --- | --- |
| `licenseSlug()` | `string` | Storage key in the license-keys option. |
| `initialGraceOption()` | `string` | Option name for the initial grace window. |
| `postLossGraceOption()` | `string` | Option name for the post-loss grace window. |
| `defaultGraceDays()` | `int` | Default grace length (filterable). |
| `productLabel()` | `string` | Human-readable add-on name for copy. |

Optionally override `currentStateLabel()` and `currentStateDescription()` to tailor wording
to your add-on's gated features.
