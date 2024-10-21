import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

import CustomButtom from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { router } from "expo-router";
import { createRestaurant } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Picker } from "@react-native-picker/picker";

const Review = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    ratingPlace: "",
    ratingDish: "",
    ratingService: "",
    writeReview: "",
    recomendation: "",
  });

  const submit = async () => {
    if (
      (form.ratingPlace === "") |
      (form.ratingDish === "") |
      (form.ratingService === "") |
      (form.writeReview === "") |
      (form.recomendation === "")
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createRestaurant({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Review Register");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        ratingPlace: "",
        ratingDish: "",
        ratingService: "",
        writeReview: "",
        recomendation: null,
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            className="flex justify-center w-full h-full px-4 my-6"
            style={{
              minHeight: Dimensions.get("window").height - 100,
            }}
          >
            <View className="flex-row items-center justify-center">
              <Text className="ml-4 text-2xl font-nsemibold">
                We need your opinion
              </Text>
              <Image
                source={images.logo}
                resizeMode="contain"
                className="w-[80px] h-[80px]"
              />
            </View>
            <FormField
              value={form.ratingPlace}
              handleChangeText={(e) => setForm({ ...form, ratingPlace: e })}
              otherStyles="mt-10"
              placeholder="Rate the place"
            />
            <FormField
              value={form.ratingService}
              handleChangeText={(e) => setForm({ ...form, ratingService: e })}
              otherStyles="mt-7"
              placeholder="Rate the Service"
            />
            <FormField
              value={form.ratingDish}
              handleChangeText={(e) => setForm({ ...form, ratingDish: e })}
              otherStyles="mt-7"
              placeholder="Rate of Dish"
            />

            <FormField
              value={form.writeReview}
              handleChangeText={(e) => setForm({ ...form, writeReview: e })}
              otherStyles="mt-7"
              placeholder="Write a Recomendation"
            />
            <View className="p-4 mt-8 rounded-lg ">
              <Text className="mb-4 text-xl font-nsemibold">Recomendation</Text>
              <Picker
                selectedValue={form.recomendation}
                onValueChange={(itemValue) =>
                  setForm({ ...form, recomendation: itemValue })
                }
                className="p-2 bg-gray-100 rounded-lg"
              >
                <Picker.Item label="Yes" value="Yes" />
                <Picker.Item label="No" value="No" />
              </Picker>
            </View>
            <CustomButtom
              title="Send Review"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading=""
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Review;
