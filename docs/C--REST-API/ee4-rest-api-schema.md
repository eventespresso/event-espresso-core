## Schema
A schema is a way of providing information about how data is structured.  Most databases, or other data stores have a way of describing data and a schema is a way of representing that same data in a structured manner.  In the EE Model system,  information about the fields of the model are easily obtained within the EE environment via the child class of `EEM_Base` via grabbing the defined fields.  Within PHP and the EE environment these work very well, but this isn't so fluent with a REST API.

The EE REST API (which itself utilizes the WordPress REST API framework), utilizes [JSON Schema](http://json-schema.org/) to handle the structuring of its data.  All of the EE resource endpoints have a json schema available.

### JSON Schema

For more information on our choice to use the JSON schema standard, you can read the [excellent summary written in the WordPress documentation](https://developer.wordpress.org/rest-api/schema/#json-schema).  We chose to use the JSON Schema standard to represent our resources for similar reasons as the WordPress project.

### Accessing an EE Resource Schema

To get the schema for an EE resource (i.e. `events` or `venues`), you make an `OPTIONS` request to the resource endpoint you want the schema for.  So for example if you want the schema for `events` you do an `OPTIONS` request to: `https://youreesite.com/wp-json/ee/v4.8.36/events` and you will find the schema in the response as the value for the `schema` property.

### Specifics about our schema response.

Our response follows the json schema standards, however there are a few places where we've added additional properties to the usual schema response to help describe certain extra elements of an EE resource for parsers.

#### `primary_key`

This is a simple boolean property that is used to indicate when a field property represents a primary key. For example, the `events` resource will have this in its schema properties array for `EVT_ID`:

```json
{
  "properties": {
        "EVT_ID" : {
            "description" : "Post ID for Event",
            "type" : "integer",
            "readonly" : false,
            "primary_key" : true
        }
  }
}
```

#### `foreign_key`

This property is used for any fields representing a foreign key to another model.  Although in nearly all resource responses we do *not* return the value of this foreign key, it *can* be used as an argument in requests. So this helps client code to programmatically "understand" what are foreign keys on a resource. 

The value for this element is a schema value that contains a description, the type and an enum listing the model(s) the foreign key points to.  For example on the `/registrations/` endpoint you will find this for one of its field properties:

```json
{
  "properties": {
    "TXN_ID" : {
      "description" : "Transaction ID",
      "type" : "integer",
      "readonly" : true,
      "foreign_key" : {
        "description" : "This is a foreign key that points to the given models.",
        "type" : "array",
        "enum" : [ "EE_Transaction" ]
      }
    }
  }
}
```

#### Relations

Although it's possible for client code to determine the relations on resource via the properties marked with a `foreign_key` property, since we make it possible in our resource endpoints to return the relations in a response for a resource, we list them in the schema as well.  

The way client code can differentiate these special relation properties from other field properties is via the keyword `relation` that is in the schema for the property and it will be a simple boolean where `true` indicates the property represents a relation. 

So for instance, you would see the `datetimes` relation for the `events` resource listed like this:

```json
{
  "properties" : {
    "datetmes" : {
      "description" : "The related Datetime entities to the Event",
      "type" : "array",
      "relation" : true,
      "relation_type" : "EE_Has_Many_Relation",
      "readonly" : true,
      "items" : {
        "type" : "object"
      },
      "relation_model" : "Datetime"
    }
  }
}
```

Some extra keywords that you find in here are:

- `relation_type` : This describes what relation type this relation is.  The string corresponds to a relation type class name.
- `relation_model` : This describes the model this relation corresponds to.

> **Note:** `EE_Belongs_To` relations are returned in a response with the singular form of the relation as the string, which is how the schema represents this. This is because `EE_Belongs_To` is always a single entity related to the resource entity.  So for example there's only ever one transaction related to a registration so you will see it listed in the schema for `registrations` as `transaction` not `transactions`

