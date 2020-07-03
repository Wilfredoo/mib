import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import moment from "moment";
import * as firebase from "firebase";

export default function ReceivedMessage({ data, reply, navigation }) {
  const [message, setMessage] = useState(null);
  const store = firebase.firestore();

  replyAndClear = async(senderId, inReplyTo, message) => {
    await reply(senderId, inReplyTo, message)
    navigation.navigate("History", {
      message
    })
    clearInput()
  }

  clearInput = () => {
    setMessage("should be null")
  }

  return (
    <View style={styles.buttonsContainer}>
      {data.data && data.type === "received" && (
        <>
          {data.previousMessage && data.data.isReply && (
            <>
              <Text style={styles.previousMessage}>
                In reply to your message: {"\n"}
                {"\n"}
                <Text style={styles.highlight}>
                  {" "}
                  {data.previousMessage.message}
                </Text>
                {"\n"} -
                <Text style={{ fontStyle: "italic" }}>
                  , {moment(data.previousMessage.time).fromNow()}
                </Text>
              </Text>
            </>
          )}
          <Text style={styles.message}>
            You received this message: {"\n"}
            {"\n"}
            <Text style={styles.highlight}> {data.data.message}</Text> {"\n"}-{" "}
            {data.sender && data.sender.name && (
              <Text style={{ fontStyle: "italic" }}>
                {data.sender.name}, {moment(data.data.time).fromNow()}
              </Text>
            )}
          </Text>

          {!data.data.isReply && (
            <>
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder={
                  "E.g. our life is frittered away by detail... simplify, simplify."
                }
                onChangeText={(text) => setMessage(text)}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.replyButton}
                onPress={() => replyAndClear(data.data.from, data.data.id, message)}
              >
                <Text style={{ color: "#FFF", fontWeight: "500" }}>Reply</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.forgetButton}
                onPress={() => forget()}
              >
                <Text style={{ color: "#204051", fontWeight: "500" }}>
                  Forget
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => report()}>
                <Text
                  style={{ color: "#204051", fontWeight: "500", marginTop: 30 }}
                >
                  Report
                </Text>
              </TouchableOpacity> */}
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  replyButton: {
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: 300,
  },
  forgetButton: {
    backgroundColor: "#e7dfd5",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: 300,
  },
  input: {
    borderColor: "#8A8F9E",
    borderWidth: StyleSheet.hairlineWidth,
    height: 140,
    maxWidth: 350,
    fontSize: 15,
    color: "#161F3D",
    borderRadius: 5,
    textAlignVertical: "top",
    paddingLeft: 10,
    paddingTop: 10,
    marginTop: 40,
  },
  previousMessage: {
    marginBottom: 30,
    textAlign: "center",
  },
  message: {
    marginTop: 30,
    textAlign: "center",
  },
  highlight: {
    fontSize: 20,
  },
});
