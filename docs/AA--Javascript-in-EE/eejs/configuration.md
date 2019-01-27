There are a number of configuration properties that are available on the `eejs` global.  These properties are set from the data exposes on `eejs.data` which comes from various settings on the server.

| Property                                                   | Purpose                                                                         |
| -----------------------------------------------------------| --------------------------------------------------------------------------------|
| [`CURRENCY_CONFIG`](./configuration.md#eejs.currencyconfig)| An `object` containing various current currency settings from the server        |
| [`SERVER_LOCALE`](./configuration.md#eejs-serverlocale)    | An `object` containing the `user` and `site` locale currently set on the server.|
| [`TIMEZONE_CONFIG`](./configuration.md#eejstimezone_config)| An `object` containing the current timezone settings from the server.           |

## `eejs.CURRENCY_CONFIG`

An `object` containing various current currency settings from the server. 

### Properties

| Property        | Type   | Description                                              | Example Value |
| --------------- | ------ | ---------------------------------------------------------| ---- |
| `code`          | string | The ISO code for the currency.               | `'USD'`
| `decimalMark`   | string | The string used to indicate the decimal mark | `'.'`
| `decimalPlaces` | number | The number of decimal places.                   | `2`
| `pluralLabel`   | string | What is the plural label for the currency.     | `'Dollars'` |
| `sign`                | string        | What is the currency sign used.                                                          | `'$'`      |
| `signB4`                | boolean        | Whether the sign comes before the value (true) or after (false)                                                          |`true`      |
| `singularLabel`                |string        | What is the plural label for the currency                                                          | `'Dollar'`      |
| `thousandsSeparator`                |string        | What is the thousands separator for the currency.                                                          |`,`      |

## `eejs.SERVER_LOCALE`
An `object` containing the `user` and `site` locale currently set on the server.

### Properties

| Property |   Type   | Description                                                                                                                                | Example Value                   |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------| --------------------------------|
| `site`   |   string | This is the current default locale for the entire site.                                                                                    | `'en_US'             `          |
| `user`   |   string | This is the current locale for the authorized user.  If the user is not authed (logged in) then this will be equivalent to the `site` value| `'en_US'`                      `|

## `eejs.TIMEZONE_CONFIG`
An `object` containing the current timezone settings for the site from the server.

### Properties

|Property | Type   | Description                                                                                           | Example Value                                        |
|-------- | ------ | ------------------------------------------------------------------------------------------------------| -----------------------------------------------------|
|`offset` | number | The UTC offset for the current timezone (in seconds)                                                  | `-18000             `                                |
|`pretty` | string | The "pretty" label for the timezone.                                                                  | `'New York'                     `                    |
|`string` | string | The [tz database name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for the timezone.| `'America/New_York'                                 `|