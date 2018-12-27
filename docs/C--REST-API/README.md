The documents in this folder are all related to the REST API in EE core.

## Table of Contents

- [EE4 REST API: An Introduction](ee4-rest-api-introduction.md)
- [EE4 REST API: Testing Tools](ee4-rest-api-testing-tools.md)
- [EE4 REST API: Calculated Fields Reference](ee4-rest-api-calculated-fields-reference.md)

### GET Requests

- [EE4 REST API: Reading Data Overview](ee4-rest-api-reading-data.md)
- [EE4 REST API: Filtering Results in GET requests](ee4-rest-api-GET-filtering-results.md)
- [EE4 REST API: Including Specific Fields and Related Entities in results for GET request](ee4-rest-api-GET-including-specific-fields-and-related-entities-in-results.md)
- [EE4 REST API: GET Response Headers](ee4-rest-api-GET-response-headers.md)
- [EE4 REST API: GET Calculated Fields](ee4-rest-api-GET-calculated-fields.md)

### Schema

- [EE4 REST API: Schema](ee4-rest-api-schema.md)

### RPC Style Endpoints

There are a few endpoints in the EE4 REST API that really don't follow the REST way of doing things, and are more like RPC (Remote Procedure Calls). These endpoints aren't just for simple reading, inserting, updating, or deleting. They have a bunch of other logic tied in there, which can sometimes be handy, so that your application doesn't need to implement all this logic itself (of course if you don't want all this extra logic, you're welcome to use the more traditional RESTy read and writing endpoints instead).

- [EE4 REST API: RPC Style Endpoints Table of Contents](ee4-rest-api-rpc-style-endpoints.md)
- [/checkin](ee4-rest-api-rpc-checkin.md)

### Write Endpoints

- [EE4 REST API: WRITE endpoints](ee4-rest-api-writing-data.md) (POST, PUT, and DELETE requests)
### Libraries/Tools
 
### Related Tutorials

Don't miss the [REST API tutorials in our tutorials section](../T--Tutorials).