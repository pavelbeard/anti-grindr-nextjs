import * as UserService from "@/lib/api/user/user.service";

import type { ServerResponse } from "http";

export type Client = {
  res: ServerResponse;
  userId: string;
};

export const clients: Client[] = [];

export default function broadcastStatus() {
  const users = UserService.getAllUsers();
  const status = Object.entries(users).map(([userId, data]) => ({
    userId,
    online: data.online,
    lastActive: data.lastActive,
  }));

  clients.forEach(({ res }) => {
    res.write(`event: userStatus\n`);
    res.write(`data: ${JSON.stringify(status)}\n\n`);
  });
}
