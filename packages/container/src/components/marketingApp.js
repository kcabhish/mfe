import React, {useRef, useEffect} from 'react';
import { mount } from 'marketing/MarketingApp';
import { useHistory } from 'react-router-dom';

/**
 * This component creates a ref for its element and passes it on mount to load the markting app.
 * @returns 
 */
const MarketingApp = () => {
    const ref = useRef(null);
    /**
     * This is the copy of the browser history. Since we are using memory router in the sub-apps,
     * we need to sync the information back the the browser history.
     */
    const history = useHistory();

    useEffect(() => {
        const {onParentNavigate} = mount(ref.current, {
            onNavigate: ({pathname: nextPathname}) => {
                // prevent navigation if current pathname and next pathname are same
                const pathname = history.location;
                if (pathname !== nextPathname) {
                    history.push(nextPathname);
                }
                
            }
        });
        history.listen(onParentNavigate);
    },[]);
    return <div ref={ref} />;
};

export {MarketingApp};
