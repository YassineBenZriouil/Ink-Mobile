import {
    CommonActions,
    createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: object) {
    if (navigationRef.isReady()) {
        // The following ts-ignore is necessary because the navigate function's type
        // is not correctly inferred in this context.
        // @ts-ignore
        navigationRef.navigate(name, params);
    }
}

export function resetRoot(name: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name, params }],
            }),
        );
    }
}

export function goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
    }
}

export function getCurrentScreen(): string | null {
    if (navigationRef.isReady()) {
        return navigationRef.getCurrentRoute()?.name ?? null;
    }
    return null;
}
