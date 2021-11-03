DELETE FROM person;
INSERT INTO person(person_id, person) VALUES ('895a624d-6bdc-40d3-8600-070a1f9cd49e',
    '{"email": "molly@books.com",
    "password": "$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y",
    "name": "Molly Members",
    "currentWorkspace": "5316eff5-3259-467b-993f-042fb2d4f8f4",
    "status": "Away"}'
);
INSERT INTO person(person_id, person) VALUES ('eaf3f770-e373-43f7-a5ef-99eb7a854958',
    '{"email": "anna@books.com",
    "password": "$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze",
    "name": "Anna Admin",
    "currentWorkspace": "5316eff5-3259-467b-993f-042fb2d4f8f4",
    "status": "Away"}'
);

DELETE FROM workspace;
INSERT INTO workspace(workspace_id, workspace) VALUES ('5316eff5-3259-467b-993f-042fb2d4f8f4',
    '{"name": "CSE183 Summer 2021",
    "usersWithAccess": ["895a624d-6bdc-40d3-8600-070a1f9cd49e", "eaf3f770-e373-43f7-a5ef-99eb7a854958"]}'
);
INSERT INTO workspace(workspace_id, workspace) VALUES ('4059361b-2254-4d4e-9ceb-4297eeb03c95',
    '{"name": "Molly Workspace",
    "usersWithAccess": ["895a624d-6bdc-40d3-8600-070a1f9cd49e"]}'
);

DELETE FROM person_workspaces;
INSERT INTO person_workspaces(personID, workspaceID) VALUES ('895a624d-6bdc-40d3-8600-070a1f9cd49e', '5316eff5-3259-467b-993f-042fb2d4f8f4');
INSERT INTO person_workspaces(personID, workspaceID) VALUES ('eaf3f770-e373-43f7-a5ef-99eb7a854958', '5316eff5-3259-467b-993f-042fb2d4f8f4');
INSERT INTO person_workspaces(personID, workspaceID) VALUES ('895a624d-6bdc-40d3-8600-070a1f9cd49e', '4059361b-2254-4d4e-9ceb-4297eeb03c95');

DELETE FROM channel;
INSERT INTO channel(channel_id, channel) VALUES ('a6f0fc1b-b1c8-4809-8c18-12c329d9f2c9',
    '{"name": "Assignment 1",
    "usersWithAccess": ["895a624d-6bdc-40d3-8600-070a1f9cd49e", "eaf3f770-e373-43f7-a5ef-99eb7a854958"]}'
);
INSERT INTO channel(channel_id, channel) VALUES ('0956f54e-5607-45ab-adda-bdbcd6787a6a',
    '{"name": "Assignment 2",
    "usersWithAccess": ["895a624d-6bdc-40d3-8600-070a1f9cd49e", "eaf3f770-e373-43f7-a5ef-99eb7a854958"]}'
);
INSERT INTO channel(channel_id, channel) VALUES ('9f7686aa-f1ca-4840-834b-07a3f3155a25',
    '{"name": "Assignment 3",
    "usersWithAccess": ["895a624d-6bdc-40d3-8600-070a1f9cd49e", "eaf3f770-e373-43f7-a5ef-99eb7a854958"]}'
);
INSERT INTO channel(channel_id, channel) VALUES ('6e2baa27-6192-4dd1-aeaa-f56e05da66a9',
    '{"name": "Assignment 4",
    "usersWithAccess": ["895a624d-6bdc-40d3-8600-070a1f9cd49e", "eaf3f770-e373-43f7-a5ef-99eb7a854958"]}'
);
INSERT INTO channel(channel_id, channel) VALUES ('baaf781b-4000-46ee-93d0-a11235140982',
    '{"name": "General",
    "usersWithAccess": ["895a624d-6bdc-40d3-8600-070a1f9cd49e", "eaf3f770-e373-43f7-a5ef-99eb7a854958"]}'
);
INSERT INTO channel(channel_id, channel) VALUES ('92764c4a-1e3d-4ef5-8423-593aecd8ce93',
    '{"name": "Molly Workspace Channel 1",
    "usersWithAccess": ["895a624d-6bdc-40d3-8600-070a1f9cd49e"]}'
);

DELETE FROM channel_workspaces;
INSERT INTO channel_workspaces(workspaceID, channelID) VALUES ('5316eff5-3259-467b-993f-042fb2d4f8f4', 'a6f0fc1b-b1c8-4809-8c18-12c329d9f2c9');
INSERT INTO channel_workspaces(workspaceID, channelID) VALUES ('5316eff5-3259-467b-993f-042fb2d4f8f4', '0956f54e-5607-45ab-adda-bdbcd6787a6a');
INSERT INTO channel_workspaces(workspaceID, channelID) VALUES ('5316eff5-3259-467b-993f-042fb2d4f8f4', '9f7686aa-f1ca-4840-834b-07a3f3155a25');
INSERT INTO channel_workspaces(workspaceID, channelID) VALUES ('5316eff5-3259-467b-993f-042fb2d4f8f4', '6e2baa27-6192-4dd1-aeaa-f56e05da66a9');
INSERT INTO channel_workspaces(workspaceID, channelID) VALUES ('5316eff5-3259-467b-993f-042fb2d4f8f4', 'baaf781b-4000-46ee-93d0-a11235140982');
INSERT INTO channel_workspaces(workspaceID, channelID) VALUES ('4059361b-2254-4d4e-9ceb-4297eeb03c95', '92764c4a-1e3d-4ef5-8423-593aecd8ce93');

