const link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";

document.head.appendChild(link);

const link2 = document.createElement("link");
link2.rel = "preconnect";
link2.href = "https://fonts.googleapis.com";

document.head.appendChild(link2);

const link3 = document.createElement("link");
link3.rel = "preconnect";
link3.href = "https://fonts.gstatic.com";

document.head.appendChild(link3);

const link4 = document.createElement("link");
link4.rel = "stylesheet";
link4.href =
  "https://fonts.googleapis.com/css2?family=Cabin:wght@500";

document.head.appendChild(link4);

const link5 = document.createElement("link");
link5.rel = "stylesheet";
link5.type = "text/css";
link5.href =
  "https://gitloaf.com/cdn/albibos/carbon-windows/main/window.min.css";
document.head.appendChild(link5);

class Carbon {
  constructor(options) {
    this.name = options.name;
    this.id = options.id;
    this.type = options.type;
    this.url = options.url;
    this.html = options.html;
    this.width = options.width + "px";
    this.height = options.height + "px";
    this.parent = options.parent || null;
    this.gameid = options.gameid || null;
    this.server =
      options.server ||
      "https://raw.githack.com/carbonsystems-dev/gamevault/main/";

    this.createWindow();
    this.addEventListeners();
    this.api = {
      addCustomCSS: this.addCustomCSS.bind(this),
      show: this.show.bind(this),
      close: this.close.bind(this),
      fullscreen: this.fullscreen.bind(this),
      setTitle: this.setTitle.bind(this),
    };
  }

  createWindow() {
    this.windowElement = document.createElement("div");
    this.windowElement.className = "window";
    this.windowElement.style.width = this.width;
    this.windowElement.style.height = this.height;
    this.windowElement.id = this.id;

    const titleBar = document.createElement("div");
    titleBar.className = "title-bar";

    const title = document.createElement("div");
    title.className = "title";
    title.innerText = this.name;

    const buttons = document.createElement("div");
    buttons.className = "buttons";
    buttons.innerHTML = `
      <i class="fa-regular fa-window-minimize"></i>
      <i class="fa-regular fa-window-maximize"></i>
      <i class="fa-solid fa-xmark"></i>
    `;

    const content = document.createElement("div");
    content.className = "content";

    titleBar.appendChild(title);
    titleBar.appendChild(buttons);
    this.windowElement.appendChild(titleBar);
    this.windowElement.appendChild(content);

    if (this.parent) {
      document.getElementById(this.parent).appendChild(this.windowElement);
    } else {
      document.body.appendChild(this.windowElement);
      this.centerWindow();
    }

    if (this.type === "html") {
      const iframe = document.createElement("iframe");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.srcdoc = this.html;
      content.appendChild(iframe);
    } else if (this.type === "iframe") {
      if (this.gameid) {
        const iframe = document.createElement("iframe");
        iframe.src = this.server + this.gameid + "/index.html";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        content.appendChild(iframe);
      } else {
        const iframe = document.createElement("iframe");
        iframe.src = this.url;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        content.appendChild(iframe);
      }
    }
  }

  centerWindow() {
    this.windowElement.style.position = "fixed";
    this.windowElement.style.left = "50%";
    this.windowElement.style.top = "50%";
    this.windowElement.style.transform = "translate(-50%, -50%)";
  }

