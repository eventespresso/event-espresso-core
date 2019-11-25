import { useState } from '@wordpress/element';
import { Button, MenuItem } from '@blueprintjs/core/lib/esm';
import { MultiSelect } from "@blueprintjs/select";

const RelationsSelector = ( {
	items = [],
	itemType ='',
	displayFields = [],
	placeholder = 'assign relations'
}) => {
	const [ relatedItems, setRelatedItems ] = useState( [] );
	console.log(
		'%c RelationsSelector: %c > items: ',
		'color: #F2F500; font-size:14px;',
		'color: #BCBDAC;',
		items
	);
	console.log(
		'%c > relatedItems: ',
		'color: #BCBDAC;',
		relatedItems
	);

	const getItemId = ( item ) => {
		const idField = `${ itemType }Id`;
		return item[ idField ] ? item[ idField ] : '';
	};

	const primaryDisplayField = ( item ) => {
		return item[ displayFields[ 0 ] ] ? item[ displayFields[ 0 ] ] : '';
	};

	const secondaryDisplayField = ( item ) => {
		return item[ displayFields[ 1 ] ] ? item[ displayFields[ 1 ] ] : '';
	};

	const hasRelation = ( relatedItem, log = true ) => {
		if ( log ) {
			const itemId = getItemId( relatedItem );
			console.log(
				'%c > relatedItem ' + itemId + ' hasRelation: ',
				'color: violet;',
				relatedItems.indexOf( relatedItem.id ) > -1
			);
		}
		return relatedItems.indexOf( relatedItem.id ) > -1;
	};

	const handleRelation = ( relatedItem ) => {
		console.log( '%c > : ', 'color: #BCBDAC;', );
		console.log(
			'%c handleRelation %c > relatedItem.id: ' + relatedItem.id,
			'color: SkyBlue; ',
			'color: LightSkyBlue;'
		);
		if ( hasRelation( relatedItem ) ) {
			removeRelation( relatedItem );
		} else {
			assignRelation( relatedItem );
		}
	};

	const assignRelation = ( relatedItem ) => {
		console.log(
			'%c assignRelation %c > relatedItem.id : ' + relatedItem.id,
			'color:YellowGreen; font-size: 14px;',
			'color:lime;'
		);
		const newItems = [ ...relatedItems, relatedItem.id ];
		console.log(
			'%c > newItems: ',
			'color:lime;',
			newItems
		);
		setRelatedItems( newItems );
	};

	const removeRelation = ( relatedItem ) => {
		const itemId = relatedItem.id ? relatedItem.id : relatedItem;
		console.log(
			'%c removeRelation > itemId: ' + itemId,
			'color: Tomato; font-size: 14px;'
		);
		console.log(
			'%c > relatedItems: ',
			'color: blue;',
			relatedItems
		);
		const newItems = relatedItems.filter( ( id ) => id !== itemId );
		console.log(
			'%c > newItems: ',
			'color: Tomato;',
			newItems
		);
		setRelatedItems( newItems );
	};

	const handleTagRemove = ( tag, index ) => {
		console.log(
			'%c handleTagRemove %c > ' + index + ' ) ' + tag,
			'color: orange; font-size: 14px;'
		);
		const relatedItem = relatedItems[ index ];
		console.log( '%c > relatedItem: ', 'color: #BCBDAC;', relatedItem );
		if ( relatedItem ) {
			removeRelation( relatedItem );
		}
	};

	const renderOption = ( relatedItem ) => {
		const itemId = getItemId( relatedItem );
		const primaryField = primaryDisplayField( relatedItem );
		const secondaryField = secondaryDisplayField( relatedItem );
		return (
			<MenuItem
				key={ relatedItem.id }
				text={ `${ itemId }) ${ primaryField }` }
				label={ secondaryField }
				onClick={ () => handleRelation( relatedItem ) }
				icon={ hasRelation( relatedItem, false ) ? 'tick' : 'blank' }
				shouldDismissPopover={ false }
			/>
		);
	};

	const clearButton = relatedItems.length > 0 ?
		<Button
			icon="cross"
			onClick={ () => setRelatedItems( [] ) }
			minimal
		/> :
		undefined;
	return (
		<MultiSelect
			items={ items }
			selectedItems={
				items.filter(
					( items ) => hasRelation( items )
				)
			}
			itemRenderer={ renderOption }
			onItemSelect={ handleRelation }
			tagInputProps={ {
				tagProps: { minimal: false, },
				onRemove: handleTagRemove,
				rightElement: clearButton
			} }
			tagRenderer={ ( relatedItem ) => {
				const itemId = getItemId( relatedItem );
				const primaryField = primaryDisplayField( relatedItem );
				const secondaryField = secondaryDisplayField( relatedItem );
				console.log(
					'%c tagRenderer ' + itemId +
					` ) ${ primaryField } : ${ secondaryField }`,
					'color:pink;'
				);
				return `${ itemId }) ${ primaryField } : ${ secondaryField }`;
			} }
			placeholder={ placeholder }
			noResults={
				<MenuItem disabled text={ 'no results' }/>
			}
			resetOnQuery={ false }
			fill
		/>
	);
};

export default RelationsSelector;
