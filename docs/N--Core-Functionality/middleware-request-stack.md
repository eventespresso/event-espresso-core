# Middleware Request Stack

Sometimes, you just have to say no!

And sometimes that happens when an incoming request for your WordPress plugin doesn't pass a specific set of criteria and therefore should not be allowed to continue. Turns out there are several scenarios where Event Espresso needs to control whether or not an incoming request should be allowed to proceed and continue to load logic from within the plugin or one of our add-ons. We could just have one big file full of conditional `if else` type statements that all run on every request... or maybe  there is a better way...

### The Request Stack and Middleware Apps

In some PHP frameworks like Symfony, a Request Stack is used to process the incoming request and convert it into a Response that gets returned to the agent that made the request (although the Event Espresso Request Stack doesn't function quite the same since we are a WordPress plugin). The Request Stack itself is a series of classes that utilize the Decorator pattern, which means they all share a common set of method signatures that allow them to recursively wrap the core application as well as each other. It's like putting a box into a box, then putting that into another box, and then doing that again and again. 

The incoming request has to pass through each of these layers to get to the core application that sits at the very center of the Request Stack. Because each of the layers is composed of a class that sits in the middle between the incoming request and the core app, they are referred to as Middleware apps.

Middleware apps have two primary functions:

 * to determine whether or not the current request should be allowed to proceed to the Core Application
 * to execute some logic that needs to happen on every single request before any other logic from the Core Application runs

Some typical uses for middleware apps include:

 * IP address restriction and throttling
 * authentication
 * bot detection and handling
 * request logging
 * error handling
 
### Adding a Middleware App

Right near the beginning of the Event Espresso bootstrapping process, the `EventEspresso\core\services\request\RequestStackBuilder` class is constructed which allows middleware app classes to be added onto the stack for execution later in the bootstrapping process. This is done using the `FHEE__EventEspresso_core_services_bootstrap_BootstrapCore__buildRequestStack__stack_apps` filter which exposes a single parameter which consists of an array where the keys are "Fully Qualified Class Names" (FQCNs) for a  middleware app and the value is an array of arguments to be passed to the middleware app's class constructor:

```php
array(
    'EventEspresso\core\services\request\middleware\BotDetector' => array(),
    'EventEspresso\core\services\request\middleware\DetectFileEditorRequest' => array(),
    'EventEspresso\core\services\request\middleware\PreProductionVersionWarning' => array(),
    'EventEspresso\core\services\request\middleware\RecommendedVersions' => array(),
    'EventEspresso\core\services\request\middleware\DetectLogin' => array(),
)
```

The arguments array can obviously be empty if no parameters are needed during construction. So adding your own middleware app to the above is as simple as something like:

```php
add_filter(
    'FHEE__EventEspresso_core_services_bootstrap_BootstrapCore__buildRequestStack__stack_apps',
    'addMyMiddleware'
);
function addMyMiddleware($middleware_stack_apps)
{
    $middleware_stack_apps['Fully\Qualified\ClassName\MyMiddlewareApp'] = array();
    return $middleware_stack_apps;
}
```


##### IMPORTANT
 
*Because the Event Espresso Request Stack is constructed extremely early in the bootstrapping process, you need to ensure your `add_filter()` call happens prior to the `plugins_loaded` WordPress hook point at priority 0. If you control the theme on your site, then this would ideally go in your `functions.php` file. If you are adding your middleware app via a plugin, then this would need to be done within the plugin's main file.*

### Anatomy of a Middleware App

All Event Espresso middleware apps should ideally be a child class of `EventEspresso\core\services\request\middleware\Middleware` which  implements `EventEspresso\core\services\request\RequestDecoratorInterface` (so technically your middleware app could simply implement that interface and **not** extend the `Middleware` class itself, but you would need to ensure that your class handles the logic from that parent class in relatively the same way, or you know, bad stuff will happen).

`RequestDecoratorInterface` specifies only one single method:

```php
    /**
     * converts a Request to a Response
     * can perform their logic either before or after the core application has run like so:
     *    public function handle_request( EE_Request $request, EE_Response $response ) {
     *        $this->request = $request;
     *        $this->response = $response;
     *      // logic performed BEFORE core app has run
     *      $response = $this->process_request_stack( $this->request, $this->response );
     *      // logic performed AFTER core app has run
     *      return $response;
     *    }
     *
     * @param RequestInterface $request
     * @param ResponseInterface      $response
     * @return ResponseInterface
     */
    public function handleRequest(RequestInterface $request, ResponseInterface $response);
```

therefore your middleware app class can be as simple as:

```php
class MyMiddlewareApp extends Middleware
{
    /**
     * @param RequestInterface  $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     */
    public function handleRequest(RequestInterface $request, ResponseInterface $response)
    {
        echo 'I do nothing!!!';
        return $this->processRequestStack($request, $response);
    }
}
```

although it is highly recommended that your class does more than nothing!

The `processRequestStack()` method is part of the parent `Middleware` class and despite not being part of the contract specified by `RequestDecoratorInterface`, will need to be called somewhere within `handleRequest()` or else have that same logic (or a decent facsimile) within your own class.