DELETE FROM msg;
INSERT INTO msg(msg_id, msg) VALUES ('72e02492-a68b-4126-9d32-422bd9381edb',
    '{"name": "Molly Member",
    "date": "2021-07-04T03:17:57Z",
    "content": "Howdy Anna! My name is Molly."}'
);
INSERT INTO msg(msg_id, msg) VALUES ('1d13f968-6e22-4383-9b58-1d53faa2638e',
    '{"name": "Anna Admin",
    "date": "2021-07-05T05:13:49Z",
    "content": "Hi Molly. Nice to meet you!"}'
);
INSERT INTO msg(msg_id, msg) VALUES ('c0c7e761-0257-4231-91fb-dc34d68d30f8',
    '{"name": "Anna Admin",
    "date": "2021-07-02T15:32:16Z",
    "content": "Is anyone here?"}'
);
INSERT INTO msg(msg_id, msg) VALUES ('50bdf10c-12b7-42d2-8753-8128b0c9b723',
    '{"name": "Molly Member",
    "date": "2021-06-23T06:42:09Z",
    "content": "Hey Anna. How are you?"}'
);
INSERT INTO msg(msg_id, msg) VALUES ('48299985-7175-4471-a60d-bfd53bd24d27',
    '{"name": "Anna Admin",
    "date": "2021-06-24T02:31:07Z",
    "content": "I am doing great. Why is your last name Member?"}'
);
INSERT INTO msg(msg_id, msg) VALUES ('63d8f32d-f846-49e6-80f8-c0785bab9c85',
    '{"name": "Molly Member",
    "date": "2021-06-24T04:58:14Z",
    "content": "So my nickname can be M & M."}'
);
INSERT INTO msg(msg_id, msg) VALUES ('6c51c229-12c1-4e5a-b3b8-e1f7932d8647',
    '{"name": "Molly Member",
    "date": "2021-07-12T15:34:02Z",
    "content": "I am Molly Member. Here to talk to myself."}'
);
INSERT INTO msg(msg_id, msg) VALUES ('4097fc78-344e-44ad-9982-42cf1c190c79',
    '{"name": "Anna Admin",
    "date": "2021-05-05T12:54:43Z",
    "content": "My name is Anna. I am talking to myself."}'
);
INSERT INTO msg(msg_id, msg) VALUES ('3b7b3f36-9c90-46c0-ab10-10f6c3d7d83c',
    '{"name": "Molly Member",
    "date": "2021-07-23T21:41:08Z",
    "content": "I love Assignment 2!"}'
);
INSERT INTO msg(msg_id, msg) VALUES ('089c641e-027e-4c2d-acd0-f139ccefd714',
    '{"name": "Anna Admin",
    "date": "2021-07-24T14:12:18Z",
    "content": "Me too."}'
);
INSERT INTO msg(msg_id, msg) VALUES ('dc7d4f8b-f460-4e35-b2f1-24e77ccb73c3',
    '{"name": "Anna Admin",
    "date": "2021-07-01T11:32:14Z",
    "content": "Assignment 3 is really tough..."}'
);
INSERT INTO msg(msg_id, msg) VALUES ('4efde00c-3245-46b6-a5f2-b34896843069',
    '{"name": "Molly Member",
    "date": "2021-07-02T13:30:40Z",
    "content": "I agree."}'
);
INSERT INTO msg(msg_id, msg) VALUES ('14aa9742-bfae-46f0-9c21-c56bcda4bffb',
    '{"name": "Molly Member",
    "date": "2021-05-04T04:13:39Z",
    "content": "I am Molly. I am alone in this workspace."}'
);
INSERT INTO msg(msg_id, msg) VALUES ('1f863f82-10bb-4063-9d62-63e72e18a4b5',
    '{"name": "Molly Member",
    "date": "2021-07-14T12:22:15Z",
    "content": "I am direct messaging myself in Molly Workspace."}'
);

