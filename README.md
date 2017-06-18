# Using node.js libraries in React Native

A lot of node.js libraries expect `Buffer` and `process` to be available in the global namespace. That's why they don't work even if you have installed all the browserified node.js modules. This plugin injects them into the global namespace.

Example error messages for such kind of error would be like:
```
Can't find variable: Buffer
```
```
Undefined is not an object (evaluating 'process.version.slice')
```

## Get Started

1. Install browserified `buffer` and `process` modules, along with this plugin:
```
yarn add buffer process babel-plugin-react-native-nodeify-hack
```

2. Add this plugin into `plugins` list inside the `.babelrc` file under the project root, please refer to https://babeljs.io/docs/plugins/#plugin-preset-options for detailed instruction.
If you don't have `.babelrc` file in your project root, create one with the following content.
```
{
  "presets": ["react-native"],
  "plugins": ["babel-plugin-react-native-nodeify-hack"]
}
```

3. Import the `buffer` and `process` modules manually. In your `index.ios.js` and `index.android.js`, add this to the first line:
```
import process from 'process';
import buffer from 'buffer';
```

4. You are good to go!


If it is still not working after following the instructions, it may be caused by existing cache files preventing the React Native Packager from repackaging the entire codebase. In this case, you may try to stop the running React Native Packager, and run:
```
rm -rf $TMPDIR/react-*
```
and start it again with:
```
react-native start
```

## Contributing

This is just very simple hack, it may not work under some circumstances. You are welcome to contribute to this project if you found any bugs by sending me Pull Requests.