import React, { useEffect, useRef } from 'react';

import { useKeephub } from 'keephub-plugin-bridge';

const Page = ({ children, style, ...rest_props }) => {
    const  { bridge } = useKeephub();
    const container = useRef(null);
    const height = useRef(0);

    useEffect(() => {
        
        const updateHeight = () => {
            if (container.current.offsetHeight !== height.current) {
                height.current = container.current.offsetHeight;
                bridge.setIframeHeight(height.current);
            }
        }

        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        }

    }, [ bridge ]);

    const page_style = {
        paddingTop: 20,
        ...style
    }

    return (
        <div ref={container} style={page_style} {...rest_props}>
            { children }
        </div>
    );
}

export default Page;