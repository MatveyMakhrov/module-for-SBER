import React, { useEffect, useRef } from 'react';
import { useSection } from '@salutejs/spatial';

const Page = () => {
    const [sectionProps] = useSection('buttons');
    const ref = useRef(null);

    useEffect(() => {
        const focusable = ref.current;
        if (focusable) {
            focusable.focus();
        }
    }, []);

    return (
        <div {...sectionProps}>
            <div ref={ref} className="LoseButton" tabIndex={-1}>
                Навигация работает (после выполнения useEffect, фокус будет установлен на этот элемент)
            </div>
            <div className="input-text" tabIndex={-1}>
                Навигация работает
            </div>
            <div>Навигация НЕ работает</div>
        </div>
    );
};

export default Page;