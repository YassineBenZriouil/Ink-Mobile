import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PreauthRoutes from '@/modules/preAuth/routes';
import HomeRoutes from '@/modules/home/routes';
import NoteDetailsRoutes from '@/modules/noteDetails/routes';
import SignUpRoutes from '@/modules/auth/signUp/routes';
import SignInRoutes from '@/modules/auth/signIn/routes';
import SettingsRoutes from '@/modules/settings/routes';

export type RootStackParamList = {
    PreAuth: undefined;
    Home: undefined;
    NoteDetails: undefined;
    SignUp: undefined;
    SignIn: undefined;
    Settings: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RouteConfig = {
    id: string;
    name: keyof RootStackParamList;
    component: React.ComponentType<any>;
    options?: object;
};

// Helper type for screen props
export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

const Routes: RouteConfig[] = [
    ...PreauthRoutes,
    ...HomeRoutes,
    ...NoteDetailsRoutes,
    ...SignUpRoutes,
    ...SignInRoutes,
    ...SettingsRoutes,
];

export default Routes;
