export const createRef = () => {
    const saveRef = node => {
        saveRef.current = node;
    };

    return saveRef;
};
