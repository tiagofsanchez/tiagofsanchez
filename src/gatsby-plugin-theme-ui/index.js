import prism from "@theme-ui/prism/presets/night-owl.json";

const theme = {
  useLocalStorage: false,
  breakpoints: ["740px", "1200px", "1400px"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  colors: {
    text: "#cbd5e0",
    background: "#1A202C",
    bg2: "rgba(194, 36, 93 , 0.4)",
    togglebg: "#eeeeee",
    hover: "#15181f",
    primary: "White",
    secondary: "black",
    link: "#d23669",
    linkbg: "#eeeeee",
    highlight: "#d23669",
    modes: {
      light: {
        text: "#2d3748",
        background: "#eeeeee",
        bg2: "rgba(194, 36, 93 , 0.4)",
        togglebg: "#1A202C",
        hover: "#d4d4d4",
        primary: "black",
        secondary: "white",
        link: "#d23669",
        linkbg: "#1A202C",
        highlight: "#d23669",
      },
    },
  },
  fonts: {
    body:
      'IBM Plex Sans, Lato, Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",  "Helvetica Neue", sans-serif',
    heading: "IBM Plex Sans, Montserrat",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 900,
  },
  letterSpacings: {
    body: "normal",
    caps: "0.2em",
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      code: {
        ...prism,
        fontSize: 18,
        fontFamily: "body",
        px: 2,
      },
      pre: {
        fontSize: 16,
        lineHeight: 1.5,
        overflow: `auto`,
        whiteSpace: "pre-wrap",
        wordBreak:`break-word`,
        p: 3,
        my: 4,
        borderRadius: `0px 0px 4px 4px`,
      },
      h1: {
        fontSize: [35,44],
        fontFamily: "heading",
        fontWeight: "bold",
        color: "primary",
        my: 4,
        "&::selection": { 
          bg: `highlight`
        }
      },
      h2: {
        fontSize: [27,30],
        fontFamily: "heading",
        fontWeight: "bold",
        color: "primary",
        my: 3,
        "&::selection": { 
          bg: `highlight`
        }
      },
      h3: {
        fontSize: [20, 26],
        fontFamily: "heading",
        lineHeight: 1.7,
        fontWeight: "bold",
        color: "primary",
        my: 3,
        "&::selection": { 
          bg: `highlight`
        }
      },
      h4: {
        fontSize: 22,
        fontFamily: "heading",
        lineHeight: 1.7,
        fontWeight: "bold",
        color: "primary",
        my: 3,
        "&::selection": { 
          bg: `highlight`
        }
      },
      h5: {
        fontSize: 20,
        fontFamily: "heading",
        lineHeight: 1.7,
        fontWeight: "bold",
        color: "primary",
        my: 3,
        "&::selection": { 
          bg: `highlight`
        }
      },
      hr: {
        borderColor: `hover`,
        height: `0.5px`,
      },
      p: {
        fontSize: 20,
        fontFamily: "body",
        lineHeight: 1.7,
        "&::selection": { 
          bg: `highlight`
        }
      },
      ul: {
        my: 2,
        "&::selection": { 
          bg: `highlight`
        }
      },
      ol: {
        my: 2,
        "&::selection": { 
          bg: `highlight`
        }
      },
      li: {
        fontSize: 20,
        fontFamily: "body",
        lineHeight: 1.7,
        "&::selection": { 
          bg: `highlight`
        }
      },
      a: {
        color: `link`,
        textDecoration: "none",
        borderBottom: "2px dashed",
        "&:hover": {
          color: `link`,
          borderBottom: `solid`,
        },
        "&::selection": { 
          bg: `highlight`
        }
      },
      blockquote: {
        borderLeftColor: `highlight`,
        borderLeftStyle: `solid`,
        borderLeftWidth: `4px`,
        pl: 3,
        ml: 0,
        p: {
          fontStyle: `italic`,
        },
        "&::selection": { 
          bg: `highlight`
        }
      },
      table: {
        width: `100%`,
        my: 4,
        overflow: `auto`,
        borderCollapse: `separate`,
        borderSpacing: 0,
        [[`th`, `td`]]: {
          textAlign: `left`,
          py: `8px`,
          pr: `4px`,
          pl: 0,
          borderColor: `muted`,
          border: `1px`,
          borderBottomStyle: `solid`,
        },
      },
      img: {
        maxWidth: "100%",
        textAlign: `center`,
        display: `block`,
    
      },
    },
  },
  links: {
    primary: {
      fontSize: 30,
      fontFamily: "heading",
      fontWeight: "bold",
      color: "highlight",
      my: 4,
      borderBottom: "none",
      "&:hover": {
        borderBottom: "none",
      },
    },
    secondary: {
      borderBottom: "none",
      "&:hover": {
        borderBottom: "none",
      },
    },
    edit: { 
      borderBottom: `none`, 
      fontSize: 15,
      "&:hover": {
        borderBottom: "none",
      },
    }
  },
  layout: {
    header: {
      width: [`90%`, `90%`, `1100px`],
      margin: `0 auto`,
    },
    main: {
      width: `90%`,
      margin: `0 auto`,
    },
    blogHeader: {
      width: [`100%`, `100%`, `1100px`],
      margin: `0 auto`,
    },
    container: {
      width: [`100%`, `90%`, `800px`],
      margin: `0 auto`,
    },
    footer: {
      width: [`100%`, `80%`, `70%`],
      margin: `auto`,
      bottom: `0`,
    },
  },
  cards: {
    alternative: {
      display: `grid`,
      color: `primary`,
      borderRadius: `4px`,
      bg: `hover`,
      p: `20px`,
      maxWidth: [`auto`, `320px`, `320px`],
      height: [`auto`, `220px`, `220px`],
      fontWeight: `body`,
      "&:hover": {
        boxShadow: `2px 2px #d23669`,
      },
    },
    category: {
      bg: `highlight`,
      m: `10px 5px`,
      display: `inline-block`,
      p: `15px`,
      borderRadius: `4px`,
    },
    ctg2: { 
      fontSize: 2,
      p: `2px 5px`,
      border: `2px solid`,
      borderRadius: `4px`,
    },
    tag: {
      fontSize: 2,
      p: `2px 5px`,
      borderRadius: `4px`,
      m: `10px 5px`,
      border: `2px solid`,
      borderColor: "highlight",
    },
  },
  badges: {
    number: {
      bg: `highlight`,
      color: `white`,
      p: `6px`,
    },
  },
  forms: {
    label: {
      fontSize: 2,
      fontWeight: "bold",
    },
    input: {
      fontSize: 3,
      borderColor: "gray",
      padding: `10px`,
      mb: `3`,
      "&:focus": {
        borderColor: "highlight",
        boxShadow: (t) => `0 0 0 3px ${t.colors.highlight}`,
        outline: "none",
      },
    },
  },
  buttons: {
    primary: {
      fontSize: 3,
      padding: `10px`,
      color: "white",
      bg: "highlight",
      cursor: `pointer`,
    },
    secondary: {
      fontSize: 2,
      padding: `6px 10px`,
      bg: `background`,
      color: "highlight",
      "&:hover": {
        bg: "bg2",
        cursor: `pointer`,
      },
    },
  },
};

export default theme;