  addEventListeners() {
    const titleBar = this.windowElement.querySelector(".title-bar");
    const minimizeButton = this.windowElement.querySelector(
      ".fa-window-minimize"
    );
    const maximizeButton = this.windowElement.querySelector(
      ".fa-window-maximize"
    );
    const closeButton = this.windowElement.querySelector(".fa-xmark");
    const content = this.windowElement.querySelector(".content");

    let isMaximized = false;

    titleBar.addEventListener("mousedown", (e) => {
      if (!isMaximized) {
        this.dragStart(e);
      }
    });

    minimizeButton.addEventListener("click", () => {
      this.hide();
    });

    maximizeButton.addEventListener("click", () => {
      if (isMaximized) {
        this.windowElement.style.width = this.width;
        this.windowElement.style.height = this.height;
        this.windowElement.classList.remove("fullscreen");
        titleBar.style.cursor = "grab";
        isMaximized = false;
      } else {
        const currentLeft = this.windowElement.style.left;
        const currentTop = this.windowElement.style.top;

        this.windowElement.style.width = "100%";
        this.windowElement.style.height = "100%";
        this.windowElement.classList.add("fullscreen");
        titleBar.style.cursor = "auto";
        isMaximized = true;

        this.windowElement.style.left = "50%";
        this.windowElement.style.top = "50%";
        this.windowElement.style.transform = "translate(-50%, -50%)";
        this.windowElement.dataset.originalLeft = currentLeft;
        this.windowElement.dataset.originalTop = currentTop;
      }
    });

    const resizeHandles = [
      {
        className: "resize-handle top",
        cursor: "ns-resize",
        direction: "top",
        id: "resizeHandleTop",
      },
      {
        className: "resize-handle bottom",
        cursor: "ns-resize",
        direction: "bottom",
        id: "resizeHandleBottom",
      },
      {
        className: "resize-handle left",
        cursor: "ew-resize",
        direction: "left",
        id: "resizeHandleLeft",
      },
      {
        className: "resize-handle right",
        cursor: "ew-resize",
        direction: "right",
        id: "resizeHandleRight",
      },
      {
        className: "resize-handle top-left",
        cursor: "nwse-resize",
        direction: "top-left",
        id: "resizeHandleTopLeft",
      },
      {
        className: "resize-handle top-right",
        cursor: "nesw-resize",
        direction: "top-right",
        id: "resizeHandleTopRight",
      },
      {
        className: "resize-handle bottom-left",
        cursor: "nesw-resize",
        direction: "bottom-left",
        id: "resizeHandleBottomLeft",
      },
      {
        className: "resize-handle bottom-right",
        cursor: "nwse-resize",
        direction: "bottom-right",
        id: "resizeHandleBottomRight",
      },
    ];

    closeButton.addEventListener("click", () => {
      this.close();
    });

    resizeHandles.forEach((handle) => {
      const resizeHandle = document.createElement("div");
      resizeHandle.className = handle.className;
      resizeHandle.style.cursor = handle.cursor;
      resizeHandle.id = handle.id;
      this.windowElement.appendChild(resizeHandle);

      resizeHandle.addEventListener("mousedown", (e) => {
        if (!isMaximized) {
          this.resizeStart(e, handle.direction);
        }
      });
    });

    const resizeHandleBottom = document.getElementById("resizeHandleBottom");
    const resizeHandleLeft = document.getElementById("resizeHandleLeft");
    const resizeHandleRight = document.getElementById("resizeHandleRight");
    const resizeHandleTop = document.getElementById("resizeHandleTop");
    const resizeHandleTopLeft = document.getElementById("resizeHandleTopLeft");
    const resizeHandleTopRight = document.getElementById(
      "resizeHandleTopRight"
    );
    const resizeHandleBottomLeft = document.getElementById(
      "resizeHandleBottomLeft"
    );
    const resizeHandleBottomRight = document.getElementById(
      "resizeHandleBottomRight"
    );

    resizeHandleBottom.addEventListener("mousedown", (e) => {
      if (!isMaximized) {
        this.resizeStart(e, "bottom");
      }
    });

    resizeHandleLeft.addEventListener("mousedown", (e) => {
      if (!isMaximized) {
        this.resizeStart(e, "left");
      }
    });

    resizeHandleRight.addEventListener("mousedown", (e) => {
      if (!isMaximized) {
        this.resizeStart(e, "right");
      }
    });

    resizeHandleTop.addEventListener("mousedown", (e) => {
      if (!isMaximized) {
        this.resizeStart(e, "top");
      }
    });

    resizeHandleTopLeft.addEventListener("mousedown", (e) => {
      if (!isMaximized) {
        this.resizeStart(e, "top-left");
      }
    });

    resizeHandleTopRight.addEventListener("mousedown", (e) => {
      if (!isMaximized) {
        this.resizeStart(e, "top-right");
      }
    });

    resizeHandleBottomLeft.addEventListener("mousedown", (e) => {
      if (!isMaximized) {
        this.resizeStart(e, "bottom-left");
      }
    });

    resizeHandleBottomRight.addEventListener("mousedown", (e) => {
      if (!isMaximized) {
        this.resizeStart(e, "bottom-right");
      }
    });
  }

