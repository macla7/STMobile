import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    // Add new color
    // note that the tab navidatior icons need to be changed independently
    myBlue: "#4243ed",
    myYellow: "#ffe249",
    myYellowText: "#211b00",
    myPinkText: "#2e1125",
    myPink: "#ffd8ec",
    myBorderGray: "#e5e7eb",
    myDarkGrayText: "#1f2937",
    myMidGrayText: "#4b5563",
    myBackgroundGray: "#f5f5f5",

    myButtonTextScheme: {
      600: "myBlue",
    },
  },

  components: {
    Button: {
      variants: {
        myButtonYellowVariant: {
          bgColor: "myBlue",
          _text: {
            color: "#ffffff",
            fontWeight: "600",
          },
          borderWidth: "1",
          borderColor: "myBorderGray",
          borderRadius: "9px",
        },
        myButtonGrayVariant: {
          bgColor: "myBorderGray",
          _text: {
            color: "myMidGrayText",
          },
          borderWidth: "1",
          borderColor: "myBorderGray",
        },
      },
    },
  },

  // textColor: {
  //   primary: "#000000",
  // },

  // buttonTextColor: "#000000",

  fontConfig: {
    Inter: {
      200: {
        normal: "Inter_200ExtraLight",
      },
      300: {
        normal: "Inter_300Light",
      },
      400: {
        normal: "Inter_400Regular",
      },
      500: {
        normal: "Inter_500Medium",
      },
      600: {
        normal: "Inter_600SemiBold",
      },
      700: {
        normal: "Inter_700Bold",
      },
      800: {
        normal: "Inter_800ExtraBold",
      },
      900: {
        normal: "Inter_900Black",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Inter",
    body: "Inter",
    mono: "Inter",
  },
});
