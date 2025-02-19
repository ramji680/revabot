import { create } from "zustand";

type Sender = 'user' | 'bot';

type Message = {
  sender: Sender;
  text: string;
  timestamp: string;
};

interface ChatStore {
  messages: Message[];
  addMessage: (msg: Message) => void;
}

export const useChatStore = create<ChatStore>((set:any) => ({
  messages: [],
  addMessage: (msg:any) => set((state:any) => ({ messages: [...state.messages, msg] })),
}));
