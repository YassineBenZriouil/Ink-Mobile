import React from 'react';
import { useGlobalStore } from '@/store/globalStore';

import Component from './containers';

interface ContainerProps {
    [key: string]: unknown;
}

const IdentificationContainer: React.FC<ContainerProps> = props => {
    const language = useGlobalStore(state => state.settings?.language);

    const ComponentAny = Component as any;

    return <ComponentAny language={language} {...props} />;
};

export default IdentificationContainer;
