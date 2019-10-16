# PHP Standards for Event Espresso

Previously, our php coding standards closely mirrored the [WordPress PHP Coding Standards](http://make.wordpress.org/core/handbook/coding-standards/php/).  We won't repeat all those here but emphasis, modifications, and additions are listed below. There is still some really old code in Event Espresso 4 that does not conform to these standards.

We have recently decided however to deviate from the above to follow coding standards, methodologies, and guidelines that comply with the greater PHP community. This means following [PHP Standards Recommendations](http://www.php-fig.org/psr/) and pursuing [modern day best practices](http://www.phptherightway.com/). We recommend using [the PHP Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer) during development.


All new classes and files will follow modern day best practices, including namespacing and PSR compliance. New methods, class properties, and class constants will follow the new standards UNLESS legacy coding styles (e.g. naming) are required in order to function or maintain backward compatibility.


## General Code Guidelines

 * Event Espresso supports PHP 5.5+ and WordPress 4.5+ so all functions and code used should be available in those libraries.
 * Class, Interface, Method, and Function names should be clear and concise
 * Methods and Functions should use suitable type hinting where applicable
 * Data types should be used consistently and avoid type switching as much as possible<br>
     ex: if an optional method parameter is intended to be a string, 
         then use `""` (empty string) for the default instead of `null` or `false` 
         This is especially important for return types in order to minimize the amount of type checking that client 
         code has to perform after receiving a value from a method
 * All comparisons should be using type safe equivalents<br>
    ex: `===` vs `==` or `in_array($int, $array, true)` vs `in_array($int, $array)`
    
    
### Formatting Overview

 * all files are formatted according to the PSR specifications
 * names for classes and interfaces follow StudlyCaps formatting (unless a legacy system requires a different naming convention). Interfaces should include the word "Interface" at the end (see: [PSR Naming Conventions](http://www.php-fig.org/bylaws/psr-naming-conventions/))
 * names for methods and functions follow camelCase formatting (unless a legacy system required a different naming convention)
 * names for variables follow snake_case formatting
 * classes and interfaces have phpdoc comment blocks that contain:
     * a brief description of their purpose
     * an @package tag to indicate the vendor or plugin that the code belongs to
     * an @author tag to indicate the specific dev that first created the class
     * an @since tag listing the version that the code was first added
 * methods and functions have phpdoc comment blocks that contain:
     * a brief description of their purpose (not always necessary for really simple/small blocks of code)
     * a list of all parameters and their data types
     * an @return tag if applicable
     * an @throws tag for each exception type that could be thrown as a result of calling the function
     
     
### Translations
 * ALL user viewable strings should be translated using ` esc_html__() ` or a suitable equivalent (avoid `__()` and `_e()` as they allow translators to add malicious Javascript.)
 * Instead of putting "Event Espresso" in translated strings, use a placeholder and `EventEspresso\core\domain\Domain::brandName()`. Eg `printf(esc_html__('Thanks for installing %1$s!', 'event_espresso'), EventEspresso\core\domain\Domain::brandName());`. 
 * You should almost never need to put HTML tags into a translated string. Put HTML outside of the translated string (eg `<b><?php esc_html_e('Hi!', 'event_espresso');?></b>`) or use placeholders (eg `printf(esc_html__('Use %1$sthis link%2$s to get a special surprise!', 'event_espresso'), '<a href="https://eventespresso.com">', '</a>');`
 * When translating strings with multiple placeholders, use [numbered placeholders (eg "$1$s")](https://codex.wordpress.org/I18n_for_WordPress_Developers#Placeholders) instead of simple placeholders (eg "%s").
 * Also when there are multiple placeholders, be sure to add a translators comment like so:
 
 ```php
// translators: 1: group affiliation, eg "Rebel" or "Imperial", 2: name of planet, eg "Alderan". 
__('The %1$s base is on %2$s', 'event_espresso');
```
 * Ddd translator comments to other strings where you think it would be helpful to a translator.
 * Use `esc_html_x()` (or other `_x()` family functions) where that string could be translated differently in different contexts. Eg
 ```php
 <button><?php esc_html_e('Post Event', 'event_espresso');?></button>
 ...
 <h1><?php esc_html_e('Post Event', 'event_espresso');?></h1>
 <p>After the event is over, we're all going to Tim Horton's for some donuts...</p>
 ```
Notice it's the same translated string with different meanings depending on the context. In French, the first should be translated like "Publier l'événement" and the second as "Après l'événement". In order to allow translators to translate them differently, you must use `esc_html_x()`, like so:
```php
 <button><?php echo esc_html_x('Post Event', 'Button to publish the event', 'event_espresso');?></button>
 ...
 <h1><?php echo esc_html_x('Post Event', 'Title for information happening after the event', 'event_espresso');?></h1>
 <p>After the event is over, we're all going to Tim Horton's for some donuts...</p>
 ```
 * Be kind to translators and avoid "breaking translations" (invaliding existing translations by changing the translated text). The following will break translations:
    * changing placeholders from "%s" to "$1$s"
    * changing `esc_html__()` calls to `esc_html_x()`
    * breaking a long string into multiple shorter ones (eg changing `esc_html__('some very very long string', 'event_espresso');` to `esc_html__('some' . ' very' . ' very' . ' long' . ' string', 'event_espresso');`)
    * changing an existing translation's context (eg changing `esc_html_x('Post event', 'after the event', 'event_espresso');` to `esc_html_x('Post event', 'subsequent the event', 'event_espresso');`)
 * But note that it's OK to change `__()` to `esc_html__()` (it won't break translations) 

### Design and Architecture

 * classes, methods, or functions should not be too large. Extract logic into more granular chunks if need be
 * dependencies that are required by a class should be injected into the constructor
 * optional dependencies can be injected into the constructor or via setters
 * static state should be avoided like the plague
 * non-legacy classes should follow PSR-4 compatible namespacing
 * folders are named using snake_case
 * use `use` statements for all classnames in a file and simplify namespaces in phpdocs. These should be before all other code except a `namespace` statement, if there is one. Do not add leading slashes to indicate global namespace.
 * can design patterns be utilized to provide a more eloquent versatile solution?
 * code should be DRY and not duplicate existing code
 * code should strive to follow the S.O.L.I.D. principles:
     * **S** - Single Responsibility Principle: each class should focus on doing ONE thing only and all functionality should be related to that one thing
     * **O** - Open-Closed Principle: Class internals should be hidden as much as possible. To add new functionality, write new class extensions instead of modifying existing code, ie: substitute OldClass with OldClassPlusLasers (which extends OldClass). Interfaces allow the substitution.
     * **L** - Liskov Substitution Principle: parent/child classes should be interchangeable, ie: OldClass parent or OldClassPlusLasers child class should both be usable by classes implementing their interface
     * **I** - Interface Segregation Principle: avoid big interfaces, use multiple smaller ones describing more granular behaviour so that classes don't have to implement methods they don't support.
     * **D** - Dependency Inversion Principle: inject dependencies into classes so they can be externally controlled. Required dependencies should use constructor injection, and optional dependencies can use setter injection.
 

### Backwards Compatibility

 * code should strive to be backwards compatible
 * classes, interfaces, methods, or functions that are no longer required should be deprecated instead of removed, and logic should be forwarded to replacements where applicable



### Yoda Conditionals.

See the [WordPress handbook for an example and info on what this is](http://make.wordpress.org/core/handbook/coding-standards/php/#yoda-conditions).  We have decided to not adopt the use of yoda conditionals in our code.

### DRY (Don't Repeat Yourself)

Most developers will be familiar with this principle.  If you find yourself writing code repeatedly consider whether its something that can be abstracted for reusability.

Consider the following bad example.

```php
function increment_foo($foo){
	return $foo++;
}
function increment_bar($bar){
	return $bar++;
}
```

Notice how these two methods `increment_foo()` and `increment_bar()` are basically doing the same thing - take an incoming variable and increment it by one.  The DRY way to do this is simply:

```php
function increment( $item ) {
	return $item+=1
}
```

Now this is probably an overtly obvious example of the DRY principle but it does illustrate what we mean.  The less code you write the less there is to maintain.  In this example we have one function that does incrementation and thus we only have to maintain that one function going forward.  DRY also leads to more bug free code, however when there are bugs, they are generally easier to fix because instead of fixing a bug in multiple places, you are more likely to only need to fix in one.  ([more reading on DRY here](http://programmer.97things.oreilly.com/wiki/index.php/Don't_Repeat_Yourself))

### Favor OOP over procedural

One of the major decisions made early in the development of Event Espresso 4, was to use general OOP (Object Oriented Programming) principles in the refactor.   What this means is that when designing and implementing systems, we favoured  using classes and objects over global scope functions and global variables.   This allows for clear separation of concerns and more testable and reusable code.

## Naming Conventions

### Function Naming

Any functions not found in a class should be prefixed with `espresso_`.  An example of this in use is the `espresso_version()` function.

# Legacy Class Naming

> This only applies to legacy class naming- all new classes should follow [Formatting Overview](#formatting-overview).

All classes for Event Espresso should be prefixed with `EE_`.  An example of this in use is the `EE_Base_Class`.  Note, there are some other important naming schemas related to classes:

Type of Class | Naming Schema | Description | Example 
------------- | ------------- | ----------- | ------- 
Regular | EE_{class_name} | This is a class that is not a part of any system or library OR a core class. | EE_Registry
DB Model | EEM_{class_name} | These are part of the EE model system. | EEM_Event
DB Model Object (entity) | EE_{class_name} | These are part of the EE Model system. You can differentiate these from Regular classes in that Model Objects always extend the `EE_Base_Class` | EE_Event
Helper | EEH_{class_name} | Helper Classes. These classes usually contain static methods and are typically used for "helper" type methods. | EEH_Template
Admin | {class_name}_Admin_Page or {class_name}_Admin_Page_Init | These classes are a part of the EE Admin system | Event_Admin_Page or Event_Admin_Page_Init
CPT Strategy | EE_CPT_{class_name}_Strategy | Any class related to CPT's and Custom Taxonomies | EE_CPT_Event_Strategy
Data Migration | EE_DMS_{version_migration} | Classes used for Data Migration | EE_DMS_4_1_0
Messages Data Handler | EE_Messages_{data_source}_incoming_data | These are the data handler classes for the Messages system. | EE_Messages_Gateways_incoming_data
Messages Template Defaults | EE_Messages_{messenger}_{message_type}_Defaults | These classes define the defaults for the message templates | EE_Messages_Email_Cancelled_Registration_Defaults
Messages Message Type | EE_{message_type}_message_type | These classes represent message types. | EE_Cancelled_Registration_message_type
Messages Messenger | EE_{messenger}_messenger | These classes represent a messages system messenger | EE_Email_messenger
Messages Validators | EE_Messages_{messenger}_{message_type}_Validator | These classes represent the messages system validators (validate fields and shortcodes in templates) | EE_Email_Cancelled_Registration_Validator
Modules | EED_{Module_Name} | These classes are part of the EE Module system | EED_Event_Single
General Shortcodes (using WordPress shortcodes system) | EES_{Shortcode_Name} | These classes define and handle the various EE shortcodes. | EES_Espresso_Cancelled
Widgets | EEW_{Widget_Name} | These classes define and implement various EE Widgets for the WordPress widget system. | EEW_Upcoming_Events

### Class Property Method and Property Schema

> This only applies to legacy method and property naming- all new methods and properties should follow [Formatting Overview](#formatting-overview).

All private or protected properties or methods are prefixed with an underscore.  Example Property: `$this->_property`.  Example method: `function _method()`.

All public properties or methods are not prefixed with an underscore.  Example property: `$this->property`.  Example method: `function method() {}`.

### File Naming Schema

> This only applies to legacy file naming- all new classes should be the class' name followed with `.php`.

File Type | Schema | Description | Example 
--------- | ------ | ----------- | ------- 
Regular | .php | As with normal php rules. All php files end with the `.php` extension | espresso.php
Core | .core.php | Core Classes (usually parent or "main" classes) | EE_Error.core.php
Template | template.php | Any template related code goes into a file with this extension | whats_new.template.php
Help Tabs | .help_tab.php | Files containing classes for the EE Help Tab system. | event_editor.help_tab.php
Non Specific Class | .class.php | Anything with a "class" extension contains a class (or classes). | Events_Admin.class.php
Library | .lib.php | Used for classes that are a part of a library. | EE_Event_Editor_Decaf_Tips.lib.php
Migration Scripts | .dms.php | Contains a data migration script class. | EE_DMS_4_1_0.dms.php
Model | .model.php | Contains a model class. | EEM_Answer.model.php
Helper | .helper.php | Contains a helper class. | EEH_DTT_Helper.helper.php
Module | .module.php | Contains a module class. | EED_Event_Single.module.php
Shortcodes | .shortcode.php | Contains an EE Shortcode Class | EES_Espresso_Events.shortcode.php
Widgets | .widget.php | Contains a widget class. | EEW_Upcoming_Events.widget.php

## White Space

Please refer to the [PSR-2 Coding Standards](http://www.php-fig.org/psr/psr-2/) and use the [PSR Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer) to verify your code meets our coding standards.

## PHP In Templates

In general, try to restrict usage of PHP code in templates to only using: `if`, `else`, `foreach`, `echo`.  Generally there should be no assigning of variables (except maybe an iteration counter).  There should definitely be no SQL queries, requires, or definition of any functions.  Also, define all the variables in the template requires at the beginning of the file and briefly explain what they are expected to contain.

```php
<?php
/**
 * Example template to show php usage
 * Template: includes/template/example_template.template.php
 *
 * Template vars in use
 * @var EE_Event $event          An EE_Event object
 * @var EE_Ticket[] $tickets     An array of EE_Ticket objects
 * @var EE_Datetime[] $datetimes An array of EE_Datetime objects
 */
?>
<div class="container">
	<h2><?php echo $event->get('EVT_name'); ?></h2>
	<ul>
		<?php foreach ( $tickets as $ticket ) : ?>
		<li>Ticket: <?php echo $ticket->get('TKT_name'); ?></li>
		<?php endforeach; ?>
	</ul>
</div>
```

## Database Queries

In Event Espresso 4 we spent a significant amount of time planning and building a model system for all db interactions.  The intent is that only the `EEM_` model singletons are used to interact with the database.  If a query you want doesn't exist, then generally, it should be added to the appropriate model (or improvement to the model to support that query).
