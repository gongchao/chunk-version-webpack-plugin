# chunk-version-webpack-plugin
webpack chunk hash Json

## 使用

```javascript
npm install chunk-version-webpack-plugin -D
```

在 webpack.config.js plugins 添加

```javascript
var chunkVersionWebpackPlugin = require('chunk-version-webpack-plugin');

module.exports = {
    ...config,
    plugins: [
        new chunkVersionWebpackPlugin({
            filename: 'version.json',
            includeDate: true,
        })
    ]
};
```

## 输出

```json
{
    "main": {
        "js": [
            "main.4c843659452f343d5ecc.js"
        ],
        "css": [
            "main.5d85b9b4.css"
        ],
        "date": "2018-01-28T04:38:14.438Z"
    },
}
```

## 配置



| config | default |
| --- | --- |
| filename | version.json |
| includeDate | true |


