const { getDefaultConfig } = require('metro-config');
const defaultConfig = getDefaultConfig(__dirname);

module.exports = (async() => {
    const {
        resolver: { sourceExts, assetExts },
    } = await defaultConfig;

    return {
        resolver: {
            assetExts: [...assetExts, 'svg'],
            sourceExts: [...sourceExts, 'svg', 'tsx', 'ts'], // Bổ sung 'tsx' và 'ts' nếu bạn đang sử dụng TypeScript
        },
    };
})();