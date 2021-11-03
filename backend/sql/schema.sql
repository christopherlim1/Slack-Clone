DROP TABLE IF EXISTS person;
CREATE TABLE person(person_id VARCHAR, person jsonb);

DROP TABLE IF EXISTS workspace;
CREATE TABLE workspace(workspace_id VARCHAR, workspace jsonb);

DROP TABLE IF EXISTS person_workspaces;
CREATE TABLE person_workspaces(personID VARCHAR, workspaceID VARCHAR);

DROP TABLE IF EXISTS channel;
CREATE TABLE channel(channel_id VARCHAR, channel jsonb);

DROP TABLE IF EXISTS channel_workspaces;
CREATE TABLE channel_workspaces(workspaceID VARCHAR, channelID VARCHAR);

DROP TABLE IF EXISTS msg;
CREATE TABLE msg(msg_id VARCHAR, msg jsonb);

DROP TABLE IF EXISTS msg_channel;
CREATE TABLE msg_channel(msgID VARCHAR, channelID VARCHAR);

DROP TABLE IF EXISTS directmsg;
CREATE TABLE directmsg(directmsg_id VARCHAR, directmsg jsonb);

DROP TABLE IF EXISTS directmsg_msg;
CREATE TABLE directmsg_msg(directmsgID VARCHAR, msgID VARCHAR);

DROP TABLE IF EXISTS directmsg_workspace;
CREATE TABLE directmsg_workspace(directmsgID VARCHAR, workspaceID VARCHAR);
