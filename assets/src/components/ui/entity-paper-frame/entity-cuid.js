/**
 * External imports
 */
import classNames from 'classnames';
import { useMemo } from '@wordpress/element';
import { shortenCuid } from '@eventespresso/utils';

const EntityCuid = ( { entityID, align = 'left' } ) => {
	const htmlClass = classNames(
		'ee-entity-details-id',
		'ee-focus-priority-9',
		{
			'ee-align-lft': align === 'left',
			'ee-align-rgt': align === 'right',
		}
	);
	return useMemo( () => (
		<p className={ htmlClass }>
			<span>#</span>{ shortenCuid( entityID ) }
		</p>
	), [ entityID, align ] );
};

export default EntityCuid;
