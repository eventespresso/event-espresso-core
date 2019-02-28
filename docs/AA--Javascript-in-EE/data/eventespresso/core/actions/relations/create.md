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