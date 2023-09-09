# carbon-windows
a simple dark themed window system

## Setup
First, link our js:
```html
https://gitloaf.com/cdn/albibos/carbon-windows/main/window.min.css
```

Then, you can create a  new window by doing:
```js
example = new Carbon({
  name: name, // name
  id: id, // element id
  type: type, // type, iframe or html (soon)
  url: url, // iframe url
  width: width, // width (duh)
  height: height, // height (duh)
});

example.show();
```
