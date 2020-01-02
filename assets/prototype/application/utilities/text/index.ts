/**
 * External dependencies
 */
import { is } from 'ramda';

export const lcFirst = (str: string): string => is(String, str) && str.charAt(0).toLowerCase() + str.substring(1);

export const ucFirst = (str: string): string => is(String, str) && str.charAt(0).toUpperCase() + str.substring(1);
