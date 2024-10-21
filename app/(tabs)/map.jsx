import React from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import tw from "tailwind-react-native-classnames";
import Map from "../../components/Map";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigateCard } from "../../components";

const MapScreen = () => {
  const Stack = createStackNavigator();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1`}
      keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
    >
      <View style={tw`flex-1`}>
        <View style={tw`h-1/2`}>
          <Map />
        </View>
        <View style={tw`h-1/2`}>
          <Stack.Navigator>
            <Stack.Screen
              name="NavigateCard"
              component={NavigateCard}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MapScreen;
