import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRestaurantsByOwner } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const homeRestaurant = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        if (user && user.$id) {
          const fetchedRestaurants = await getRestaurantsByOwner(user.$id);
          setRestaurants(fetchedRestaurants);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [user]);

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      className="p-4 mb-4 bg-white rounded-lg shadow-md"
      onPress={() => router.push(`/restaurant/${item.$id}`)}
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-48 mb-2 rounded-lg"
      />
      <Text className="text-lg text-black font-nbold">{item.name}</Text>
      <Text className="text-sm text-black">{item.direction}</Text>
      <Text className="mt-1 text-sm text-black">{item.type}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-white">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="mb-4 text-2xl font-nbold">Your Restaurants</Text>
        {restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderRestaurantItem}
            keyExtractor={(item) => item.$id}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        ) : (
          <Text className="text-lg text-center">
            You don't have any restaurants yet.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default homeRestaurant;
