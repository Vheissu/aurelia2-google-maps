import { DI, IContainer, IRegistry, isObject, noop } from '@aurelia/kernel';
import { IGoogleMapsConfiguration } from 'configure';
import { GoogleMaps } from './google-maps';

const DefaultComponents: IRegistry[] = [
    GoogleMaps as unknown as IRegistry,
];

function configure(container: IContainer, config?): IContainer {
    const hasConfigInstance = container.has(IGoogleMapsConfiguration, true);

    if (!hasConfigInstance) {
        container.register(IGoogleMapsConfiguration);
    }

    const innerConfig = container.get(IGoogleMapsConfiguration);
    const defaultOptions = innerConfig.getOptions();

    return config(defaultOptions);

    return container.register(
        ...DefaultComponents
    );
}

function createGoogleMapsConfiguration(callback) {
    return {
        callback,
        register(container: IContainer) {
            const configClass = container.get(IGoogleMapsConfiguration);
            const options = configClass.getOptions();

            callback(options);

            configClass.options(options);

            return container.register(...DefaultComponents)
        },
        customize(cb?: (options: IGoogleMapsConfiguration) => void) {
            return createGoogleMapsConfiguration(cb ?? callback);
        }
    };
}

export const GoogleMapsConfiguration = createGoogleMapsConfiguration(noop);

// export const GoogleMapsConfiguration = {
//     register(container: IContainer): IContainer {
//         return configure(container);
//     },

//     customize(config?): IRegistry {
//         return {
//             register(container: IContainer): IContainer {
//                 return configure(container, config);
//             }
//         }
//     }
// };