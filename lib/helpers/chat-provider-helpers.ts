export type OpenChat = {
  withUserId: string;
  expanded: boolean;
  lastActive: Date; // to track last active time
};

// Until 10 open chats and 2 active chats, then remove the oldest one
export const openNewChat = (
  currentChats: OpenChat[],
  withNewUserId: string
) => {
  const chats = [...currentChats];
  // Check if the chat with the new user already exists

  let newChats;

  if (chats.some((chat) => chat.withUserId === withNewUserId)) {
    // If the chat already exists, update its last active time and expand it
    newChats = chats.map((chat) => {
      if (chat.withUserId === withNewUserId) {
        return { ...chat, lastActive: new Date(), expanded: true };
      }
      return chat;
    });
  } else {
    // If the chat does not exist, create a new one
    newChats = [
      ...chats,
      { withUserId: withNewUserId, expanded: true, lastActive: new Date() },
    ];
  }

  if (newChats.length > 10) {
    // Remove the oldest chat (first in the array)
    newChats.shift();
  }

  if (newChats.filter((chat) => chat.expanded).length > 2) {
    // extract expanded chats
    const expandedChats = newChats.filter((chat) => chat.expanded);
    // sort expanded chats by last active time
    expandedChats.sort(
      (a, b) => b.lastActive.getTime() - a.lastActive.getTime()
    );

    // Collapse all but the most recent expanded chat
    expandedChats.forEach((chat, index) => {
      if (chat.expanded && index > 1) {
        chat.expanded = false;
      }
    });

    // merge back the expanded chats into newChats
    newChats.forEach((chat) => {
      const expandedChat = expandedChats.find(
        (expanded) => expanded.withUserId === chat.withUserId
      );
      if (expandedChat) {
        chat.expanded = expandedChat.expanded;
      }
    });

    // Sort the newChats by last active time
    newChats.sort((a, b) => b.lastActive.getTime() - a.lastActive.getTime());
  }

  return newChats;
};
