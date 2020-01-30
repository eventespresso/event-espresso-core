# Getting started with the EE Developer Docs

In this docs folder is all the developer documentation specific to EE core.  Located in the various folders are the documentation regarding the various systems in EE.

> We generally add new documentation, or edit existing documentation specific to the code in the branch this folder lives.  So depending on the branch you are viewing this in, the documentation could be different than other branches.

Please note that notable changes for each released version of the project can be found in our [changelog](https://eventespresso.com/wiki/ee4-changelog/)

## Table of Contents

All the links to the table of contents for each folder in this documentation:
 
| Topic | Purpose |
| ----- | ------- |
[Best Practices](A--Best-Practices) | Documents outlining best-practices and standards being used in developing for Event Espresso.
[Javascript and CSS in EE](AA--Javascript-in-EE) | Various documentation related to javascript and CSS within Event Espresso.
[Automated Testing](B--Automated-Testing) | Documents outlining how automated testing is done in Event Espresso development.
[REST API](C--REST-API) | All documentation related to the EE REST API
[Addon API](D--Addon-API) | All documentation pertaining to the system provided for extending Event Espresso via add-ons.
[Messages System](E--Messages-System) | All documentation about the messages subsystem in Event Espresso
[Datetime System](F--Datetime-System) | All documentation about how dates, times and timezones function in Event Espresso.
[Model System](G--Model-System) | All documentation about using the Event Espresso model system for interacting with the database.
[Data Migration Scripts System](H--Data-Migration-System) | All documentation about the data migration system in EE.
[Filter and Action Hooks in EE](I--Filter-and-Action-Hooks-in-EE) | Documents specific filter and action hooks in EE.
[EE4 Forms System](J--EE4-Forms-System) | Documents related to the EE4 forms system.
[EE4 Capability System](K--EE4-Capability-System) | Documents related to the EE4 Capability System and user management.
[Payment Methods and Gateways](L--Payment-Methods-and-Gateways) | Documents related to using/developming payment methods and gateway classes in EE4.
[Batch Jobs Library](M--Batch-Jobs-System) | Documents related to explaining the batch job processing, which facilitates doing tasks that take so long that they need to be spread across multiple HTTP requests (in order to avoid timeouts and running out of memory).
[Tutorials](T--Tutorials) | All tutorials instructing how to use EE more effectively as a developer.
[General](Z--General) | Documentation that more generally applies to all of Event Espresso vs specific subsystems.

## Where do I leave comments/questions?

If you have any questions  regarding any of the documentation, we invite you to open up issues in our [github repo](https://github.com/eventespresso/event-espresso-core/issues).  If you have suggestions for edits to the documentation, please submit a pull request with
your suggestions.

## Structure for these docs

Each folder represents a major system/topic for documentation.  The name of the folder is prefixed with a letter to help with sorting (sorted by default alphabetically when viewed via github).  Thus any folders that are to be injected can easily be done alphabetically (i.e. `AA--New-Folder` would appear between `A--Best-Practices` and `B--Automated-Testing`)  All images in documentation should be be uploaded to the `/docs/images` folder and linked to relatively in the documentation.  As an example, something like:

```
![image alt text](../images/my_image.png)
```

Any internal linking to documentation should also be done relatively.  As an example, something like:

```
[Link text](A--Best-Practices/README.md)
```
Which results in [Link text](A--Best-Practices/README.md)
