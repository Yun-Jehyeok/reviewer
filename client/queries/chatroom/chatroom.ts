import { getChatRoomApi } from "@/apis/applicationApi";
import { chatRoomIFC } from "@/interfaces/applicationIFC";
import { useQuery } from "@tanstack/react-query";

export const useGetChatRoom = (chatroom: string) => {
    const {
        data: chatRoom,
        error,
        isPending,
    } = useQuery<chatRoomIFC, Error, chatRoomIFC, [_1: string, _2: string]>({
        queryKey: ["chatRoom", chatroom],
        queryFn: getChatRoomApi,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
    });

    return { chatRoom, error, isPending };
};
