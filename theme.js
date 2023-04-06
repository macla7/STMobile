import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    // Add new color
    // note that the tab navidatior icons need to be changed independently
    myDarkGreen: "#20716A",

    myButtonTextScheme: {
      600: "myDarkGreen",
    },
  },

  components: {
    Button: {
      variants: {
        myButtonYellowVariant: {
          bgColor: "#FFF78C",
          _text: {
            color: "myDarkGreen",
          },
          borderWidth: "1",
          borderColor: "#e5e7eb",
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
