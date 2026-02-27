import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PreauthRoutes from '@/modules/preAuth/routes';

export type RootStackParamList = {
    PreAuth: undefined;
    Home: undefined;
};

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
];

export default Routes;
