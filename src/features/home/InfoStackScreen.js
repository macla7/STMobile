import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your screens
import Info from "./Info";
import InfoSecond from "./InfoSecond";
import InfoThird from "./InfoThird";
import InfoFourth from "./InfoFourth";

const ModalStack = createNativeStackNavigator();

const InfoStackScreen = () => {
  return (
    <ModalStack.Navigator>
      <ModalStack.Screen
        name="Info"
        component={Info}
        initialParams={{
          loading: false,
        }}
        options={{ headerShown: false }}
      />
      <ModalStack.Screen
        name="InfoSecond"
        component={InfoSecond}
        options={{ headerShown: false }}
      />
      <ModalStack.Screen
        name="InfoThird"
        component={InfoThird}
        options={{ headerShown: false }}
      />
      <ModalStack.Screen
        name="InfoFourth"
        component={InfoFourth}
        options={{ headerShown: false }}
      />
    </ModalStack.Navigator>
  );
};

export default InfoStackScreen;
