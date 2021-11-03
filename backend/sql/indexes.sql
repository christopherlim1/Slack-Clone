CREATE INDEX person_idx ON person(person_id, person);
CREATE INDEX workspace_idx ON workspace(workspace_id, workspace);
CREATE INDEX person_workspace_idx ON person_workspace(personID, workspaceID);
CREATE INDEX channel_idx ON channel(channel_id, channel);
CREATE INDEX channel_workspaces_idx ON channel_workspaces(workspaceID, channelID);
CREATE INDEX msg_idx ON msg(msg_id, msg);
CREATE INDEX msg_channel_idx ON msg_channel(msgID, channelID);
CREATE INDEX directmsg_idx ON directmsg(directmsg_id, directmsg);
CREATE INDEX directmsg_msg_idx ON directmsg_msg(directmsgID, msgID);
CREATE INDEX directmsg_workspace_idx ON directmsg_workspace(directmsgID, workspaceID);