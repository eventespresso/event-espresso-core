###Event Espresso Core Functionality and Modern Best Practices

Event Espresso, much like WordPress core, has a fair amount of older "legacy" code that hasn't done the best job of following modern best practices.
As the complexity of Event Espresso has grown, the shortcomings of some of these older practices have proved to be troublesome.
Because of this, we have tasked ourselves with updating Event Espresso's codebase to follow modern best practices, at least where WordPress itself doesn't hold us back.

Below you will find descriptions and examples of new changes that are beginning to happen that will allow Event Espresso to do more, and do it better.

##Table of Contents

- [Namespaces and PSR-4 Compatible Autoloading](psr-4-autoloading.md)
- [Legacy Dependency Injection](legacy-dependency-injection.md)
- [Dependency Injection and the CoffeeShop DI container](dependency-injection-coffeepot.md)
- [Middleware Request Stack](middleware-request-stack.md)
- [Command Bus and Hexagonal Architecture](command-bus-hexagonal-architecture.md)
- [Contexts and Context Checkers.md](contexts-and-context-checkers.md)
