The entity factory (and its related components) is an interface to creating `BaseEntity` instances for Event Espresso models.  This allows for creating common interfaces to Event Espresso model entities.

The following is exposed on the `eejs.model` object.

| Property                                                   |   Description                                                                                                                                                                                                           |
| -----------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`createEntityFactory`](./entity-factory.md)|   A factory for creating an entity factory.  Calling this returns an object with factory functions that instantiate an instance of a named `BaseEntity` object.  The `modelName` is used as the name for the new entity.|
| [`MODEL_PREFIXES`](./model-prefixes.md)     |   A function that maps model names to an array of model specific prefixes used on fields for that model.  For instance, entity fields in the event model are prefixed with `EVT`.                                       |
| `SAVE_STATE`                                               |   This is an object of constants describing the current `save_state` for an entity.  The values are symbols.  

An entity factory returns an instance of [`BaseEntity`](./base-entity.md).