  close() {
    this.windowElement.remove();
  }

  show() {
    this.windowElement.style.opacity = "1";
    this.windowElement.style.pointerEvents = "auto";
  }

  hide() {
    this.windowElement.style.opacity = "0";
    this.windowElement.style.pointerEvents = "none";
  }

  fullscreen() {
    const currentLeft = this.windowElement.style.left;
    const currentTop = this.windowElement.style.top;

    this.windowElement.style.width = "100%";
    this.windowElement.style.height = "100%";
    this.windowElement.classList.add("fullscreen");
    titleBar.style.cursor = "auto";
    isMaximized = true;

    this.windowElement.style.left = "50%";
    this.windowElement.style.top = "50%";
    this.windowElement.style.transform = "translate(-50%, -50%)";
    this.windowElement.dataset.originalLeft = currentLeft;
    this.windowElement.dataset.originalTop = currentTop;
  }

  unfullscreen() {
    this.windowElement.style.width = this.width;
    this.windowElement.style.height = this.height;
    this.windowElement.classList.remove("fullscreen");
    titleBar.style.cursor = "grab";
    isMaximized = false;
  }

  setTitle(newTitle) {
    const titleElement = this.windowElement.querySelector(".title");
    if (titleElement) {
      titleElement.innerText = newTitle;
    }
  }

  dragStart(e) {
    const startX = e.clientX;
    const startY = e.clientY;

    const windowX = this.windowElement.offsetLeft;
    const windowY = this.windowElement.offsetTop;

    const onDrag = (e) => {
      const offsetX = e.clientX - startX;
      const offsetY = e.clientY - startY;

      this.windowElement.style.left = windowX + offsetX + "px";

      if (offsetY > 0) {
        this.windowElement.style.top = windowY + offsetY + "px";
      } else {
        this.windowElement.style.top = windowY + offsetY + "px";
      }
    };

    const onDragEnd = () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", onDragEnd);
      this.windowElement.style.cursor = "grab";
    };

    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", onDragEnd);
    this.windowElement.style.cursor = "grabbing";
  }

  resizeStart(e, direction) {
    const startX = e.clientX;
    const startY = e.clientY;

    const windowWidth = this.windowElement.offsetWidth;
    const windowHeight = this.windowElement.offsetHeight;

    const onResize = (e) => {
      const offsetX = e.clientX - startX;
      const offsetY = e.clientY - startY;

      let newWidth = windowWidth;
      let newHeight = windowHeight;

      if (direction.includes("right")) {
        newWidth = windowWidth + offsetX;
      } else if (direction.includes("left")) {
        newWidth = windowWidth - offsetX;
      }

      if (direction.includes("bottom")) {
        newHeight = windowHeight + offsetY;
      } else if (direction.includes("top")) {
        newHeight = windowHeight - offsetY;
      }

      newWidth = Math.max(newWidth, 100);
      newHeight = Math.max(newHeight, 100);

      this.windowElement.style.width = newWidth + "px";
      this.windowElement.style.height = newHeight + "px";
    };

    const onResizeEnd = () => {
      window.removeEventListener("mousemove", onResize);
      window.removeEventListener("mouseup", onResizeEnd);
    };

    window.addEventListener("mousemove", onResize);
    window.addEventListener("mouseup", onResizeEnd);
  }

  addCustomCSS(css) {
    const styleElement = document.createElement("style");
    styleElement.type = "text/css";
    styleElement.appendChild(document.createTextNode(css));
    this.windowElement.querySelector(".content").appendChild(styleElement);
  }

  loadPlugin(scriptSrc) {
    const script = document.createElement("script");
    script.src = scriptSrc;

    script.onload = () => {
      console.log(`Plugin loaded: ${scriptSrc}`);
    };

    script.onerror = () => {
      console.error(`Failed to load plugin: ${scriptSrc}`);
    };

    document.head.appendChild(script);
  }
}
