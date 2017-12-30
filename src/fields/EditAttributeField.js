/* global wp: false, _: false */

import React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import Select from 'react-select';

const { Component } = wp.element;

/**
 * The most basic attribute field for a shortcode.
 *
 * Renders a text input, with the label and description if defined, for a
 * string attribute value.
 */
class EditAttributeField extends Component {

	/**
	 * Object of additional attributes which are set on the input field.
	 *
	 */
	addlAttrs = {};

	/**
	 * Render an input element for an attribute value field.
	 */
	render() {
		const { attribute, value, updateValue } = this.props;
		const { attr, label, description } = attribute;

		return (
			<section className='shortcode-ui-block-inspector-form-item'>
				<label className='shortcode-ui-block-inspector-form-item-label'>{ label }</label>
				<input className='shortcode-ui-block-inspector-form-item-input'
					{ ...this.addlAttrs }
					name={ attr }
					value={ value }
					onChange={ e => updateValue( e.target.value ) }
					/>
				{ description && description.length && (
					<span className='shortcode-ui-block-inspector-form-item-description'>{ description }</span>
				) }
			</section>
		);
	};
}

export default EditAttributeField;

export class TextField extends EditAttributeField {
	static attrType = 'text';
	addlAttrs = { type: 'text' };
};

export class UrlField extends EditAttributeField {
	static attrType = 'url';
	addlAttrs = { type: 'url' };
};

export class EmailField extends EditAttributeField {
	static attrType = 'email';
	addlAttrs = { type: 'email' };
};

export class NumberField extends EditAttributeField {
	static attrType = 'number';
	addlAttrs = { type: 'number' };
};

export class DateField extends EditAttributeField {
	static attrType = 'date';
	addlAttrs = { type: 'date' };
};

export class ColorField extends EditAttributeField {
	static attrType = 'color';
	addlAttrs = { type: 'color' };
};

export class TextArea extends EditAttributeField {
	static attrType = 'textarea';

	render() {
		const { attribute, shortcode, value, updateValue } = this.props;
		const { attr, label, description } = attribute;
		const { shortcode_tag } = shortcode;

		return (
			<section key={ `shortcode-${shortcode_tag}-${attr}` } className='shortcode-ui-block-inspector-form-item'>
				<label className='shortcode-ui-block-inspector-form-item-label'>{ label }</label>
				<TextareaAutosize className='shortcode-ui-block-inspector-form-item-input'
					type='text'
					name={ attr }
					value={ value }
					onChange={ e => updateValue( e.target.value ) }
					/>
				{ description && description.length && (
					<span className='shortcode-ui-block-inspector-form-item-description'>{ description }</span>
				) }
			</section>
		);
	};
}

export class SelectField extends EditAttributeField {
	static attrType = 'select';

	render() {
		const { attribute, shortcode, value, updateValue } = this.props;
		const { attr, label, description, options, meta = {} } = attribute;
		const { multiple = false } = meta;
		const { shortcode_tag } = shortcode;

		return (
			<section key={ `shortcode-${shortcode_tag}-${attr}` } className='shortcode-ui-block-inspector-form-item'>
				<label className='shortcode-ui-block-inspector-form-item-label'>{ label }</label>
				<select
					name={ attr }
					value={ value }
					onChange={ ( { target: { value: newValue } } ) => updateValue( newValue ) } >
					{ options.map(
						option => {
							if ( 'options' in option ) {
								return (
									<optgroup label={ option.label } key={ option.label } >
									{ option.options.map(
										option => (
											<option key={ option.value } value={ option.value } >{ option.label }</option>
										)
									) }
									</optgroup>
								);
							} else {
								return (
									<option key={ option.value } value={ option.value } >{ option.label }</option>
								)
							}
						} )
					}
				</select>
				{ description && description.length && (
					<span className='shortcode-ui-block-inspector-form-item-description'>{ description }</span>
				) }
			</section>
		);
	};
}

export class CheckboxField extends EditAttributeField {
	static attrType = 'checkbox';

	render() {
		const { attribute, shortcode, value, updateValue } = this.props;
		const { attr, label, description, options, meta = {} } = attribute;
		const { multiple = false } = meta;
		const { shortcode_tag } = shortcode;

		const toggleChecked = () => updateValue( ! value );

		return (
			<section key={ `shortcode-${shortcode_tag}-${attr}` } className='shortcode-ui-block-inspector-form-item'>
				<label className='shortcode-ui-block-inspector-form-item-label' >
					<input type="checkbox" name={ attr } checked={ !! value } onChange={ toggleChecked } />
					{ label }
				</label>
				{ description && description.length && (
					<span className='shortcode-ui-block-inspector-form-item-description'>{ description }</span>
				) }
			</section>
		);

	}
}

export class RadioField extends EditAttributeField {
	static attrType = 'radio';

	render() {
		const { attribute, shortcode, value, updateValue } = this.props;
		const { attr, label, description, options, meta = {} } = attribute;
		const { multiple = false } = meta;
		const { shortcode_tag } = shortcode;

		const updateSelection = (e) => {
			console.log( e );
			updateValue( e.target.value );
		}

		return (
			<section key={ `shortcode-${shortcode_tag}-${attr}` } className="shortcode-ui-block-inspector-form-item">
				<label>{ label }</label>
				{ options.map(
					option => (
						<label>
							<input type="radio" name={ attr } value={ option.value } checked={ option.value == value } onClick={ () => updateValue( option.value ) } />
							{ option.label }
						</label>
					)
				) }
				{ description && description.length && (
					<span className='shortcode-ui-block-inspector-form-item-description'>{ description }</span>
				) }
			</section>
		);

	}
}
