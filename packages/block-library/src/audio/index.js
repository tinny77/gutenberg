/**
 * WordPress dependencies
 */
import { audio as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import lazyLoad from '../utils/lazy-load';
import initBlock from '../utils/init-block';
import deprecated from './deprecated';

import metadata from './block.json';
import save from './save';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon,
	example: {
		attributes: {
			src: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Armstrong_Small_Step.ogg',
		},
		viewportWidth: 350,
	},
	transforms,
	deprecated,
	edit: lazyLoad( () =>
		import( /* webpackChunkName: "audio/editor" */ './edit' )
	),
	save,
};

export const init = () => initBlock( { name, metadata, settings } );
