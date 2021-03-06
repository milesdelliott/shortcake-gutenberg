/* global wp: false */

import mapItemImage from './utils/mapItemImage';

import EditBlock from './EditBlock';

const { registerBlockType } = wp.blocks;
const { RawHTML } = wp.element;

/**
 * Register a Gutenberg block for a shortcode with UI.
 *
 * @param {Object} Shortcode UI as registered with Shortcake
 */
const registerShortcodeBlock = function( shortcode ) {

	const { shortcode_tag, attrs, listItemImage, label } = shortcode;

	const sanitizedBlockName = shortcode_tag.toLowerCase().replace( /[^a-z0-9-]+/g, '-' );

	registerBlockType( `shortcake/${sanitizedBlockName}`,
		{
			title: label,

			icon: mapItemImage( listItemImage ),

			category: 'widgets', // todo: register new "Post Element" category

			attributes: attrs.reduce(
				( memo, item ) => {

					// TODO: enable different types depending on attribute type
					memo[ item.attr ] = {
						type: 'string',
						default: '',
					};

					return memo;
				 }, {}
			),

			supports: {
				className:        false,
				customClassName:  false,
				html:             false,
			},

			edit: EditBlock.bind( null, shortcode ),

			save( { attributes } ) {
				return RawHTML( { children: [ wp.shortcode.string( { tag: shortcode_tag, attrs: attributes } ) ] } );
			}
		}
	);
};

export default registerShortcodeBlock;
