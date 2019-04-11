# `<StepBubbleMenu />`

This outputs an accessible menu used for articulating steps in a process.  The value, labels, slugs, and number of steps is configurable.

![Menu in action ](https://cl.ly/4d93167337ea/Screen%20Recording%202019-04-08%20at%2009.29%20PM.gif)

```jsx
<StepBubbleMenu
  bubbleClick={ () => null }
  bubbleData={ [] }
  clickable={ [] }
  activeBubble={ '' }
/>
```

## Props
### `bubbleClick`

This is a callback that will be fired when a menu item is clicked or toggled via keyboard when menu is in focus (Enter key or OS specific menu item trigger).

Typically components implementing this menu component will use this callback to trigger view state (as in the gif example above).

The callback receives the `slug` of the bubble clicked.

**Example:**

```jsx
import { StepBubbleMenu } from '@eventespresso/components';
// or you could do this for es5
// const { StepBubbleMenu } = eejs.components;

const myComponentWithMenu = () => {
	function stepCallback( slug ) {
		// do something with slug
	}
	return <div>
		<StepBubbleMenu bubbleClick={ stepCallback } />
	</div>
};

export default myComponentWithMenu;
```

| Type   | Required | Default            |
| ------ | -------- | -------------------|
| string | No       | `() => null       `|

### `bubbleData`

This is expected to be an array of option configs for each menu item in the menu.  The shape of each object in this array is:

```js
const menuItem = {
  label: 'Choose Event',
  slug: 'choose_event',
  value: 1
}
```
With this configuration array, you are able to dynamically configure the output of the menu.

**Example:**

```jsx
import { StepBubbleMenu } from '@eventespresso/components';
// or you could do this for es5
// const { StepBubbleMenu } = eejs.components;

const myComponentWithMenu = () => {
	function stepCallback( slug ) {
		// do something with slug
	}
	const menuItems = [
		{ label: 'Choose Event', slug: 'choose_event', value: 1 },
		{ label: 'Choose Datetime', slug: 'choose_datetime', value: 2 },
		{ label: 'Scan', slug: 'scan', value: 3 },
	];
	return <div>
		<StepBubbleMenu
			bubbleClick={ stepCallback }
			bubbleData={ menuItems }
		/>
	</div>
};

export default myComponentWithMenu;
```
|Type  | Required | Default |
|----- | -------- | ------- |
|Array | No       | []      |

### `clickable`

An array of slugs that should have a click event attached.  

This allows for finer control of what step indicators can be toggled by the user (useful when there's predefined conditions require for other menu items to be available)

**Example:**
```jsx
import { StepBubbleMenu } from '@eventespresso/components';
// or you could do this for es5
// const { StepBubbleMenu } = eejs.components;

const myComponentWithMenu = () => {
	function stepCallback( slug ) {
		// do something with slug
	}
	const menuItems = [
		{ label: 'Choose Event', slug: 'choose_event', value: 1 },
		{ label: 'Choose Datetime', slug: 'choose_datetime', value: 2 },
		{ label: 'Scan', slug: 'scan', value: 3 },
	];
	// only the choose_event step is clickable
	const clickable = [ 'choose_event' ];
	return <div>
		<StepBubbleMenu
			bubbleClick={ stepCallback }
			bubbleData={ menuItems }
			clickable={ clickable }
		/>
	</div>
};

export default myComponentWithMenu;
```

| Type  | Required | Default |
| ----- | -------- | ------- |
| Array | No       | []      |

## activeBubble

This indicates what step (via slug) should be considered "active".

**Example:**
```jsx
import { StepBubbleMenu } from '@eventespresso/components';
// or you could do this for es5
// const { StepBubbleMenu } = eejs.components;

const myComponentWithMenu = () => {
	function stepCallback( slug ) {
		// do something with slug
	}
	const menuItems = [
		{ label: 'Choose Event', slug: 'choose_event', value: 1 },
		{ label: 'Choose Datetime', slug: 'choose_datetime', value: 2 },
		{ label: 'Scan', slug: 'scan', value: 3 },
	];
	const clickable = [ 'choose_event' ];
	return <div>
		<StepBubbleMenu
			bubbleClick={ stepCallback }
			bubbleData={ menuItems }
			clickable={ clickable }
			activeBubble={ 'choose_event' }
		/>
	</div>
};

export default myComponentWithMenu;
```

| Type   | Required | Default |
| ------ | -------- | ------- |
| string | No       | '''     |

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