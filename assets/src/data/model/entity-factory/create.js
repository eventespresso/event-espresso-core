/**
 * External imports
 */
import { camelCase, capitalize, forEach, isUndefined } from 'lodash';

/**
 * Internal imports
 */
import { assertValidFieldAgainstSchema, assertValidValueForPreparedField } from './assertions';
import { deriveRenderedValue, deriveValueForField, getRelationNameFromLink } from './extractors';
import { isEntityField } from './booleans';

export const createGetter = ( instance, fieldName, fieldValue ) => {
	Object.defineProperty( instance, fieldName, {
		get() {
			return fieldValue;
		},
	} );
};

export const createGetterAndSetter = ( instance, fieldName, initialFieldValue, dirtyProperty ) => {
	let property = initialFieldValue;
	Object.defineProperty( instance, fieldName, {
		get() {
			return property;
		},
		set( receivedValue ) {
			assertValidValueForPreparedField( property, receivedValue, instance.schema );
			instance[ dirtyProperty ] = true;
			property = receivedValue;
		},
	} );
};

export const createFluentSetter = ( instance, fieldName ) => {
	Object.defineProperty( instance, 'set' + capitalize( fieldName ), {
		get() {
			return ( receivedValue ) => {
				instance[ fieldName ] = receivedValue;
				return instance;
			};
		},
	} );
};

export const createInitialGettersAndSetters = ( instance, privateProperties ) => {
	forEach(
		instance.originalFieldsAndValues,
		( fieldValue, fieldName ) => {
			assertValidFieldAgainstSchema( instance.modelName, fieldValue, instance.schema );
			if ( isEntityField( fieldName ) ) {
				setInitialEntityFieldsAndValues( instance, fieldName, fieldValue, privateProperties );
			}
			if ( fieldName === '_calculated_fields' ) {
				setCalculatedFieldAndValues( instance, fieldValue );
			}
			if ( fieldName === 'link' ) {
				createGetter( instance, 'link', fieldValue );
			}
			if ( fieldName === '_links' ) {
				setResources( instance, fieldValue );
			}
		}
	);
};

export const setInitialEntityFieldsAndValues = ( instance, fieldName, fieldValue, privateProperties ) => {
	createRawEntityGettersSetters(
		instance,
		fieldName,
		deriveValueForField( fieldName, fieldValue, instance.schema ),
		privateProperties.dirty
	);
	createRenderedGetters( instance, fieldName, deriveRenderedValue( fieldValue ) );
};

export const createRawEntityGettersSetters = ( instance, fieldName, fieldValue, dirtyProperty ) => {
	// this allows for private property holding the actual field value that can be changed via setter but NOT directly.
	createGetterAndSetter( instance, fieldName, fieldValue, dirtyProperty );
	createFluentSetter( instance, fieldName );
};

const getRenderedCallback = ( instance ) => ( requestedFieldName ) => instance[ requestedFieldName + 'Rendered' ];

export const createRenderedGetters = ( instance, fieldName, fieldValue ) => {
	createGetter( instance, fieldName + 'Rendered', fieldValue );
	createGetter( instance, 'getRendered', getRenderedCallback( instance ) );
};

export const hasCalculatedFieldCallback = ( instance ) =>
	( fieldNameToCheck ) => ! isUndefined( instance[ fieldNameToCheck ] );

export const setCalculatedFieldAndValues = ( instance, fieldsAndValues ) => {
	forEach( fieldsAndValues, ( calculatedFieldValue, calculatedFieldName ) => {
		createGetter( instance, camelCase( calculatedFieldName ), calculatedFieldValue );
		createGetter( instance, 'hasCalculatedField', hasCalculatedFieldCallback( instance ) );
	} );
};

export const setResources = ( instance, fieldsAndValues ) => {
	const relations = [];
	let relationName;
	forEach( fieldsAndValues, ( resourceValue, resourceName ) => {
		if ( resourceName === 'self' ) {
			createGetter( instance, 'resourceLink', resourceValue[ 0 ].href );
		} else if ( resourceName === 'collection' ) {
			createGetter( instance, 'collectionResourceLink', resourceValue[ 0 ].href );
		} else {
			relationName = getRelationNameFromLink( resourceName );
			relations.push( relationName );
			setRelationsResource( instance, relationName, resourceValue );
		}
	} );
	//set relations getter
	createGetter( instance, 'getRelations', relations );
};

export const getRelationResourceCallback = ( instance ) => ( relationName ) => instance[ relationName ];

export const setRelationsResource = ( instance, relationName, resourceInfo ) => {
	createGetter(
		'instance',
		relationName,
		{
			resourceLink: resourceInfo[ 0 ].href,
			single: resourceInfo[ 0 ].single,
		}
	);
	createGetter( instance, 'getRelationResource', getRelationResourceCallback( instance ) );
};
