# Cuid for PHP [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/endyjasmi/cuid?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/endyjasmi/cuid.svg?branch=master)](https://travis-ci.org/endyjasmi/cuid) [![Coverage Status](https://coveralls.io/repos/endyjasmi/cuid/badge.png?branch=master)](https://coveralls.io/r/endyjasmi/cuid?branch=master) [![SensioLabsInsight](https://insight.sensiolabs.com/projects/49dcc316-3f00-4573-a1c1-91dedffa1829/mini.png)](https://insight.sensiolabs.com/projects/49dcc316-3f00-4573-a1c1-91dedffa1829) [![Latest Stable Version](https://poser.pugx.org/endyjasmi/cuid/v/stable.svg)](https://packagist.org/packages/endyjasmi/cuid) [![Total Downloads](https://poser.pugx.org/endyjasmi/cuid/downloads.svg)](https://packagist.org/packages/endyjasmi/cuid) [![License](https://poser.pugx.org/endyjasmi/cuid/license.svg)](https://packagist.org/packages/endyjasmi/cuid)

This library provides a collision resistant id (hashes) for horizontal scaling and sequential lookup performance. This README will only cover basic detail and PHP specific implementation.

__Do [refer to the original project](http://usecuid.org/) for the full description of the project.__

## Requirement
1. PHP 5.4 and above

## Installation
This library can be installed through composer. Just add the following to your `composer.json` and run `composer install`.

```json
{
	"require": {
		"endyjasmi/cuid": "2.*"
	}
}
```

## Quickstart
Here's how to use it
```php
// Include composer autoloader
require 'vendor/autoload.php';

// Create a cuid instance
$cuid = new EndyJasmi\Cuid;

// Generate normal cuid
$normalCuid = $cuid->cuid(); // ci27flk5w0002adx5dhyvzye2

// Generate short cuid
$shortCuid = $cuid->slug(); // 6503a5k0

// You can also generate cuid using static method
$normalCuid = Cuid::cuid();
$shortCuid = Cuid::slug();

// There is also an alias method for better readability
$normalCuid = Cuid::make();
```

## License
This library is licensed under MIT as shown below. Exact copy of the license can be found in `LICENSE` file.

```
The MIT License (MIT)

Copyright (c) 2014 Endy Jasmi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

# Feedback
Want to say hello to me? You can reach me at [endyjasmi@gmail.com](mailto:endyjasmi@gmail.com) or

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/endyjasmi/cuid?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
