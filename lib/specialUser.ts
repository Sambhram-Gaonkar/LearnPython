export type SpecialUserConfig = {
  enabled: boolean;
  welcomeTitle: string;
  welcomeMessage: string;
  welcomeImage: string;
  completionTitle: string;
  completionMessage: string;
  certificateImage: string;
  chatbotMessages: string[];
};

export function getSpecialUserConfig(userEmail?: string | null): SpecialUserConfig {
  const targetEmail = process.env.SPECIAL_USER_EMAIL?.trim().toLowerCase();
  const enabled = Boolean(targetEmail && userEmail?.toLowerCase() === targetEmail);

  return {
    enabled,
    welcomeTitle: process.env.SPECIAL_WELCOME_TITLE || "Welcome to your Python roadmap",
    welcomeMessage:
      process.env.SPECIAL_WELCOME_MESSAGE ||
      "This message is shown only for your account. Complete each exercise and track your progress here.",
    welcomeImage: process.env.SPECIAL_WELCOME_IMAGE || "/special/welcome.png",
    completionTitle: process.env.SPECIAL_COMPLETION_TITLE || "Congratulations",
    completionMessage:
      process.env.SPECIAL_COMPLETION_MESSAGE ||
      "You completed the Python Learning Roadmap. Your certificate is ready.",
    certificateImage: process.env.SPECIAL_CERTIFICATE_IMAGE || "/special/certificate.png",
    chatbotMessages: (process.env.SPECIAL_CHATBOT_MESSAGES || "Thale nindh|Moka Taka Odka|Keep practicing|Finish today's task")
      .split("|")
      .map((message) => message.trim())
      .filter(Boolean)
  };
}
