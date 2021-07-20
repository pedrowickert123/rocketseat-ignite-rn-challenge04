import React from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./src/routes/app.routes";
import { StorageDataProvider } from "./src/hooks/storageData";
import { ThemeProvider } from "styled-components";
import theme from "./src/global/styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StorageDataProvider>
          <AppRoutes />
        </StorageDataProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
