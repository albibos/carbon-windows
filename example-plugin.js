const { addCustomCSS, show, close, fullscreen, setTitle } = window.parent.showWindow.api;

const newCSS = `
        .title-bar {
          background-color: white;
        }

        .title {
          color: black;
        }

        .content {
          color: #787878;
        }

        .fa-window-minimize {
          color: black;
        }

        .fa-window-maximize {
          color: black;
        }

        .fa-xmark {
          color: black;
        }
`;

addCustomCSS(newCSS);
setTitle("Light Theme Plugin");
