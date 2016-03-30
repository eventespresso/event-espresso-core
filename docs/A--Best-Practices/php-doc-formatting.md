# PHPDoc Formatting

> Note, this page describes the standards the EE team uses for PHPDoc usage.  However, currently the PHPDoc usage in Event Espresso is not following these standards completely, so there is some inconsistency.  Note that we are in the process of modifying and fixing the inline documentation to fit this convention and will be using this for future inline documentation of our code.

We use [phpdoc](http://phpdoc.org) commenting extensively through our plugin code.  We also drew inspiration from the current phpdoc standards and schema [implemented by Wordpress](http://make.wordpress.org/core/handbook/inline-documentation-standards/php-documentation-standards/).

> Those with sharp eyes will notice that we follow the same structure in this documentation as what WordPress has.  However, there are subtle differences so it's good to be familiar with our approach.

## What Should Be Documented

  * Functions and class methods
  * Classes
  * Class properties
  * Requires and Includes
  * Hooks (actions and filters)
  * Inline comments (where necessary)
  * File headers
  * Constants 

## General Documentation Tips

**Descriptions:** Generally the short descriptions should be clear, simply and brief.  Describe "what" and "when" not "why" (unless absolutely necessary).  The important thing is to get across the intent for the particular bit of the code being documented quickly.  For example, in the case of classes, your short description should be very clear about the purpose of the class in a way that makes it easy for future developers to not only determine what the intent of the class is, but also whether a method they want to add even belongs in that class.  Long descriptions should always be used where extra clarity is needed to explain the functionality of the code being documented.  But again, be clear, concise and as brief as possible.

**@since:** We consider this an important tag to identify when a bit of code was added.  If documenting code that doesn't have this,  you can use  the git blame tool to attempt to discover that or if that fails use the keyword "unknown."

**@package:**  Generally speaking this tag will always reference the plugin.  In other words if the code is in Event Espresso, then it will be `@package Event Espresso` .  If the code was in the Event Espresso Calendar addon then it will be `@package Espresso Calendar` .

**@subpackage:** This tag should always reference the component for the code being documented.  Components are the major system code belongs to.  Here's a list of components that are currently found in Event Espresso core:

  * General - something that doesn't fit in any of the specific components
  * Core Plugin - core functionality involved in the bootstrapping process
  * Models and Data Infrastructure
  * Activation, Installation, and Migration
  * Admin Pages
  * EE Help System (tools etc made available for EE Help)
  * Messages
  * Frontend (templates, shortcodes, widgets)
  * SPCO & Registration
  * Payment Methods & Gateways
  * WPMU (things specific to WordPress Multisite usage)
  * Third Party (anything integrating with third party or utilizing third party code.  It's expected that when this is used a @link will be present for the third party documentation)
  
**@author:**  Although the WordPress.org project discourages the use of the author tag, in EE we use it because it helps identify who wrote that particular section of code so you know who to see if explanation needed or who might verify any code added.  The author tag is not intended for "brownie points" or recognition or to say someone "owns" the code.  Generally speaking @author tags should only be used for larger code blocks vs smaller additions (i.e. class headers, not method headers).

**Types:**  Note that if a type referenced is an object, use the object name as the type.  If it's an array of objects, use the object name using the array literal chars ([]).

```php
/**
 * @param EE_Object   $ee_obj  Description of single EE_Object.
 * @param EE_Object[] $ee_objs Description of an array of EE_Objects.
*/
```

## Formatting Dos and Don'ts

Following these guidelines ensure that when the code phpdoc blocks are parsed, they will be useful.

### Short Descriptions

No markup of any kind.  If the description refers to an HTML element or tag, then it should be written as "link tag", not "<link>".  For example:  *Fires when printing the link tag in the header*

### Long Descriptions

Markdown can be used, if needed, in a long description.

1. Use a hyphen (-) to create an unordered list, with a blank line before and after.

```php
/**
 * ...
 * Long description which includes a list:
 *
 * - This is item 1.
 * - This is item 2.
 * - This is item 3.
 *
 * The long description continues on...
 */
```

2. Code samples should be shown by indenting every line of the code by 4 spaces, with a blank line before and after.

```php
/**
* ...
* Long description which includes a code sample:
*
*    $status = array(
*        'draft'          => __('Draft'),
*        'pending'        => __('Pending Review'),
*        'private'        => __('Private'),
*        'publish'        => __('Published')
*        );
* ...
*/
```

3. No inline links or other tags.  Links, such as related GitHub issue tickets or other documentation found on developer.eventespresso.com or eventespresso.com, should be added in the appropriate place in the block using the `@link`  tag

4. The only place markdown should be used is in the Long Description block.

## PHPDoc Block Formatting

### 1. File Headers

The PHPDoc file header block is used to give an overview of what is contained in the file.  Whenever possible, **all** EE files should have a header block, regardless of the files contents.  This has application when the code is automatically parsed for online documentation.

```php
/**
* Short Description (no period for file headers)
*
* Long Description. (include what is found in the file)
*
* @link URL
* @since x.x.x (if available, unknown if not)
*
* @package Event Espresso
* @subpackage Component (e.g. Admin Pages)
*/
```

### 2.  Classes

Class headers are very similar to file headers in structure except of course they will help describe the class.

* **Short Description:** use a period at the end.  Be clear on the intended purpose of the class.
* **Long Description:**  if needed, used to articulate specifics on the functionality of the class.  Usage of long description should be rare.
* **@abstract:** If this is a abstract class, then use this tag to indicate that
* **@author:** Who is the developer primarily responsible for the creation and maintenance of the class.
* **@since x.x.x:** Should always be 3-digit (e.g. `@since 4.1.0` )

```php
/**
 * Short Description.
 *
 * Long Description. (if needed)
 *
 * @abstract (if abstract include this tag otherwise not needed)
 * @author   First Last
 * @since x.x.x (if available, unknown if not)
 *
 * @package Event Espresso
 * @subpackage Component (e.g. Admin Pages)
 */
class Some_Admin_Class{
    /...code../
}
```

### 3. Functions and class methods

Functions and class methods should be formatted as follows.

* **Short description:** A brief, one line explanation of the purpose of the function. Use a period at the end.
* **Long description:** A supplement to the short description, providing a more detailed description. Use a period at the end.
* **@since x.x.x:** Should always be 3-digit (e.g. `@since 4.1.0` ).
* **@see:** The function, method, or class relied on.
* **@link:** URL that provides more information.
* **@throws**: If any exceptions are possibly thrown indicate that here.
* **@param:** Note if the parameter is Optional before the description, and include a period at the end.
* **@return:** Note the period after the description.

```php
/**
 * Short description. (use period)
 *
 * Long description.
 *
 * @since x.x.x
 * @access (for functions: only use if private or protected)
 *
 * @see Function/method/class relied on
 * @link URL
 * @throws EE_Error
 *
 * @param  type $var Description.
 * @param  type $var Optional. Description.
 * @return type Description.
 */
```

#### 3.1 Parameters That Are Arrays

Parameters that are argument arrays should be documented in the "originating" function/method only, and back-referenced via a `@see` tag.  This is particularly the case in child classes that have a method that overrides a parent method.

Array values should be documented using the [PHPDoc hash notation style](https://github.com/phpDocumentor/fig-standards/blob/master/proposed/phpdoc.md#7-describing-hashes) where each value begins with the `@type` tag and takes the form of:

```php
/**
 * ...
 * @type type $key Description. Default <value>. Accepts <value>, <value>.
 *                 (aligned with Description, if wraps to a new line)
 * ....
 */
```

Again, duplication should be avoided in documenting argument arrays by only adding it to the originating method/function and then back-reference via a @see tag.  For example:

```php
/**
 * @see EE_Parent_Class::method_that_gets_overridden() for documentation
 */
public function method_that_gets_overridden() {}
```

Here's an example of usage for the params that are arrays:

```php
/**
 * Short description. (use period)
 *
 * Long description.
 *
 * @since x.x.x 
 * @access (for functions: only use if private or protected)
 *
 * @param type $var Description.
 * @param array $args {
 *     An array of arguments. Optional.
 *
 *     @type type $key Description. Default <value>. Accepts <value>, <value>.
 *                     (aligned with Description, if wraps to a new line)
 *     @type type $key Description.
 * }
 * @param type $var Description.
 * @return type Description.
 */
```

#### 3.2 Deprecated Functions/Methods

If the function is deprecated and should not be used any longer, the `@deprecated` tag, along with the version and description of what to use instead, should be added.

```php
/**
 * Short description. (use period)
 *
 * Long description.
 *
 * @since x.x.x
 * @deprecated x.x.x Use new_function_name() instead.
 * @see new_function_name()
 *
 * @param type $var Optional. Description.
 * @param type $var Description.
 * @return type Description.
 */
```

### 4. Class Properties

Class properties should be formatted as follows:

* **Short description:** Use a period at the end.
* **@since x.x.x:** Should always be 3-digit (e.g. `@since 3.6.0` ).
* **@access:** If the property is private, protected or public. Private properties are intended for internal use only.
* **@var:** Formatted the same way as `@param` .

```php
/**
 * Short description. (use period)
 *
 * @since x.x.x
 * @access (private, protected, or public)
 * @var type $var Description.
 */
```

### 5. Requires and Includes

Files required or included should be documented with a short description PHPDoc block.  If the includes are happening dynamically then include the short doc block at the beginning of the dynamic includes code.

```php
/**
 * Short description. (use period)
 */
require_once( ABSPATH . '/filename.php' );
```

### 6. Hooks (Actions and Filters)

Both action and filter hooks should be documented on the line immediately preceding the call to `do_action()`  or  `apply_filters()` , and formatted as follows:

* **Short description:** A brief, one line explanation of the purpose of the hook. Use a period at the end.
* **Long description:** A supplemental description to the short description, if warranted.
* **@since x.x.x:** Should always be 3-digit (e.g. `@since 4.1.0` ).
* **@param:** If the parameter is an array of arguments, document each argument using the PHPDoc [hash notation](https://github.com/phpDocumentor/fig-standards/blob/master/proposed/phpdoc.md#7-describing-hashes), include a period at the end of each line.

Note that `@return` is not used for hook documentation, because action hooks return nothing, and filter hooks always return their first parameter.

```php
/**
 * Short description. (use period)
 *
 * Long description.
 *
 * @since x.x.x
 *
 * @param type $var Description.
 * @param array $args {
 *     Short description about this hash.
 *
 *     @type type $var Description.
 *     @type type $var Description.
 * }
 * @param type $var Description.
 */
```

If a hook is in the middle of a block of HTML or a long conditional, the PHPDoc block should be placed on the line immediately before the start of the HTML block or conditional.

#### 6.1 Duplicate Hooks

Occasionally, hooks will be used multiple times in the same or separate core files. In these cases, rather than list the entire PHPDoc block every time, only the first-added version of an action or filter will be fully documented. Subsequent versions should have a single-line comment.

Something like this:

```php
/** This action/filter is documented in path/to/filename.php */
```

### 7. Inline Comments

Inline comments inside methods and functions should be formatted as follows:

#### 7.1 Single line comments

```php
// Allow plugins to filter an array.
```

#### 7.2 Multi-line comments

```php
/* 
 * This is a comment that is long enough to warrant being stretched over
 * the span of multiple lines. You'll notice this follows basically
 * the same format as the PHPDoc wrapping and comment block style.
 */
```

### 8. Constants

The PHPDoc constant block is used to give a description of the constant for better use and understanding.

Constants should be formatted as follows:

* **Short description:** Use a period at the end.
* **@since x.x.x:** Should always be 3-digit (e.g. @since 4.1.0 ).
* **@var:** Formatted the same way as @param.

```php
/**
 * Short Description. (use period)
 *
 * @since x.x.x (if available)
 * @var type $var Description.
 */
```

## PHPDoc Tags


| Tag | Usage | Description |
| ----- | ------- | ------------- |
@access | public|private|protected | Indicates access control for a function/method. Used directly above the `@since` line in block. Typically not used because access can be declared in the method definition.
@deprecated | version x.x.x  replacement_function_name | What version of WordPress the function/method was deprecated. Use 3-digit version number.
@throws | Exception_Type | If an exception (or multiple exceptions) are thrown indicate using this tag. Type should be the classname for the exception (e.g. EE_Error)
@internal | information string | Typically used for adding notes for internal use only
@link | URL | Link to additional information for the function/method. For an external script/library, links to source. Not to be used for related functions/methods; use @see instead.
@method | return type description | Shows a “magic” method found inside the class.
@package | package name | The plugin name (e.g. Event Espresso)
@subpackage | subpackage name | For page-level docblock, specifies the Component that all functions and defines in file belong to. For class-level docblock, specifies the subpackage/component the class belongs to. (e.g. "Admin Page")
@param | datatype $variable description | Function/method parameter of the format: parameter type, variable name, description, default behavior.
@return | datatype description | Document the return value of functions or methods (or void).
@see | element name | References another function/method/class the function/method relies on.
@since | version x.x.x | Documents release version function/method was added. Use 3-digit version number - this is to aid with version searches, and for use when comparing versions in code.
@todo | information string | Documents planned changes to an element that have not been implemented.
@type | datatype description  | description for an argument array value
@var | datatype description | Data type for a class variable and short description.