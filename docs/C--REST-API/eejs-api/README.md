## EEJS-API

> **Note: This library is still in development and being worked on internally as we implement it for various ui elements in EE.  So consider this documentation still in flux.  We _welcome_ contributions by any developers who start using this, but be aware that everything is subject to change**

The eejs-api is a library for building vue.js apps.  It provides developers a tool for accessing and working with EE data via the EE REST API.  With this library the developer can focus on building the app and saves having to rebuild boilerplate code over and over for accessing EE model data and reading/writing to and from the server.

## Contents

Document | Purpose |
|--------|---------|
[Overview](eejs-api-overview.md) | When implemented you can use this to automatically build EE model and collection components that can be used in your views.
[Authentication](eejs-api-authentication.md) | Authentication with the eejs.api library
[eejs.api.main](eejs-api-main.md) | The main eejs.api object. 
[eejs.api collections](eejs-api-collections.md) | Using eejs-api collection component options and mixins
[eejs.api models](eejs-api-models.md) | Using eejs-api model component options and mixins.
[eejs.api Relations](eejs-api-relations.md) | Structure and implementing relations in the library (relation components and mixins).
[eejs.api Watchers and Computed Properties](eejs-api-watchers-and-computed-properties.md) | How vue watchers and computed properties are implemented in the library.
[eejs.utils](eejs-utils.md) | All the utility methods exposed on eejs.api.utils
[eejs.api.store](eejs-api-store.md) | About the custom vuex store instance in eejs.api.
 
## Examples/Code Recipes

[Examples and Code Recipes implementing the eejs-api library](examples/README.md)