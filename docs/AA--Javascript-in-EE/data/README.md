## Data
Event Espresso' data module integrates with the [WordPress data module](https://github.com/WordPress/gutenberg/tree/master/packages/data).  It manages application state for a variety of Event Espresso data.  

From the docs for the `wp.data` module:

> The data module is built upon and shares many of the same core principles of [Redux](https://redux.js.org/), but shouldn't be mistaken as merely Redux for WordPress, as it includes a few of its own [distinguishing characteristics](https://github.com/WordPress/gutenberg/tree/master/packages/data#comparison-with-redux). As you read through this guide, you may find it useful to reference the Redux documentation — particularly [its glossary](https://redux.js.org/glossary) — for more detail on core concepts.

To use any of the registered stores for Event Espresso, you will need to use the `wp.data` api as described in it's [documentation](https://github.com/WordPress/gutenberg/tree/master/packages/data#data-api).  Further information (and examples) about specific EE data stores are found in the following docs:

| Registered Store Name                                 | Purpose                                                                                                                                                                          |
| ------------------------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`eventespresso/core`](./eventespresso/core/README.md)| This is the authoritative store for all model entity instances ('events', 'attendees', 'registrations' etc.).  Persisting and updating model entity data happens from this store.|
| [`eventespresso/lists` ](./eventespresso/lists.md)    | This data store is used for any storing any data from "list" type requests.                                                                                                      |
| [`eventespresso/schema`](./eventespresso/schema.md)   | This data store holds the schema for each model  and  the factories for generating model entity instances for each model.                                                        |