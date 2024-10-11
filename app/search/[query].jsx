import { Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";

import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { searchRestaurants } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchRestaurants(query));

  console.log(query, posts);

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View className="flex px-4 my-6">
              <Text className="text-sm text-black font-nmedium">
                Search Results
              </Text>
              <Text className="mt-1 text-2xl text-black font-nsemibold">
                {query}
              </Text>
              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} refetch={refetch} />
              </View>
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Place Found"
            subtitle="No restaurants found for this search query"
            buttomtitle="Return"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
