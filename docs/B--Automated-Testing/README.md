The documents in this folder outline how we do automated testing in EE.

**Note:** 

Currently we have automated tests running in travis-ci.com.  The tests are configured so that if the last commit pushed to a pull has the string `js_only` anywhere in it, then only javascript test builds will run.  This is useful when you know the pull only has javascript changes and there's no need to run php tests.

## Table of Contents

- [Automated Testing in Event Espresso](automated-testing-in-event-espresso.md)
- [Writing automated tests for Event Espresso dependent plugins](writing-automated-tests-for-ee-plugins.md)
- [Testing Javascript](../AA--Javascript-in-EE/testing-javascript.md)