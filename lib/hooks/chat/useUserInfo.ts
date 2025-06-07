import * as UserFeatures from "@/lib/features/user.features";
import { getMemberProfile } from "@/lib/helpers/chatProviderHelpers";
import { useCallback, useEffect, useState } from "react";

interface IUseUserInfo {
  userId?: string;
}

export default function useUserInfo({ userId }: IUseUserInfo) {
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
