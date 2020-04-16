import { render } from 'react-dom';

import canUseDOM from './canUseDOM';

interface Props {
	appendToTarget?: boolean;
	containerID?: string;
	containerClassName?: string;
	createContainer?: boolean;
	domElementToRender: JSX.Element;
	targetElementID?: string;
	useDocumentBody?: boolean;
}

/**
 * utility for rendering a DOM element
 *
 * @param appendToTarget whether to render element after the targeted DOM element (will prepend if false)
 * @param containerID HTML ID of the container we'll render the DOM element into
 * @param containerClassName HTML class(es) of the container we'll render the DOM element into
 * @param createContainer whether to create the container if it does not already exist
 * @param domElementToRender the DOM element to be rendered
 * @param targetElementID the DOM element we'll attach the render container to
 * @param useDocumentBody whether to use the document.body as the targeted DOM element
 */
const renderDomElement = ({
	appendToTarget = true,
	containerID,
	containerClassName,
	createContainer = true,
	domElementToRender,
	targetElementID,
	useDocumentBody = true,
}: Props): void => {
	// can't use the DOM if it doesn't exist! <taps forehead>
	if (!canUseDOM) {
		return;
	}

	// first let's try to find what we are going to attach our container to
	let targetElement: HTMLElement;
	targetElement = targetElementID ? document.getElementById(targetElementID) : null;
	// if element wasn't found but we can use the document.body
	if (targetElement === null && useDocumentBody && document.body !== null) {
		targetElement = document.body;
	}
	// can't use a DOM Element if it doesn't exist! <taps forehead>
	if (targetElement === null) {
		return;
	}

	// now let's see if the container already exists
	let container: HTMLElement;
	container = containerID ? document.getElementById(containerID) : null;
	// if not but we should create it
	if (container === null && createContainer) {
		container = document.createElement('div');
		container.id = containerID;
		if (containerClassName) {
			container.className = containerClassName;
		}
	}
	// can't do anything if nothing exists! <taps forehead>
	if (container === null) {
		return;
	}

	// now add container before or after targeted DOM element
	if (appendToTarget) {
		targetElement.append(container);
	} else {
		targetElement.prepend(container);
	}

	// and render our new DOM element into it
	render(domElementToRender, container);
};

export default renderDomElement;
