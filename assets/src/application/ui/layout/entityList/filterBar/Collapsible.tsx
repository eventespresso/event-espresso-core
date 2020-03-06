import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';

import { CollapsibleProps } from './types';
import { SearchInput } from '../../../input';
import useRect from '../../../../services/hooks/useRect';

/**
 * Collapsible
 * This component is an extraction from EntityListFilterBar
 * and is intended to be used only in context with that parent component.
 */
const Collapsible: React.FC<CollapsibleProps> = ({
	entityFilters,
	listId,
	searchText,
	setSearchText,
	showEntityFilters = false,
}) => {
	const ref = useRef<HTMLDivElement>();
	const { height } = useRect(ref);
	const props = useSpring({
		height: showEntityFilters ? height : 0,
		opacity: showEntityFilters ? 1 : 0,
	});

	return (
		<animated.div style={props}>
			<div className='ee-filter-bar-filter-collapsible' ref={ref}>
				{showEntityFilters && (
					<>
						{entityFilters}
						<SearchInput
							className={'ee-filter-bar-filter ee-filter-bar-filter--big'}
							id={listId}
							searchText={searchText}
							setSearchText={setSearchText}
						/>
					</>
				)}
			</div>
		</animated.div>
	);
};

export default Collapsible;
