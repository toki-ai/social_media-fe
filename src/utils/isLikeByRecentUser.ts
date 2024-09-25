import { Post } from "../interface/PostInterface";

export const isLikeByRecentUser = (recentUserId: string, post: Post): boolean => {
    for (let user of post.liked) {
        if (user.id === recentUserId) {
            return true;
        }
    }
    return false;

}