import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { NotificationHistoryData } from "../services/Notificaiton";
import NotificationCard from "../components/notification-card";

export default function NotificationsPage({ navigation }) {
  const [notificationData, setNotificationData] = useState([]);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Simulate refreshing the page
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  const { fontScale } = Dimensions.get("window");
  useEffect(() => {
    NotificationHistoryData()
      .then((data) => {
        if (!data.notifications || !Array.isArray(data.notifications)) {
          setError("Invalid notification data");
          return;
        }
        console.log("data", data.notifications);
        setNotificationData(data.notifications);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        setError("Failed to load notifications");
      });
  }, [refreshing]);

  if (error) {
    return (
      <View>
        <Text>There was a problem fetching notifications.</Text>
      </View>
    );
  }

  return (
    <View>
      {console.log(notificationData)}
      <ScrollView
        className="h-[93%]"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {notificationData.length > 0 && notificationData !== undefined ? (
          notificationData.map((data) => (
            <NotificationCard
              key={data.notificationHistoryID}
              message={data.Message}
              date={data.CreatedDate}
            />
          ))
        ) : (
          <Text className="text-3xl text-center  mt-[60%]">
            Loading notifications...
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