DELETE FROM msg_channel;
INSERT INTO msg_channel(msgID, channelID) VALUES ('72e02492-a68b-4126-9d32-422bd9381edb', 'a6f0fc1b-b1c8-4809-8c18-12c329d9f2c9');
INSERT INTO msg_channel(msgID, channelID) VALUES ('1d13f968-6e22-4383-9b58-1d53faa2638e', 'a6f0fc1b-b1c8-4809-8c18-12c329d9f2c9');
INSERT INTO msg_channel(msgID, channelID) VALUES ('c0c7e761-0257-4231-91fb-dc34d68d30f8', 'a6f0fc1b-b1c8-4809-8c18-12c329d9f2c9');
INSERT INTO msg_channel(msgID, channelID) VALUES ('3b7b3f36-9c90-46c0-ab10-10f6c3d7d83c', '0956f54e-5607-45ab-adda-bdbcd6787a6a');
INSERT INTO msg_channel(msgID, channelID) VALUES ('089c641e-027e-4c2d-acd0-f139ccefd714', '0956f54e-5607-45ab-adda-bdbcd6787a6a');
INSERT INTO msg_channel(msgID, channelID) VALUES ('dc7d4f8b-f460-4e35-b2f1-24e77ccb73c3', '9f7686aa-f1ca-4840-834b-07a3f3155a25');
INSERT INTO msg_channel(msgID, channelID) VALUES ('4efde00c-3245-46b6-a5f2-b34896843069', '9f7686aa-f1ca-4840-834b-07a3f3155a25');
INSERT INTO msg_channel(msgID, channelID) VALUES ('14aa9742-bfae-46f0-9c21-c56bcda4bffb', '92764c4a-1e3d-4ef5-8423-593aecd8ce93');

DELETE FROM directmsg;
INSERT INTO directmsg(directmsg_id, directmsg) VALUES ('92865d6f-e2b0-4669-8fd8-4973e9251c7b',
    '{"user1": "895a624d-6bdc-40d3-8600-070a1f9cd49e",
    "user2": "eaf3f770-e373-43f7-a5ef-99eb7a854958"}'
);
INSERT INTO directmsg(directmsg_id, directmsg) VALUES ('2ed54bcc-265a-4ee8-89ec-c89bd7cbcc9c',
    '{"user1": "895a624d-6bdc-40d3-8600-070a1f9cd49e",
    "user2": "895a624d-6bdc-40d3-8600-070a1f9cd49e"}'
);
INSERT INTO directmsg(directmsg_id, directmsg) VALUES ('73348ab1-68d0-4ba6-b704-fc3a5fddf4ec',
    '{"user1": "895a624d-6bdc-40d3-8600-070a1f9cd49e",
    "user2": "895a624d-6bdc-40d3-8600-070a1f9cd49e"}'
);
INSERT INTO directmsg(directmsg_id, directmsg) VALUES ('123cae9e-fec1-4ab2-8944-2ea896ed995b',
    '{"user1": "eaf3f770-e373-43f7-a5ef-99eb7a854958",
    "user2": "eaf3f770-e373-43f7-a5ef-99eb7a854958"}'
);

DELETE FROM directmsg_msg;
INSERT INTO directmsg_msg(directmsgID, msgID) VALUES ('92865d6f-e2b0-4669-8fd8-4973e9251c7b', '50bdf10c-12b7-42d2-8753-8128b0c9b723');
INSERT INTO directmsg_msg(directmsgID, msgID) VALUES ('92865d6f-e2b0-4669-8fd8-4973e9251c7b', '48299985-7175-4471-a60d-bfd53bd24d27');
INSERT INTO directmsg_msg(directmsgID, msgID) VALUES ('92865d6f-e2b0-4669-8fd8-4973e9251c7b', '63d8f32d-f846-49e6-80f8-c0785bab9c85');
INSERT INTO directmsg_msg(directmsgID, msgID) VALUES ('2ed54bcc-265a-4ee8-89ec-c89bd7cbcc9c', '6c51c229-12c1-4e5a-b3b8-e1f7932d8647');
INSERT INTO directmsg_msg(directmsgID, msgID) VALUES ('123cae9e-fec1-4ab2-8944-2ea896ed995b', '4097fc78-344e-44ad-9982-42cf1c190c79');
INSERT INTO directmsg_msg(directmsgID, msgID) VALUES ('73348ab1-68d0-4ba6-b704-fc3a5fddf4ec', '1f863f82-10bb-4063-9d62-63e72e18a4b5');

DELETE FROM directmsg_workspace;
INSERT INTO directmsg_workspace(directmsgID, workspaceID) VALUES ('92865d6f-e2b0-4669-8fd8-4973e9251c7b', '5316eff5-3259-467b-993f-042fb2d4f8f4');
INSERT INTO directmsg_workspace(directmsgID, workspaceID) VALUES ('2ed54bcc-265a-4ee8-89ec-c89bd7cbcc9c', '5316eff5-3259-467b-993f-042fb2d4f8f4');
INSERT INTO directmsg_workspace(directmsgID, workspaceID) VALUES ('123cae9e-fec1-4ab2-8944-2ea896ed995b', '5316eff5-3259-467b-993f-042fb2d4f8f4');
INSERT INTO directmsg_workspace(directmsgID, workspaceID) VALUES ('73348ab1-68d0-4ba6-b704-fc3a5fddf4ec', '4059361b-2254-4d4e-9ceb-4297eeb03c95');
