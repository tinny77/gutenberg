/**
 * WordPress dependencies
 */
import {
	FontSizePicker,
	__experimentalNumberControl as NumberControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getValueFromVariable, TOOLSPANEL_DROPDOWNMENU_PROPS } from './utils';
import { setImmutably } from '../../utils/object';

export function useHasBackgroundPanel( settings ) {
	return !! settings?.background?.backgroundImage;
}

export const BACKGROUNDPANEL_DROPDOWNMENU_PROPS = {
	popoverProps: {
		placement: 'left-start',
		offset: 259, // Inner sidebar width (248px) - button width (24px) - border (1px) + padding (16px) + spacing (20px)
	},
};

function BackgroundImageToolsPanelItem( { panelId, isShownByDefault, onChange } ) {

}

function BackgroundSizeToolsPanelItem( { panelId, isShownByDefault, onChange } ) {

}

function BackgroundToolsPanel( {
	resetAllFilter,
	onChange,
	value,
	panelId,
	children,
} ) {
	const resetAll = () => {
		const updatedValue = resetAllFilter( value );
		onChange( updatedValue );
	};

	return (
		<ToolsPanel
			label={ __( 'Background' ) }
			resetAll={ resetAll }
			panelId={ panelId }
			dropdownMenuProps={ TOOLSPANEL_DROPDOWNMENU_PROPS }
		>
			{ children }
		</ToolsPanel>
	);
}

const DEFAULT_CONTROLS = {
	backgroundImage: true,
	backgroundSize: true,
};

export default function BackgroundPanel( {
	as: Wrapper = BackgroundToolsPanel,
	value,
	onChange,
	inheritedValue = value,
	settings,
	panelId,
	defaultControls = DEFAULT_CONTROLS,
} ) {
	const hasBackGroundSizeControl = !! settings?.background?.backgroundSize;
	const resetAllFilter = useCallback( ( previousValue ) => {
		return {
			...previousValue,
			background: {},
		};
	}, [] );

	return (
		<Wrapper
			resetAllFilter={ resetAllFilter }
			value={ value }
			onChange={ onChange }
			panelId={ panelId }
		>
			<BackgroundImageToolsPanelItem
				onChange={ onChange }
				panelId={ panelId }
				isShownByDefault={ defaultControls.backgroundImage }
			/>
			{ hasBackGroundSizeControl && (
				<BackgroundSizeToolsPanelItem
					onChange={ onChange }
					panelId={ panelId }
					isShownByDefault={ defaultControls.backgroundSize }
				/>
			) }
		</Wrapper>
	);
}
