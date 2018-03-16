# Contexts and Context Checkers

Sometimes we need to make a decision somewhere in our code but the raw data available doesn't provide enough insight into what is going on, and in order to effectively influence what should happen next, we really need to know **why** something is happening.

For example, in Event Espresso, we use status IDs to identify the state of an object, so a registration could have a status of Incomplete (RIC), or Pending Payment (RPP), or Approved (RAP), or many others. When changing the status for a registration, sometimes it's beneficial to know **why** the status is changing. Is a Registration being cancelled because the attendee themselves clicked on a link to do so, or were they transferred to another event by the admin, or maybe their cheque bounced again, and we don't feel like playing games with them anymore? The context for the change may influence what we do next.


### Context objects

The Context class is a simple Data Transfer Object (DTO) for conveying the background details about why some other logic is being performed, that can assist with the decision making process or simply enhance logging. In order to create one, you need to provide a "slug" and a "description". 

```php
$context = new EventEspresso\core\domain\entities\contexts\Context(
    'context-slug',
    'description of this context'
);
```
 
 The context slug will be used by other systems for identifying the current context, and the description will likely only be used for logging purposes. This however can allow us to make better decisions in other places in our code.
 
 ```php
$context = new EventEspresso\core\domain\entities\contexts\Context(
    'admin-registration-status-change',
    'Registration status was changed by an admin'
);
$registration->set_status('RIC', false, $context);

// somewhere else in code
if ($registration->STS_ID === 'RIC' && $context->slug === 'admin-registration-status-change') {
    // do something... 
}
```

Knowing that the registration was cancelled by an admin allows us to take action we possibly wouldn't otherwise perform (like send an email?).

Checking the context like this manually is fine when we only want to compare against a single value, but what if we needed to compare against multiple values?

 ```php
if (
    $registration->STS_ID === 'RIC' && (
        $context->slug === 'admin-registration-status-change'
        || $context->slug === 'automated-registration-status-change'
        || $context->slug === 'wait-list-registration-status-change'
    )
) {
    // do something... 
}
```

Now we need to complicate our conditional with all kinds of extra clauses. But what happens if we **also** need to be able to filter those conditions?

 ```php
if (
    $registration->STS_ID === 'RIC' && (
        apply_filters(
            'FHEE__Fully_Qualified_Classname__method__registration_cancelled__context',
            $context->slug === 'admin-registration-status-change'
            || $context->slug === 'automated-registration-status-change'
            || $context->slug === 'wait-list-registration-status-change'
        )
    )
) {
    // do something... 
}
```

Starting to look pretty murky... what's that? We need to duplicate this same conditional all over the place? Yuck!

### Context Checkers

The ContextChecker class is a variation of the Specification pattern that compares an incoming Context class slug against a preset list of acceptable values and returns true if a match is found.  In order to create one, you need to provide an "identifier" and a list of "acceptable values". The list of "acceptable values" needs to consist of the context slugs that will be accepted by  the ContextChecker as valid.  

```php
$send_reg_cancelled_email = new EventEspresso\core\services\context\ContextChecker(
    'send-email-if-registration-cancelled',
    array(
        'admin-registration-status-change',
        'automated-registration-status-change'        
    )
);
```

The ContextChecker has a method named `isAllowed()` which will return `true` if the supplied Context class slug matches any of the previously provided "acceptable values".

 ```php
if ($registration->STS_ID === 'RIC' && $send_reg_cancelled_email->isAllowed($context)) {
    // do something... 
}
```

The list of acceptable values can be filtered if you know the ContextChecker's identifier. The filter name used within `acceptableValues()` is generated using the following formula:
                                              
```
"FHEE__EventEspresso_core_domain_entities_context_ContextChecker__" + ContextChecker::identifier() + "__acceptableValues"
```

So for the last ContextChecker above, we could filter the list of acceptable values using the following:

```php
add_filter(
'FHEE__EventEspresso_core_domain_entities_context_ContextChecker__send-email-if-registration-cancelled-by-admin__acceptableValues',
    function ($acceptable_values)
    {
        $acceptable_values[] = 'wait-list-registration-status-change';
        return $acceptable_values;
    }
);
```

Now the `$send_reg_cancelled_email->isAllowed($context)` will also return true if the supplied Context slug is equal to 'wait-list-registration-status-change'.

The `ContextChecker::isAllowed()` method uses a simple type sensitive `in_array()` check and will return true if the incoming `Context::slug()` is found within the array of `$acceptable_values`. If this logic is not sufficient for your purposes, then when creating a ContextChecker, a callback can be provided for performing this evaluation externally.

```php
$send_reg_cancelled_email_for_any_admin_context = new EventEspresso\core\services\context\ContextChecker(
    'send-email-if-registration-cancelled-by-admin',
    array(),
    function (Context $context) {
        return strpos($context->slug(), 'admin' ) !== false;
    }
);
```

Now any provided Context with the word "admin" in its slug will be accepted by this ContextChecker.

If you need to influence a previously constructed ContextChecker and change its evaluation logic, the value returned from `isAllowed()` can be filtered if you know the ContextChecker's identifier. The filter name used within `isAllowed()` is generated using the following formula:

```
 "FHEE__EventEspresso_core_domain_entities_context_ContextChecker__" + ContextChecker::identifier() + "__isAllowed"
```

So for the last ContextChecker above, we could filter the value it returns from `isAllowed()` using the following: (note that  we are using ContextInterface for type hinting)

```php
add_filter(
    'FHEE__EventEspresso_core_domain_entities_context_ContextChecker__send-email-if-registration-cancelled-by-admin__isAllowed',
    function ($is_allowed, ContextInterface $context)
    {
        // if context slug contains the word "automated" return true, else return previously evaluated result
        return strpos($context->slug(), 'automated') !== false
            ? true
            : $is_allowed;
    },
    10,
    2
);
```

Now any provided Context with the word "admin" or "automated" in its slug will be accepted by this ContextChecker. The first term would be accepted (or not) by the built-in evaluation callback within `isAllowed()` and the second term would be accepted by our filter. If our filter did not accept the incoming slug as valid based on its own logic, then it would simply return the result that was previously evaluated  within `isAllowed()`.

If a complex ContextChecker needs to be duplicated in multiple places, you should create a child class and then inject a shared version of it into the classes that require it. Then if your logic within that ContextChecker needs to change, it can be done in one place, and immediately be updated anywhere in the codebase that uses it.
