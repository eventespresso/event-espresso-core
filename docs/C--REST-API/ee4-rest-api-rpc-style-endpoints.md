# EE4 REST API: RPC Style Endpoints Table of Contents

There are a few endpoints in the EE4 REST API that really don't follow the REST way of doing things, and are more like RPC (Remote Procedure Calls). These endpoints aren't just for simple reading, inserting, updating, or deleting. They have a bunch of other logic tied in there, which can sometimes be handy, so that your application doesn't need to implement all this logic itself (of course if you don't want all this extra logic, you're welcome to use the more traditional RESTy read and writing endpoints instead).

- [/checkin](ee4-rest-api-rpc-checkin.md)