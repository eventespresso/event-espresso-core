From the [react documentation](https://reactjs.org/docs/higher-order-components.html):

> A higher-order component (HOC) is an advanced technique in React for reusing comopnent logic.  HOCs are not a part of the REACT API, per se. They are a pattern that emerges from React's compositional nature.

Within EE, we use higher order components to extract common patterns we see in use for various components to keep our architecture DRY (Don't Repeat Yourself principle).

All the higher order components listed in this section of our documentation are exposed within WordPress via the `EventEspresso\core\domain\services\assets\CoreAssetManager::JS_HANDLE_HOCS` script handle that can be used when registering your own script implementing a HOC.  Individual HOC documentation will further elaborate on how to implement it.

| HOC | Description |
| --------- | ------------ |
| [`withBaseControl`](base-control.md) | Implements a `<BaseControl />` wrapper around the provided Component |
| [`withMoney`](with-money.md) | Used for converting props representing money values to [`Money` value objects](../value-objects/money.md)
