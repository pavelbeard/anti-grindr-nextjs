import * as UserFeatures from "@/lib/features/user.features";
import { getMemberProfile } from "@/lib/helpers/chatProviderHelpers";
import { useCallback, useEffect, useState } from "react";

export default function useUserInfo(userId: string) {
  const [userInfo, setUserInfo] = useState<Awaited<
    ReturnType<typeof UserFeatures.getMemberProfileInfo>
  > | null>(null);

  const getMemberInfo = useCallback(async () => {
    if (!userId) return;

    const memberInfo = await getMemberProfile(userId);
    if (memberInfo) {
      setUserInfo(memberInfo);
    }
  }, [userId]);

  useEffect(() => {
    getMemberInfo();
  }, [getMemberInfo]);

  return {
    userInfo,
  };
}
