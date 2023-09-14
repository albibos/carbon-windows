# carbon-windows
a simple dark themed window system

## Setup
First, link our js (in your head tag):
```html
<script src="https://gitloaf.com/cdn/albibos/carbon-windows/main/window.min.js" defer></script>
```
*all needed css is linked into your document head via our js, there are no style classes that will affect your html but we do recommend checking over our css to ensure no problems arise. feel free to override our css but beware too many changes may make the window look odd.*

Then, you can create a  new window by doing:
```js
<global> = new Carbon({
  name: name, // name
  id: id, // element id
  type: type, // type: iframe or html
  url: url, // iframe url for iframe type
  html: html, // html code for html type
  width: width, // width (duh)
  height: height, // height (duh)
  gameid: gameid, // game id from gamevault or 3kh0-assets (file name) || OPTIONAL
  server: server, // server (https://raw.githack.com/carbonsystems-dev/gamevault/main/, https://gitloaf.com/cdn/carbonsystems-dev/gamevault/main/) || OPTIONAL NOT NEEDED FOR GAMEID
});

example.show();
```

## Functions
The global is what you named the carbon window.
Our current additional functions are:
```js
<global>.show(); // change opacity to 1
<global>.hide(); // change opacity to 0
<global>.fullscreen();
<global>.unfullscreen();
<global>.loadPlugin(js-file);
```

## Plugins API
These functions are partially limited to the api for plugins.
```js
<global>.api.show();
<global>.api.hide();
<global>.api.fullscreen();
<global>.api.unfullscreen();
<global>.api.addCustomCSS(css);
<global>.api.setTitle(title);
```
### How to create Plugins
To create a plugin, you must first load our functions, like so:
```js
const { addCustomCSS, show, close, fullscreen, setTitle } = window.parent.<global>.api;
```
Then you can enjoy our functions to their fullest! View our example plugin to see it in action, or go to our [showcase site](https://windows.albinus.gay).
