import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "../features/groups/groupSlice";
import sessionsReducer from "../features/sessions/sessionSlice";
import membershipsReducer from "../features/groups/memberships/membershipSlice";
import usersReducer from "../features/users/userSlice";
import notificationsReducer from "../features/notifications/notificationSlice";
import postsReducer from "../features/posts/postSlice";
import shiftsReducer from "../features/posts/shifts/shiftSlice";
import moneyReducer from "../features/posts/money/moneySlice";
import invitesReducer from "../features/groups/invites/inviteSlice";
import passwordsReducer from "../features/passwords/passwordSlice";
import pushTokensReducer from "../features/users/pushTokenSlice";
import appVersionsReducer from "../features/authFlow/appVersionSlice";

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    sessions: sessionsReducer,
    memberships: membershipsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    posts: postsReducer,
    shifts: shiftsReducer,
    money: moneyReducer,
    invites: invitesReducer,
    passwords: passwordsReducer,
    pushTokens: pushTokensReducer,
    appVersions: appVersionsReducer,
  },
});
