import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButtom from "../../components/CustomButton";
import FormField from "../../components/FormField";
import * as DocumentPicker from "expo-document-picker";
import { icons } from "../../constants";
import { router } from "expo-router";
import { createRestaurant } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Picker } from "@react-native-picker/picker";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    direction: "",
    menu: "",
    type: "",
    image: null,
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["*/*"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          image: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      (form.name === "") |
      (form.direction === "") |
      (form.menu === "") |
      (form.type === "") |
      !form.image
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createRestaurant({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Restaurant uploaded successfully");
      router.push("/homeRestaurant");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        name: "",
        direction: "",
        menu: "",
        type: "",
        image: null,
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-black font-nsemibold">Upload Video</Text>

        <FormField
          value={form.name}
          placeholder="Name of restaurant"
          handleChangeText={(e) => setForm({ ...form, name: e })}
          otherStyles="mt-10"
        />
        <View className="space-y-2 mt-7">
          <Text className="text-base text-gray-100 font-nmedium">Image</Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.image ? (
              <Image
                source={{ uri: form.image.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="flex flex-row items-center justify-center w-full h-16 px-4 space-x-2 border-2 border-gray-300 bg-white-100 rounded-2xl">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-nmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          value={form.direction}
          placeholder="Direction of restaurant"
          handleChangeText={(e) => setForm({ ...form, direction: e })}
          otherStyles="mt-7"
        />
        <FormField
          value={form.menu}
          placeholder="Destacates food"
          handleChangeText={(e) => setForm({ ...form, menu: e })}
          otherStyles="mt-7"
        />

        <View className="p-4 mt-8 rounded-lg ">
          <Text className="mb-4 text-xl font-nsemibold">Select Type</Text>
          <Picker
            selectedValue={form.type}
            onValueChange={(itemValue) => setForm({ ...form, type: itemValue })}
            className="p-2 bg-gray-100 rounded-lg"
          >
            <Picker.Item label="Mexican" value="mexican" />
            <Picker.Item label="Italian" value="italian" />
            <Picker.Item label="Typical Food" value="typical_food" />
            <Picker.Item label="Fast Food" value="fast_food" />
            <Picker.Item label="Vegan" value="vegan" />
          </Picker>
        </View>
        <CustomButtom
          title="Pusblish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
