import { useEffect } from 'react';

const useOnClickOutside = (ref, callback) => {
    const { current } = ref;
    useEffect(() => {
        const handleClick = (e) => {
            if (current && !current.contains(e.target)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [current, callback]);
};

export default useOnClickOutside;
