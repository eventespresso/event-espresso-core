The following actions are used for creating relations or adding created relations outside of the store to the store state.

These actions are *non-persisting* actions.

## `createRelation( modelName, entityId, relationName, relationEntity)`

A dispatch action that adds the provided relation entity as a relation to the given model and entity id.

This dispatch action has automatically generated model specific equivalents that can be used: `createEventRelation`, `createDatetimeRelation` etc.  When using a model specific equivalent you only need to pass along the `entityId`, `relationName` and `relationEntity` arguments.

This returns no value.

**Arguments:**

| Argument    | Type    | Description                                              |
| ----------- | ------- | -------------------------------------------------------- |
| `modelName` | string  | The name of the model you are creating the relation for. |
| `entityId`  | string\|number | The id of the entity you are creating the relation for.                                                          |
| `relationName`            | string         | The name of the model you are creating the relation to.                                                          |
| `relationEntity`            | BaseEntity         | The entity you are creating the relation to.                                                          |

**Example:**

```js
wp.data.dispatch( 'eventespresso/core' ).createRelation( 'event', 10, 'datetime', DatetimeEntity );
```

## `createRelations( modelName, entityId, relationName, relationEntities )`

A dispatch action that adds the provided relation entities as relations to the given model and entity id.

This dispatch action has automatically generated model specific equivalents that can be used: `createEventRelations`, `createDatetimeRelations` etc.  When using a model specific equivalent you only need to pass along the `entityId`, `relationName` and `relationEntities` arguments.

This returns no value.

**Arguments:**

| Argument    | Type    | Description                                              |
| ----------- | ------- | -------------------------------------------------------- |
| `modelName` | string  | The name of the model you are creating the relation for. |
| `entityId`  | string\|number | The id of the entity you are creating the relation for.                                                          |
| `relationName`            | string         | The name of the model you are creating the relation to.                                                          |
| `relationEntities`            | Array         | An array of `BaseEntity` instances you are creating the relation to.                                                          |

**Example:**

```js
wp.data.dispatch( 'eventespresso/core' ).createRelation( 'event', 10, 'datetime', [ DatetimeA, DatetimeB ] );
```

## `resolveRelationRecordForRelation( relationEntity, modelName, modelId )`

This action is used to ensure a relation entity related to the given model entity id is both added to the state and various selectors for the relation are resolved so no additional resolution happens for them.

One intent behind this action is to allow for doing more efficient batch queries of entities via an api request and then triggering the resolution of any more granular selectors that have resolvers.  This basically allows one to hydrate the `eventespresso/core` store state via more efficient queries.

This returns no value.

**Arguments:**

| Argument        |   Type       | Description                                                     |
| ----------------| ------------ | ----------------------------------------------------------------|
| `relationEntity`|   BaseEntity | An instance of a model (eg. datetime) being stored in the state.|
| `modelName`     |   string     | The name of the model the `relationEntity` is related to.       |
| `modelId`       |   number\|string    | The id of the model the `relationEntity` is related to.  Note, if the entity for this model doesn't already exist in the state it will be resolved.                                                                 |

**Example:**

```js
wp.data.dispatch( 'eventespresso/core' ).resolveRelationRecordForRelation( Event, 'datetime', 20 );
```