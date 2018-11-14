# `<AvatarImage />`

Outputs a styled image for the provided avatar details.

The following is the shape of the Component:

```jsx
<AvatarImage
    avatarUrl={ '' }
    avatarClass={ 'contact' }
    avatarHeight={ 32 }
    avatarWidth={ 32 }
    avatarAltText={ 'user avatar' }
/>
```

## Props

### avatarUrl

The url to the image used for the avatar.  If no url is provided, the component will return null.

- Type: `String`
- Required: No
- Default: ''

### avatarClass

The string to use for the css class prefix.  The outer `div` container will end up with `{ avatarClass } + '-image-wrap-div` and the `img` tag will end up with `{ avatarClass } + '-avatar-img avatar'`

- Type: `String`
- Required: No
- Default: "contact"

### avatarHeight

This will be used for the `height` attribute on the `img` tag.

- Type: `Number`
- Required: No
- Default: 32

### avatarWidth

This will be used for the `width` attribute on the `img` tag.

- Type: `Number`
- Required: No
- Default: 32

### avatarAltText:

This will be used for the value of the `alt` attribute on the `img` tag.

- Type: `String`
- Required: No

## Usage

Note: if you plan on exposing something wrapping this component as a component itself on `eejs.components` (this will be the case if you are adding your new component to the `components` folder), then import this component directly via relative path.

This component is exposed two ways:

**`eejs.components` global**

```js
const { AvatarImage } = eejs.components;
```

**`@eventespresso/components` package**

```js
import { AvatarImage } from '@eventespresso/components'
```

Note: this package isn't published yet so you'll need to point to it via your build process. For example, if you use webpack you can register this as an external via:

```js
module.exports = {
    externals: {
        '@eventespresso/components': 'eejs.components',
    }
}
```

You will need to ensure that the eventespresso components bundle is a dependency for your implemented code.  You could do something like this:

```php
use EventEspresso\core\domain\services\assets\CoreAssetManager;

wp_register_script(
    'my-script',
    'https://url-to-my-script.com'
    array( CoreAssetManager::JS_HANDLE_COMPONENTS ),
    $version_string,
    true
);
```
