/** 
 * This is a hook that disables page scrolling by setting `document.body.style.overflow = 'hidden'`
 * when a component is active, and restores it back to 'auto' when the component is inactive.
 * 
 * Usage: Call `useLockBodyScroll()` inside any component where you want to prevent the user
 * from scrolling the page while that component is active
 * 
 * This is not in a traditional CSS file because if you apply `overflow: hidden` to the body 
 * within a CSS file, it will apply globally to the rest of the components and pages in the 
 * project. Using a hook allows scroll locking to be scoped to specific components dynamically.
 * 
*/

import { useEffect } from "react";

const LockBodyScroll = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return() => {
            document.body.style.overflow = "auto";
        };
    }, []);
};

export default LockBodyScroll;