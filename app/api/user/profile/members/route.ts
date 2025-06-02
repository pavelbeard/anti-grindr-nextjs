import getMembers from "@/lib/features/members/getMembers";

// CHANGED
export const GET = async (request: Request) => {
  const members = await getMembers();
  return new Response(JSON.stringify({ users: members }), {
    status: 200,
  });
};
