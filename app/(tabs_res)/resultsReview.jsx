import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantsByOwner } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const HomeRestaurant = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="mb-4 text-2xl font-nbold">Results of Users</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeRestaurant;
