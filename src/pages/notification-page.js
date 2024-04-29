import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { NotificationHistoryData } from "../services/Notificaiton";
import NotificationCard from "../components/notification-card";

export default function NotificationsPage({ navigation }) {
  const [notificationData, setNotificationData] = useState([]);
  const [error, setError] = useState("");

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
  }, []);

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
      <ScrollView className="h-[93%]">
        {notificationData.length > 0 && notificationData !== undefined ? (
          notificationData.map((data) => (
            <NotificationCard
              key={data.notificationHistoryID}
              message={data.Message}
              date={data.CreatedDate}
            />
          ))
        ) : (
          <Text>No notifications to display.</Text>
        )}
      </ScrollView>
    </View>
  );
}
