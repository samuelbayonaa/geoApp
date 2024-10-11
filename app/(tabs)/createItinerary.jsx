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
import { Video, ResizeMode } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { icons, images } from "../../constants";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
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
      (form.prompt === "") |
      (form.title === "") |
      !form.thumbnail |
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createVideo({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-center text-blue-400 font-nsemibold">
          Create your itinerary
        </Text>

        <FormField
          value={form.type}
          placeholder="Type of restaurant"
          handleChangeText={(e) => setForm({ ...form, type: e })}
          otherStyles="mt-10"
        />

        <FormField
          placeholder="Direction"
          value={form.type}
          handleChangeText={(e) => setForm({ ...form, type: e })}
          otherStyles="mt-7"
        />

        <FormField
          placeholder="People who are going to go"
          value={form.text1}
          handleChangeText={(e) => setForm({ ...form, text1: e })}
          otherStyles="mt-7"
        />
        <FormField
          placeholder="Start date"
          value={form.text2}
          handleChangeText={(e) => setForm({ ...form, text2: e })}
          otherStyles="mt-7"
        />
        <FormField
          placeholder="End date"
          value={form.text3}
          handleChangeText={(e) => setForm({ ...form, text3: e })}
          otherStyles="mt-7"
        />
        <CustomButtom
          title="Send to my itinerary"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
