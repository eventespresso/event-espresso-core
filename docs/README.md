# Getting started with the EE Developer Docs

In this docs folder is all the developer documentation specific to EE core.  Located in the various folders are the documentation regarding the various systems in EE.

> We generally add new documentation, or edit existing documentation specific to the code in the branch this folder lives.  So depending on the branch you are viewing this in, the documentation could be different than other branches.

## Table of Contents

All the links to the table of contents for each folder in this documentation:
 
| Topic | Purpose |
| ----- | ------- |
[Best Practices](A--Best-Practices) | Documents outlining best-practices and standards being used in developing for Event Espresso.
[Automated Testing](B--Automated-Testing) | Documents outlining how automated testing is done in Event Espresso development.
[REST API](C--REST-API) | All documentation related to the EE REST API
[Addon API](D--Addon-API) | All documentation pertaining to the system provided for extending Event Espresso via add-ons.
[Messages System](E--Messages-System) | All documentation about the messages subsystem in Event Espresso
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
