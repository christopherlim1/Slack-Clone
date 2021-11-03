import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

import {WorkspaceContext} from '../Homepage';

// https://material-ui.com/components/avatars/
const ActiveBadge = withStyles((theme) => ({
  'badge': {
    'background-color': 'lightgreen',
    'color': 'lightgreen',
    'boxShadow': `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const AwayBadge = withStyles((theme) => ({
  'badge': {
    'background-color': 'red',
    'color': 'red',
    'boxShadow': `0 0 0 2px ${theme.palette.background.paper}`,
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  status: {
    'display': 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const fetchUsers = (setUserList, workspaceID) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  if (workspaceID === undefined) {
    return;
  }
  fetch(`/v0/user/${workspaceID}`, {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((arr) => {
      setUserList(arr);
    })
    .catch((error) => {
      console.log(error);
      setUserList([]);
    });
};

/**
 * @return {object} JSX
 */
function DirectMessages() {
  const classes = useStyles();

  const {value, value2, value6, value7} = React.useContext(WorkspaceContext);
  const [workspaceList] = value;
  const [workspace] = value2;
  const [, setdmDrawerOpen] = value6;
  const [, setDmObj] = value7;

  const [msgOpen, setMsgOpen] = React.useState(true);
  const [userList, setUserList] = React.useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  const toggleOpenMsg = () => {
    setMsgOpen(!msgOpen);
  };

  const workspaceID = () => {
    for (let i = 0; i < workspaceList.length; i++) {
      if (workspace === workspaceList[i].name) {
        return workspaceList[i].id;
      }
    }
  };

  const openDms = (id) => {
    setdmDrawerOpen(true);
  };

  const changeDmObj = (dmObj) => {
    setDmObj(dmObj);
  };

  const wsID = workspaceID();

  React.useEffect(() => {
    fetchUsers(setUserList, wsID);
  }, [wsID]);

  const displayStatus = (status) => {
    let jsx;
    if (status === 'Away') {
      jsx =
        <AwayBadge
          className={classes.status}
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar className={classes.avatar} alt="Remy Sharp"/>
        </AwayBadge>;
    } else {
      jsx =
        <ActiveBadge
          className={classes.status}
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar className={classes.avatar} alt="Remy Sharp"/>
        </ActiveBadge>;
    }
    return jsx;
  };

  const displayUsers = () => {
    const arr = [];
    for (let i = 0; i < userList.length; i++) {
      const name = userList[i]['name'];
      let status = userList[i]['status'];
      if (user.id === userList[i]['id']) {
        status = 'Active';
      }
      const jsx =
        <ListItem
          onClick={() => {
            openDms(userList[i]['id']);
            changeDmObj(userList[i]);
          }}
          key={name}
          button
          className={classes.nested}>
          <ListItemIcon>
            {displayStatus(status)}
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>;
      arr.push(jsx);
    }
    return arr;
  };

  return (
    <div>
      <ListItem
        key={'directMessages'}
        button
        onClick={toggleOpenMsg}>
        {msgOpen ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary="Direct Messages" />
      </ListItem>
      <Collapse in={msgOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {displayUsers()}
        </List>
      </Collapse>
    </div>
  );
}

export default DirectMessages;
