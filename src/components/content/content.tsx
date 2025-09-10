import { Outlet } from 'react-router-dom';
import { AppSettings } from '../../config/app-settings';

type AppSettingsContextType = {
	appContentClass: string;
	// add other context properties if needed
};

function Content() {
	return (
		<AppSettings.Consumer>
			{(value) => {
				const { appContentClass } = value as AppSettingsContextType;
				return (
					<div className={'app-content px-3 ' + appContentClass}>
						<Outlet />
					</div>
				);
			}}
		</AppSettings.Consumer>
	)
}

export default Content;
