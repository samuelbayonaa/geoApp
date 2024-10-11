import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons, images } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex flex-row items-center w-full h-16 px-4 space-x-4 bg-white border-2 border-black rounded-2xl focus:border-sky-400">
      <TextInput
        className="text-base mt-0.5 text-black flex-1 font-nregular"
        value={query}
        placeholder="Search a restaurant"
        placeholderTextColor="#000000"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={images.search}
          className="w-10 h-8"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
