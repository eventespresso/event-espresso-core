#Code Reviews

The Event Espresso development process includes a code review step where a branch with changes is passed to another dev, who then examines the commits made in that branch in order to comment on those changes.

Things the reviewer might be looking for, includes, but is not limited to the following:

###Code Review Checklist

#####formatting

 * all non-legacy files are formatted according to the PSR specifications
 * names for non-legacy classes and interfaces follow StudlyCaps formatting
 * names for non-legacy methods and functions follow camelCase formatting
 * names for variables follow snake_case formatting
 * classes and interfaces have phpdoc comment blocks that contain:
     * a brief description of their purpose
     * an @package tag to indicate the vendor or plugin that the code belongs to
     * an @author tag to indicate the specific dev that first created the class
     * an @since tag listing the version that the code was first added
 * methods and functions have phpdoc comment blocks that contain:
     * a brief description of their purpose (not always necessary for really simple/small blocks of code)
     * a list of all parameters and their datatypes
     * an @return tag if applicable
     * an @throws tag for each exception type that could be thrown as a result of calling the function

#####code quality

 * code is free of all typos and syntax errors
 * code will function in all supported versions of PHP
 * class, interface, method, and function names should be clear and concise
 * methods and functions are using suitable type hinting where applicable
 * use data types consistently and avoid type switching as much as possible
     ex: if an optional method parameter is intended to be a string, 
         then use `""` (empty string) for the default instead of `null` or `false` 
         This is especially important for return types in order to minimize the amount of type checking that client 
         code has to perform after receiving a value from a method
 * user viewable strings are translated using ` esc_html__() ` or a suitable equivalent
 * all comparisons are using type safe equivalents
     ex: `===` vs `==` or `in_array($int, $array, true)` vs `in_array($int, $array)`
 * EE action hook names are prefixed with `"AHEE__"` (**A**ction **H**ook **E**vent **E**spresso)
     - this allows searching for `"AHEE__"` to find all EE related action hooks (or `"HEE__"` for ALL hooks)
 * EE action hooks are in the format `"{prefix}__{FullyQualifiedClassName}__{MethodName}__{location}"`
 * EE filter hook names are prefixed with `"FHEE__"` (**F**ilter **H**ook **E**vent **E**spresso)
     - this allows searching for `"FHEE__"` to find all EE related filter hooks (or `"HEE__"` for ALL hooks)
 * EE filter hooks are in the format `"{prefix}__{FullyQualifiedClassName}__{MethodName}__{variable_being_filtered}"`
 * if a hook name uses a FullyQualifiedClassName that contains a namespace and therefore has backslashes `\` in it, 
 then the backslashes should be converted to underscores `_`

#####design and architecture

 * classes, methods, or functions should not be too large. Extract logic into more granular chunks if need be
 * dependencies that are required by a class should be injected into the constructor
 * optional dependencies can be injected into the constructor or via setters
 * static state should be avoided like the plague
 * non-legacy classes should follow PSR-4 compatible namespacing
 * use `use` statements for all classnames in a file and simplify namespaces in phpdocs 
 * can design patterns be utilized to provide a more eloquent versatile solution?
 * code should be DRY and not duplicate existing code
 

#####backwards compatibility

 * code should strive to be backwards compatible
 * classes, interfaces, methods, or functions that are no longer required should be deprecated instead of removed, 
 and logic should be forwarded to replacements where applicable