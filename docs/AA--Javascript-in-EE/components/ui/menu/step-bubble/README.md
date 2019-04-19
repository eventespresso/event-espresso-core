# `<StepBubbleMenu />`

This outputs an accessible menu used for articulating steps in a process.  The value, labels, slugs, and number of steps is configurable.

![Menu in action ](https://cl.ly/4d93167337ea/Screen%20Recording%202019-04-08%20at%2009.29%20PM.gif)

```jsx
<StepBubbleMenu
  bubbleData={ {} }
/>
```

## Props

### `bubbleData`

The component expects a single prop labelled `bubbleData` which is the configuration object for the steps. This is to be a collection of objects indexed by slugs for each step. 

```js
const bubbleData = {
  stepOne: { /* configuration for step one */ },
  stepTwo: { /* configuration for step two */ },
}
```
The configuration object should contain the following properties:

|Property  | Type                                           | Description                                                                                                   |
|--------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------|
|label     | `string    `                                   | The label for the step that will be displayed to the user.                                                    |
|value     | `mixed`                                        | The value assigned to the step as it appears in the step bubble itself (eg `1`)                               |
|action    | `function            `                         | This is a callback that will be invoked when the step bubble is clicked or when activated via keypress (Enter)|
|clickable | `boolean                      `                | Indicates whether the step should be clickable/actionable.  If false then the bubble is display only          |
|active    | `boolean`                                      | Indicates whether the step should receive "active" state styling.                                             |
Here's an example of a step configuration object:
```js
const bubbleData = {
  choose_event: {
    label: 'Choose Event',
    value: 1,
    action: ( slug ) => handleClickFunction(),
    clickable: true,
    active: false,
  },
};
```
With this configuration array, you are able to dynamically configure the output of the menu.

**Example:**

```jsx
import { StepBubbleMenu } from '@eventespresso/components';
// or you could do this for es5
// const { StepBubbleMenu } = eejs.components;

const myComponentWithMenu = () => {
	function stepCallback( slug ) {
		// do something for step click event.  The incoming slug allows you to derive what step was clicked.
	}
	const menuItems = {
	  choose_event: {
	    label: 'Choose Event',
	    value: 1,
	    action: stepCallback,
	    clickable: false,
	    active: true,
	  },
	  choose_datetime: {
	    label: 'Choose Datetime',
	    value: 2,
	    action: stepCallback,
	    clickable: false,
	    active: false,
	  },
	  scan: {
	    label: 'Scan',
	    value: 3,
	    action: stepCallback,
	    clickable: false,
	    active: false,
	  }
	};
	return <div>
		<StepBubbleMenu
			bubbleData={ menuItems }
		/>
	</div>
};

export default myComponentWithMenu;
```
|Type   | Required | Default |
|------ | -------- | ------- |
|Object | Yes      | {}      |

## Usage

> **Note**: if you plan on exposing something wrapping this component as a component itself on `eejs.components` (this will be the case if you are adding your new component to the `components` folder), then import this component directly via relative path.

This component is exposed two ways:

**`eejs.components` global**

```js
const { StepBubbleMenu } = eejs.components;
```

**`@eventespresso/components` package**

```js
import { StepBubbleMenu } from '@eventespresso/components'
```

**Note**: this package isn't published yet so you'll need to point to it via your build process. For example, if you use webpack you can register this as an external via:

```js
module.exports = {
    externals: {
        '@eventespresso/components': 'eejs.components',
    }
}
```

You will need to ensure that the event espresso components bundle is a dependency for your implemented code.  You could do something like this:

```php
use EventEspresso\core\domain\services\assets\CoreAssetManager;

wp_register_script(
    'my-script',
    'https://url-to-my-script.com'
    [ CoreAssetManager::JS_HANDLE_COMPONENTS ],
    $version_string,
    true
);
```