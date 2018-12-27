# Extending EE4 REST API in add-ons

This article is about how EE4 Add-ons (specialized WordPress plugins) can extend the EE4 REST API in Event Espresso 4 core, but it also applies to the deprecated EE4 JSON REST API add-on. If you are looking to instead create an application that utilizes EE4 data over HTTP, please see our "Related Articles" section at the bottom of this page.

## Adding Addon Data automatically to the API

The EE4 REST API is built primarily around EE4 Core components: `EE_Config`, EE4 models, EE4 capabilities (tentatively: EE4 messages and Single Page Checkout). If you register your addon like shown in our [Example Skeleton Addon](registering-addons.md), much of your data is already available via the EE4 REST API. Specifically,

* your `EE_Config` class(es) will be available on the config endpoint (eg, https://demoee.org/wp-json/ee/v4.6/config; of course, however, config data is sensitive so you need to be have the necessary capabilities)
* your EE4 models registered will:
    * be added to the EE4 REST API resources page (eg https://demoee.org/wp-json/ee/v4.6/resources),
    * be added as relations onto any models they are related to (eg if you add a model named "Bouncer" which is related to Event, it will be appear as part of any event entities like other related data is),
    * have 2 main routes added to the WP REST API index: an "all" endpoint (eg https://demoee.org/wp-json/ee/v4.6/bouncers), and a "single" endpoint (eg https://demoee.org/wp-json/ee/v4.6/bouncers/23)
    * have endpoints added for each model listed in their relations (eg https://demoee.org/wp-json/ee/v4.6/bouncers/23/events), and for each model that lists them as relations (eg https://demoee.org/wp-json/ee/v4.6/events/42/bouncers)
    * your EE4 capabilities registered will apply to the EE4 models if they follow the standard naming conventions (ie, "ee_{read/edit/delete}_{plural_model_slug}", eg "ee_edit_bouncers")

## Adding Extra Endpoints

If you want to add other endpoints as part of your add-on, feel free to register hooks into WP's normal system for creating new endpoints. We have nothing against this! We just suggest organizing the hooks into an `EE_Module` to keep them organized together, and make sure they're not initialized too early (take a look at the [Example Skeleton Addon](registering-addons.md) for an example of an EE4 module, or look at them in EE4 core: they're all located in event-espresso-core/modules).

## Related Articles

- [Event Espresso 4 REST API: Introduction](../C--REST-API/ee4-rest-api-introduction.md)
- [Event Espresso 4 REST API: Reading Data](../C--REST-API/ee4-rest-api-reading-data.md)
- [Event Espresso 4 REST API: RPC-Style Endpoints](../C--REST-API/ee4-rest-api-rpc-style-endpoints.md)
- [Event Espresso 4 REST API: Testing Tools](../C--REST-API/ee4-rest-api-testing-tools.md)
If you are looking to instead create an application that utilizes EE4 REST data over HTTP, you probably want to instead read [EE4 REST API: reading data](../C--REST-API/ee4-rest-api-reading-data.md) or our example [EE4 JSON REST API Client tutorial](../T--Tutorials/building-an-ee4-addon-that-uses-angular-js-and-the-ee4-json-rest-api.md).
