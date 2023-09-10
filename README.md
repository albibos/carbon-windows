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
example = new Carbon({
  name: name, // name
  id: id, // element id
  type: type, // type, iframe or html (soon)
  url: url, // iframe url
  width: width, // width (duh)
  height: height, // height (duh)
  gameid: gameid, // game id from gamevault or 3kh0-assets (file name) || OPTIONAL
  server: server, // server (https://raw.githack.com/carbonsystems-dev/gamevault/main/, https://gitloaf.com/cdn/carbonsystems-dev/gamevault/main/) || OPTIONAL NOT NEEDED FOR GAMEID
});

example.show();
```

## Additional Functions
The example to create a window uses a global variable of "example", so you can use it anywhere.
Our current additional functions are:
```js
<global>.show();
<global>.hide();
<global>.fullscreen();
<global>.unfullscreen();
```
These will show/hide the window based on its current visiblity. Check the visibility by checking the opacity of the window.
