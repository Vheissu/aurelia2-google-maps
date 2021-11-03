import { DI, IContainer, IRegistry, isObject, noop } from '@aurelia/kernel';
import { IGoogleMapsConfiguration } from './configure';
import { GoogleMaps } from './google-maps';

const DefaultComponents: IRegistry[] = [
    GoogleMaps as unknown as IRegistry,
];

function createGoogleMapsConfiguration(optionsProvider) {
    return {
        optionsProvider,
        register(container: IContainer) {
            const configClass = container.get(IGoogleMapsConfiguration);
            const options = configClass.getOptions();

            optionsProvider(options);

            configClass.options(options);

            return container.register(...DefaultComponents)
        },
        customize(cb?: (options: IGoogleMapsConfiguration) => void) {
            return createGoogleMapsConfiguration(cb ?? optionsProvider);
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