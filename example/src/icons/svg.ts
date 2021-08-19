const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
requireAll(req);

/**
 * 获得svg下所有文件名
 * .substr(5)——去掉前缀 icon-
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const svgNames = requireAll(req).map((svgModule: any) => svgModule.default.id.substr(5));
const t = '';
export { svgNames, t };
