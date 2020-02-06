import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';

import { PerPageControl, SearchInput } from '../../../input';
import useRect from '../../../../services/hooks/useRect';

type voidFn = () => void;

interface CollapsibleProps {
	entityFilters: JSX.Element;
	listId: string;
	perPage: number;
	searchText: string;
	setPerPage: voidFn;
	setSearchText: voidFn;
	showEntityFilters: boolean;
}

/**
 * Collapsible
 * This component is an extraction from EntityListFilterBar
 * and is intended to be used only in context with that parent component.
 */
const Collapsible: React.FC<CollapsibleProps> = ({
	entityFilters = null,
	listId,
	perPage,
	searchText,
	setPerPage,
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
				{entityFilters}
				<PerPageControl listId={listId} perPage={perPage} setPerPage={setPerPage} />
				<SearchInput listId={listId} searchText={searchText} setSearchText={setSearchText} />
			</div>
		</animated.div>
	);
};

export default Collapsible;
