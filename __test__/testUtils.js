export const findJSXByAttr = (wrapper, name) => {
    return wrapper.find(`[data-test="${name}"]`);
};
