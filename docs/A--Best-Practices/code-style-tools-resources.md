## PHPCS Linting

Every official EE4 project utilizes the [Event Espresso Coding Standards](https://github.com/eventespresso/ee-coding-standards) phpcs tool for linting php.  You can set this up by executing this in the root folder of the EE project (for instance `wp-content/plugins/event-espresso-core`):

```bash
composer install
composer run-script config-eventespressocs
``` 
 
 Once that's installed you can just run the tool via:
 
 ```bash
 composer run-script lint
 ```
 
 Or, if you prefer npm
 
 ```bash
 npm run lint-php
 ```
 
## PhpStorm Setup
 
 To set up PHPStorm, you can [refer to their documentation](https://www.jetbrains.com/phpstorm/help/using-php-code-sniffer-tool.html) for setting up the PHP Code Sniffer tool.  During the installation you will select the `EventEspresso` standard from the PHP Code Sniffer Validation inspection options.
 
 As well, for additional PHPStorm based linting and auto-code formatting, you can import the [EE Code Styles](https://github.com/eventespresso/project-configuration/tree/master/phpstorm/code-styles) package.  This helps you follow the standards as you are writing code rather than having things linted for you after the fact.
