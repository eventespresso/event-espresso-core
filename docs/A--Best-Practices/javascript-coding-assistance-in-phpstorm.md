## Javascript Code Assistance in PHPStorm

Out of the box PhpStorm does really well with javascript code assistance (code completion tools, goto etc). However EE javascript has a webpack configuration setup where we export some of our modules to a `eejs` global and alias that as an external in our modules.  For example:

```js
module.exports({
    externals: {
        '@eventespresso/eejs' : 'eejs',
        '@eventespresso/validators': 'eejs.validators',
    }
});
```

The unfortunate side effect of this is that whenever we reference one of these "external" mapped aliased imports in our modules, PhpStorm doesn't know where to find it because by default it looks in `node_modules` for imports.  So for example something like this isn't resolved by PhpStorm's indexing:

```js
import { isSchema } from '@eventespresso/validators'
```

Fortunately, there's a solution!  In the root folder of event-espresso-core, I've added a _pseudo_ webpack config (pseudo in that it's not used in actually building any files) that simply has a map of aliases.  PhpStorm can be configured to point to a specific webpack config file and if there's an `alias` entry in it, it uses that to figure out what aliased imports point to.

So all you need to do is go to the PhpStorm preferences settings. Navigate to `Languages and Frameworks > Javascript > Webpack` and set the path to the webpack config file to `phpstorm-webpack.config.js` in the Event Espresso plugin root folder. It'll look something like this:

![screenshot for phpstorm config](https://www.evernote.com/l/AAP1MBPNsc9F_5H0B8YFBEkr0INkSFT6OAEB/image.png)

Once you've done that, click apply.  You _may_ need to restart phpstorm so that a re-index is done to pick up the aliases.

With that in place, you'll now get code assistance for all the aliased imports!