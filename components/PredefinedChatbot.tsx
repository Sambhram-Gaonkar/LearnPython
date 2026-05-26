"use client";

import { useMemo, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type PredefinedChatbotProps = {
  messages: string[];
};

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

export function PredefinedChatbot({ messages }: PredefinedChatbotProps) {
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Ask anything. I reply only with saved messages." }
  ]);

  const botReplies = useMemo(() => {
    return messages.length ? messages : ["Thale nindh", "Moka Taka Hog Haaa..", "Kapada Shili"];
  }, [messages]);

  function sendMessage() {
    const text = chatInput.trim();
    if (!text) {
      return;
    }

    const reply = botReplies[Math.floor(Math.random() * botReplies.length)];
    setChatMessages((currentMessages) => [...currentMessages, { role: "user", text }, { role: "bot", text: reply }]);
    setChatInput("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {showChat && (
        <div className="mb-3 w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-lg border border-ink/10 bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
            <h2 className="font-bold text-ink">Roadmap Chat</h2>
            <button className="rounded-md p-1 text-ink/50 hover:bg-ink/5 hover:text-ink" onClick={() => setShowChat(false)} aria-label="Close chat">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-72 space-y-3 overflow-y-auto p-4">
            {chatMessages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-6 ${
                  message.role === "bot" ? "bg-paper text-ink/75" : "ml-auto bg-mint text-white"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-ink/10 p-3">
            <input
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
              className="min-w-0 flex-1 rounded-md border border-ink/15 px-3 py-2 text-sm outline-none focus:border-mint focus:ring-2 focus:ring-mint/20"
              placeholder="Type a message"
            />
            <button className="rounded-md bg-mint p-2 text-white hover:bg-mint/90" onClick={sendMessage} aria-label="Send message">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <button
        className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-soft hover:bg-ink/90"
        onClick={() => setShowChat((value) => !value)}
        aria-label="Open chat"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  );
}
