const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// Get all workspaces authorized for the currently logged in user
exports.getWorkspace = async (req, res) => {
  const userEmail = req.user.email;

  const selectWorkspaceID = `SELECT workspaceID FROM person_workspaces WHERE personID = (SELECT person_id FROM person WHERE person->>'email' = $1)`;
  const query = {text: selectWorkspaceID, values: [userEmail]};
  const {rows} = await pool.query(query);
  const arr = rows;
  const listOfWorkspaces = [];

  for (let i = 0; i < arr.length; i++) {
    const s = `SELECT workspace FROM workspace WHERE workspace_id = $1`;
    const q = {
      text: s,
      values: [`${arr[i]['workspaceid']}`],
    };
    const {rows} = await pool.query(q);
    const dict = {'name': rows[0]['workspace']['name'], 'id': arr[i]['workspaceid']};
    listOfWorkspaces.push(dict);
  }

  res.status(200).json(listOfWorkspaces);
};

// Returns all the Channels in a Workspace
exports.getChannel = async (req, res) => {
  const id = req.params.workspace;

  const selectWorkspace = `SELECT workspace FROM workspace WHERE workspace_id = $1`;
  const q = {text: selectWorkspace, values: [id]};
  const result = await pool.query(q);

  const selectPersonID = `SELECT person_id FROM person WHERE person->>'email' = $1`;
  const query = {text: selectPersonID, values: [req.user.email]};
  const person = await pool.query(query);

  const userHasAccess = result.rows[0]['workspace']['usersWithAccess'].find((userid) => userid === person.rows[0]['person_id']);

  if (userHasAccess) {
    const select = `SELECT channelID FROM channel_workspaces WHERE workspaceID = $1`;
    const query = {text: select, values: [id]};
    const {rows} = await pool.query(query);
    const arr = rows;
    const listOfChannels = [];

    for (let i = 0; i < arr.length; i++) {
      const s = `SELECT channel FROM channel WHERE channel_id = $1`;
      const q = {text: s, values: [`${arr[i]['channelid']}`]};
      const {rows} = await pool.query(q);
      const dict = {'name': rows[0]['channel']['name'], 'id': arr[i]['channelid']};
      listOfChannels.push(dict);
    }

    res.status(200).json(listOfChannels);
  } else {
    res.status(401).send();
  }
};

// Returns Messages in a Channel
exports.getMessage = async (req, res) => {
  const id = req.params.channel;

  const selectMsg = `SELECT channel FROM channel WHERE channel_id = $1`;
  const q = {text: selectMsg, values: [id]};
  const result = await pool.query(q);

  const selectPersonID = `SELECT person_id FROM person WHERE person->>'email' = $1`;
  const query = {text: selectPersonID, values: [req.user.email]};
  const person = await pool.query(query);

  const userHasAccess = result.rows[0]['channel']['usersWithAccess'].find((userid) => userid === person.rows[0]['person_id']);

  if (userHasAccess) {
    const select = `SELECT msgID FROM msg_channel WHERE channelID = $1`;
    const query = {text: select, values: [id],};
    const {rows} = await pool.query(query);
    const arr = rows;
    const listOfMsgs = [];

    for (let i = 0; i < arr.length; i++) {
      const s = `SELECT msg FROM msg WHERE msg_id = $1`;
      const q = {text: s, values: [`${arr[i]['msgid']}`],};
      const {rows} = await pool.query(q);
      const dict = rows[0]['msg'];
      dict['id'] = arr[i]['msgid'];
      listOfMsgs.push(dict);
    }

     // https://stackoverflow.com/questions/42539901/react-sorting-by-date
    const sortedDict = listOfMsgs.sort((a, b) => {
      return new Date(a['date']).getTime() - new Date(b['date']).getTime();
    });

    res.status(200).send(sortedDict);
  } else {
    res.status(401).send();
  }
};

// Returns Users in a Workspace
exports.getUsers = async (req, res) => {
  const id = req.params.workspace;

  const selectWorkspace = `SELECT workspace FROM workspace WHERE workspace_id = $1`;
  const q = {text: selectWorkspace, values: [id]};
  const result = await pool.query(q);

  const selectPersonID = `SELECT person_id FROM person WHERE person->>'email' = $1`;
  const query = {text: selectPersonID, values: [req.user.email]};
  const person = await pool.query(query);

  const userHasAccess = result.rows[0]['workspace']['usersWithAccess'].find((userid) => userid === person.rows[0]['person_id']);

  if (userHasAccess) {
    const users = result.rows[0]['workspace']['usersWithAccess'];
    const listOfUserNames = [];

    for (let i = 0; i < users.length; i++) {
      const select = `SELECT person FROM person WHERE person_id = $1`;
      const query = {text: select, values: [users[i]]};
      const {rows} = await pool.query(query);
      listOfUserNames.push({
        'name': rows[0]['person']['name'],
        'status': rows[0]['person']['status'],
        'id': users[i],
      });
    }

    res.status(200).json(listOfUserNames);
  } else {
    res.status(401).send();
  }
};

// Get Direct Messages
exports.getDMs = async (req, res) => {
  const id = req.params.user;

  const select = `SELECT DISTINCT dm.directmsg_id, dm.directmsg, dmw.workspaceid
                  FROM directmsg dm, directmsg_msg dmm, msg m, directmsg_workspace dmw, workspace w
                  WHERE (dm.directmsg->>'user1' = $1
                  OR dm.directmsg->>'user2' = $1)
                  AND dm.directmsg_id = dmm.directmsgid
                  AND m.msg_id = dmm.msgid
                  AND dmw.workspaceid = w.workspace_id
                  AND dmw.directmsgid = dm.directmsg_id`;
  const query = {text: select, values: [id]};
  const {rows} = await pool.query(query);

  const s = `SELECT DISTINCT m.msg, dm.directmsg_id
            FROM directmsg dm, directmsg_msg dmm, msg m
            WHERE (dm.directmsg->>'user1' = $1
            OR dm.directmsg->>'user2' = $1)
            AND dm.directmsg_id = dmm.directmsgid
            AND m.msg_id = dmm.msgid`;
  const q = {text: s, values: [id]};
  const result = await pool.query(q);

  const listOfDMs = [];
  for (let i = 0; i < rows.length; i++) {
    const dict = {'id': rows[i].directmsg_id, 'directmsg': rows[i].directmsg, 'workspaceID': rows[i].workspaceid};
    const msgList = [];
    for (let j = 0; j < result.rows.length; j++) {
      if (rows[i].directmsg_id === result.rows[j].directmsg_id) {
        msgList.push(result.rows[j]['msg']);
      }
    }
    const sortedDict = msgList.sort((a, b) => {
      return new Date(a['date']).getTime() - new Date(b['date']).getTime();
    });
    dict['msg'] = sortedDict;
    listOfDMs.push(dict);
  }

  res.status(200).json(listOfDMs);
};