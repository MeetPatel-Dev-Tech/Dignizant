import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../constants/colors';
import Header from '../../components/Header';

interface Message {
  id: string;
  text: string;
  type: 'sent' | 'received';
  time: string;
  status?: 'sent' | 'delivered' | 'read'; // added status
}

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'BTC/USD is hitting 30k!',
      type: 'received',
      time: '10:00 AM',
    },
    {
      id: '2',
      text: 'Sell now or hold?',
      type: 'sent',
      time: '10:01 AM',
      status: 'sent',
    },
    {
      id: '3',
      text: 'Hold, might go higher.',
      type: 'received',
      time: '10:02 AM',
    },
    {
      id: '4',
      text: 'Thanks!',
      type: 'sent',
      time: '10:03 AM',
      status: 'read',
    },
  ]);

  const [input, setInput] = useState<string>('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      type: 'sent',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  const renderItem: ListRenderItem<Message> = ({ item }) => {
    const isSent = item.type === 'sent';

    const renderTick = () => {
      if (!isSent) return null;

      if (item.status === 'sent') {
        return (
          <Ionicons name="checkmark" size={16} color={COLORS.textSecondary} />
        );
      } else if (item.status === 'delivered') {
        return (
          <Ionicons
            name="checkmark-done"
            size={16}
            color={COLORS.textSecondary}
          />
        );
      } else if (item.status === 'read') {
        return <Ionicons name="checkmark-done" size={16} color={'blue'} />;
      }
      return null;
    };

    return (
      <View
        style={[
          styles.messageContainer,
          isSent ? styles.messageSent : styles.messageReceived,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isSent
              ? { color: COLORS.background }
              : { color: COLORS.textPrimary },
          ]}
        >
          {item.text}
        </Text>
        <View style={styles.messageInfo}>
          <Text style={styles.messageTime}>{item.time}</Text>
          {renderTick()}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header title="Chats" back={true} />
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContsiner}
      />

      {/* Input bar */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          placeholderTextColor={COLORS.textSecondary}
          value={input}
          onChangeText={setInput}
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color={COLORS.background} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 12,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageSent: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  messageReceived: {
    backgroundColor: COLORS.border,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 10,
    color: COLORS.textSecondary,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.border,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: COLORS.textPrimary,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contentContsiner: {
    padding: 10,
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});

export default ChatScreen;
