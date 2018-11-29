# Event Espresso Model System

In Event Espresso 4 (EE4), we have built a system which simplifies creating, retrieving, updating and deleting data from tables used by Event Espresso. It is built on top of WordPress' [wpdb](https://codex.wordpress.org/Class_Reference/wpdb) class, and should generally be used in place of it, but is not mandatory. It's also an option to use [normal WP_Query functions for retrieiving EE4 Custom Post Type (CPT)](ee-model-objects-and-custom-post-types.md) data. The main advantages of using our model system are it:

* automates performing tricky joins between related tables.
* reduces boiler-plate code and makes code more concise.
* strives to be DRY (Don't Repeat Yourself).
* model objects returned are more well-defined (less need to use var_dumps), and provide lots of helper methods for accessing data in different formats and accessing related items.

## Table of Contents

- [Querying with EE Models](./model-querying.md)
- [Using EE4 Model Objects](./using-ee4-model-objects.md)
- [EE Model Objects and Custom Post Types](./ee-model-objects-and-custom-post-types.md)
- [EEM_Base::get_all](./eem-base-get-all.md) Provides some documentation on the `$query_params` argument for this method