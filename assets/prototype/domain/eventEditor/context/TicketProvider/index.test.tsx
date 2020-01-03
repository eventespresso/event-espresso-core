/**
 * External dependencies
 */
import React, { useContext } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

/**
 * Internal dependencies
 */
import TicketProvider, { TicketContext } from './index';

describe('TicketProvider', () => {
	const ticketId = 'xyz';
	const wrapper = ({ children }) => <TicketProvider id={ticketId}>{children}</TicketProvider>;

	it('should have empty stack by default', () => {
		const { result } = renderHook(() => useContext(TicketContext), { wrapper });

		const currentlyOpenEditor = result.current.currentlyOpenEditor;
		const id = result.current.id;

		expect(id).toBe(ticketId);
		expect(currentlyOpenEditor).toBeUndefined();
	});

	describe('should stack multiple modal IDs', () => {
		let currentlyOpenEditor;
		const { result } = renderHook(() => useContext(TicketContext), { wrapper });

		const onClose = result.current.onClose;
		const setIsOpen = result.current.setIsOpen;

		describe('should add first modal ID', () => {
			const modalId = 'randomModalId';
			act(() => {
				setIsOpen(modalId);
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor;
			expect(currentlyOpenEditor).toBe(ticketId + modalId);
		});

		describe('should add second modal ID', () => {
			act(() => {
				setIsOpen('randomModalId2');
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor;
			expect(currentlyOpenEditor).toBe(ticketId + 'randomModalId2');
		});

		describe('should add third modal ID', () => {
			act(() => {
				setIsOpen('randomModalId3');
			});
			currentlyOpenEditor = result.current.currentlyOpenEditor;
			expect(currentlyOpenEditor).toBe(ticketId + 'randomModalId3');
		});

		describe('should not do anything if we try to close other than last opened modal', () => {
			act(() => {
				onClose('randomModalId2');
			});

			currentlyOpenEditor = result.current.currentlyOpenEditor;
			expect(currentlyOpenEditor).toBe(ticketId + 'randomModalId3');

			act(() => {
				onClose('randomModalId');
			});

			currentlyOpenEditor = result.current.currentlyOpenEditor;
			expect(currentlyOpenEditor).toBe(ticketId + 'randomModalId3');
		});

		describe('should allow closing last opened modal', () => {
			act(() => {
				onClose('randomModalId3');
			});

			currentlyOpenEditor = result.current.currentlyOpenEditor;
			expect(currentlyOpenEditor).toBe(ticketId + 'randomModalId2');

			act(() => {
				onClose('randomModalId2');
			});

			currentlyOpenEditor = result.current.currentlyOpenEditor;
			expect(currentlyOpenEditor).toBe(ticketId + 'randomModalId');
		});

		describe('when closing last modal', () => {
			act(() => {
				onClose('randomModalId');
			});

			it('should have empty stack', () => {
				currentlyOpenEditor = result.current.currentlyOpenEditor;

				console.log({ currentlyOpenEditor });

				expect(currentlyOpenEditor).toBeUndefined();
			});
		});
	});

	describe('when closeAllEditors is executed', () => {
		const { result } = renderHook(() => useContext(TicketContext), { wrapper });
		const closeAllEditors = result.current.closeAllEditors;
		const setIsOpen = result.current.setIsOpen;

		act(() => {
			setIsOpen('randomModalId11');
			setIsOpen('randomModalId22');
			setIsOpen('randomModalId33');
			setIsOpen('randomModalId44');

			closeAllEditors();
		});

		it('should have empty stack', () => {
			const currentlyOpenEditor = result.current.currentlyOpenEditor;
			expect(currentlyOpenEditor).toBeUndefined();
		});
	});
});
