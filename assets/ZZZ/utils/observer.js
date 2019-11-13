/**
 * Observer
 * dead simple implementation of the observer pattern
 *
 * @param {Object} entityFilters additional entity specific filters
 * @param {number} perPage
 * @param {string} view
 * @param {Function} setPerPage callback for perPage input
 * @param {Function} setListView callback for list view icon button
 * @param {Function} setGridView callback for grid view icon button
 * @return {Object} EntityListFilterBar
 */
class Observer {
	/**
	 * @var {Array} observers
	 */
	observers = [];

	/**
	 * throws a TypeError if supplied observer is not a callback
	 *
	 * @param {Function} observer
	 * @throws {TypeError}
	 */
	static validateObserver( observer ) {
		if ( typeof observer !== 'function' ) {
			throw new TypeError(
				`observer must be a function, not: ${ observer }`
			);
		}
	}

	/**
	 * adds observer to internal array
	 *
	 * @param {Function} observer
	 * @throws {TypeError}
	 */
	subscribe( observer ) {
		Observer.validateObserver( observer );
		if ( this.observers.indexOf( observer ) === -1 ) {
			this.observers.push( observer );
		}
	}

	/**
	 * removes observer from internal array
	 *
	 * @param {Function} observer
	 * @throws {TypeError}
	 */
	unsubscribe( observer ) {
		Observer.validateObserver( observer );
		const index = this.observers.indexOf( observer );
		if ( index > -1 ) {
			this.observers.splice( index, 1 );
		}
	}

	/**
	 * calls each observer callback and applies any assigned arguments
	 */
	notify() {
		this.observers.forEach( ( observer ) => {
			observer.apply( null, arguments );
		} );
	}
}

export default Observer;
