## Label Value Object
The label value object represents a label which consists of a singular string and plural string.  For example a shoe label where singular is `shoe` and plural is `shoes`.

## Features

The label value object exposes the singular and plural forms of the labels as their raw value but also allows for retrieving formatted strings via helper methods.

## Installation/Loading

The label value object is available via the `eejs` global on its `valueObjects` property.  So you can access it directly via `eejs.valueObjects.Label` provided the bundled `@eventespresso/vo` javascript has been loaded before your script. For instructions on different ways to do this you can [go here](README.md#Usage).

## API

### Constructor
A `Label` value object can be constructed with valid singular and plural strings passed in as the arguments.  If a non string type is passed in for either singular or plural arguments, then a `TypeError` exception is thrown.

**Example:**

```js
const myShoeLabel = new Label( 'shoe', 'shoes' );
```

### _Methods_
#### `Label.assertString`
This is used to assert the passed in value is a string.  It throws a `TypeError` when the value is not a string.

#### `Label.fromSameSingleAndPlural`
This is used to construct an instance of Label using the passed in argument for both singular and plural forms of the label.  This is useful when a label has no distinction between its singular and plural usage.

**Example:**

```js
const approvedLabel = Label.fromSameSingleAndPlural( 'approved' );

// displays 'approved' in both cases
console.log( approvedLabel.singular );
console.log( approvedLabel.plural );
```

### _Properties_
#### `Label.FORMAT_LOWERCASE`

This static property on `Label` can be used to reference the lower case format string (value is `'lower'`).

#### `Label.FORMAT_UPPERCASE`

This static property on `Label` can be used to reference the upper case format string (value is `'upper'`).

#### `Label.FORMAT_SENTENCE_CASE`

This static property on `Label` can be used to reference the sentence case format string (value is `'sentence'`.

### Instance

The following methods and properties exist after instantiating a `Label`.

### _Methods_

#### `setSingular( singular )`

This is a fluid setter for setting the singular property on the `Label`. If the singular property has already been set, this will return a new instance of Label (and the plural property will be an equal value as the current instance).

**Example**:

```js
const myLabel = new Label( 'bird', 'birds' );
const myNewLabel = myLabel.setSingular( 'birdy' );

// returns 'bird'
console.log( myLabel.singular );

// returns 'birdy'
console.log( myNewLabel.singular );

// returns 'birds'
console.log( myNewLabel.plural );
```

#### `setPlural( plural )`

This is a fluid setter for setting the plural property on the `Label`.  If the plural property has already been set, this will return a new instance of `Label` (and the singular property will be an equal value as the current instance).

**Example**:

```js
const myLabel = new Label( 'bird', 'birds' );
const myNewLabel = myLabel.setPlural( 'flock' );

// returns 'birds'
console.log( myLabel.plural );

// returns 'bird'
console.log( myNewLabel.singular );

// returns 'flock'
console.log( myNewLabel.plural );
```

#### `asSentenceCase( singular = true )`

Returns the value for the indicated property formatted in sentence case.  By default returns the value for the singular property, however if you pass in anything but `true` as the argument, then the plural property value is used and returns as sentence case.

> Note, this strips any `-` and `_` in provided label strings.  So for instance if your label value was `something-else`, the value returned would be `Something Else`.

**Example**:

```js
const myLabel = new Label( 'pack of gum', 'packs of gum' );

// 'Pack Of Gum'
console.log( myLabel.asSentenceCase() );

// 'Packs Of Gum'
console.log( myLabel.asSentenceCase( false ) );
```

#### `asLowerCase( singular = true )`

Returns the value for the indicated property formatted in lower case.

**Example**:

```js
const myLabel = new Label( 'HAPPY', 'conFuSed' );

// 'happy'
console.log( myLabel.asLowerCase() );

// 'confused'
console.log( myLabel.asLowerCase( false ) );
```

#### `asUpperCase( singular = true )`

Returns the value for the indicated property formatted in upper case.

**Example**:

```js
const myLabel = new Label( 'dog', 'dogs' );

// 'DOG'
console.log( myLabel.asUpperCase() );

// 'DOGS'
console.log( myLabel.asUpperCase( false ) );
```

#### `asFormatted( singular = true, formatType = Label.FORMAT_SENTENCE_CASE )`

Returns the value for the indicated property formatted according to the provided format type.  The format type must be one of `lower`, `upper`, or `sentence` (recommended to use the label static properties which are `Label.FORMAT_LOWERCASE`, `Label.FORMAT_UPPERCASE` and `Label.FORMAT_SENTENCE_CASE`).

> Note if an unrecognized format type is passed in, then sentence case is used and a warning is thrown in development builds.

**Example**
```js
const myLabel = new Label( 'dog', 'DOGS' );

// Dog
console.log( myLabel.asFormatted() );

// dogs
console.log( myLabel.asFormatted( false, Label.FORMAT_LOWERCASE ) );

// DOG
console.log( myLabel.asFormatted( true, Label.FORMAT_UPPERCASE ) );
```

