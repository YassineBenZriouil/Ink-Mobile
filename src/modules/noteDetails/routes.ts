import { RouteConfig } from '@/router/Routes';
import NoteDetails from './main';

const routes: RouteConfig[] = [
    {
        id: 'NoteDetails',
        name: 'NoteDetails',
        component: NoteDetails,
    },
];

export default routes;
