import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useImage } from "./api";
import { QueryClientProvider, UseQueryResult } from "@tanstack/react-query";
import { IQueryClient } from "./client";
import { APIImage } from "./types";

const { width } = Dimensions.get("window");
const size = width / 2;

const Tab1 = ({ images }: { images: UseQueryResult<APIImage[], Error> }) => {
  return (
    <FlatList
      data={images.data}
      contentContainerStyle={{ minHeight: 200 }}
      // refreshing={images.isLoading || images.isRefetching}
      // onRefresh={() => images.refetch()}
      numColumns={2}
      renderItem={({ item: image }) => {
        return (
          <View style={{ width: size, height: size, backgroundColor: "blue" }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              source={{
                uri: image.urls.regular,
              }}
              recyclingKey={image.id}
              placeholder={{ uri: image.urls.thumb }}
            />
          </View>
        );
      }}
    />
  );
};
const Tab2 = ({ images }: { images: UseQueryResult<APIImage[], Error> }) => {
  return (
    <FlatList
      data={images.data}
      horizontal={false}
      contentContainerStyle={{ minHeight: 200 }}
      // refreshing={images.isLoading || images.isRefetching}
      // onRefresh={() => images.refetch()}
      numColumns={2}
      renderItem={({ item: image }) => {
        return (
          <View style={{ width: size, height: size, backgroundColor: "blue" }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              contentFit="cover"
              source={{
                uri: image.urls.regular,
              }}
              recyclingKey={image.id}
              placeholder={{ uri: image.urls.thumb }}
            />
          </View>
        );
      }}
    />
  );
};

function AppComponent() {
  const images1 = useImage(1);
  const images2 = useImage(2);

  const [isTab1, setIsTab1] = useState(true);
  return (
    <QueryClientProvider client={IQueryClient}>
      <View style={styles.container}>
        <Switch
          value={isTab1}
          onValueChange={(value) => setIsTab1(value)}
          style={{ marginBottom: 100 }}
        />
        {isTab1 ? <Tab1 images={images1} /> : <Tab2 images={images2} />}
      </View>
    </QueryClientProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={IQueryClient}>
      <AppComponent />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
});
