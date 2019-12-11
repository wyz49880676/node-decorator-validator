export const getParameterName = (fn) => {
    if (typeof fn !== 'function') {
        return;
    }
    const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    const DEFAULT_PARAMS = /=[^,)]+/mg;
    const FAT_ARROWS = /=>.*$/mg;
    let code = fn.toString()
        .replace(COMMENTS, '')
        .replace(FAT_ARROWS, '')
        .replace(DEFAULT_PARAMS, '');
    let result = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g);
    return result === null ? [] : result;
}

declare global {
    interface String {
        replaceAll(match: string, replace: string): string;
    }
}
String.prototype.replaceAll = function (match, replace) {
    return this.replace(
        new RegExp(match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), replace);
}