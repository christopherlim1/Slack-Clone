import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {WorkspaceContext} from '../Homepage';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Grid from '@material-ui/core/Grid';
// https://material-ui.com/components/drawers/
// https://material-ui.com/components/lists/
// https://material-ui.com/components/grid/
// https://material-ui.com/components/avatars/
// https://material-ui.com/components/material-icons/

import SendText from './SendText';

const monthList = [
  'Jan', 'Feb', 'Mar',
  'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec',
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  posting: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'block',
    fontWeight: 'bold',
  },
  title: {
    flexGrow: 1,
    fontSize: `20px`,
    height: 40,
    fontFamily: 'Verdana',
    color: 'white',
  },
  drawer: {
    width: `100%`,
    flexShrink: 0,
  },
  drawerPaper: {
    width: `100%`,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 0,
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    background: `#4A154B`,
  },
  icons: {
    color: 'white',
  },
}));

const fetchDmFeed = (setDmFeed, dmID) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  if (dmID === '') {
    return;
  }
  fetch(`/v0/dm/${dmID}`, {
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
      setDmFeed(arr);
    })
    .catch((error) => {
      console.log(error);
      setDmFeed([]);
    });
};

/**
 * @return {object} JSX
 */
function DMChat() {
  const classes = useStyles();

  const {value, value2, value6,
    value7, value8} = React.useContext(WorkspaceContext);
  const [workspace] = value2;
  const [workspaceList] = value;
  let wsID = '';
  if (workspace !== undefined) {
    for (let i = 0; i < workspaceList.length; i++) {
      if (workspaceList[i]['name'] === workspace) {
        wsID = workspaceList[i]['id'];
      }
    }
  }
  const [dmDrawerOpen, setdmDrawerOpen] = value6;
  const [dmObj] = value7; // name, id.
  const [dmFeed, setDmFeed] = value8;

  const handleDrawerClose = () => {
    setdmDrawerOpen(false);
  };

  const dmID = dmObj.id;

  React.useEffect(() => {
    fetchDmFeed(setDmFeed, dmID);
  }, [dmID, setDmFeed]);

  const DmMessages = () => {
    const arr = [];
    let dmMessages = [];
    const item = localStorage.getItem('user');
    const user = JSON.parse(item);
    for (let i = 0; i < dmFeed.length; i++) {
      if (dmFeed[i]['workspaceID'] === wsID) {
        if ((dmID === dmFeed[i]['directmsg']['user1'] &&
            user.id === dmFeed[i]['directmsg']['user2']) ||
            (user.id === dmFeed[i]['directmsg']['user1'] &&
            dmID === dmFeed[i]['directmsg']['user2'])) {
          dmMessages = dmFeed[i]['msg'];
        }
      }
    }

    for (let i = 0; i < dmMessages.length; i++) {
      const name = dmMessages[i]['name'];
      const d = new Date(dmMessages[i]['date']);
      let date = '';
      if (d === new Date()) {
        date += `${d.getHours()}:${d.getMinutes()}`;
      } else {
        date += `${monthList[d.getMonth()]} ${d.getDate()} at 
        ${d.getHours()}:${d.getMinutes()}`;
      }
      const content = dmMessages[i]['content'];
      const id = dmMessages[i]['date'];

      const jsx =
        <ListItem
          key={id}
          alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp"/>
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Grid container justifyContent="space-between">
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >{name}</Typography>
                  <Typography
                    className={classes.inline}
                    color="textSecondary"
                    align='right'>{date}
                  </Typography>
                </Grid>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body1"
                  color="textPrimary"
                >{content}</Typography>
              </React.Fragment>
            }
          />
        </ListItem>;
      arr.push(jsx);
    }

    return (
      <List
        className={classes.posting}>
        {arr}
      </List>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={dmDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <KeyboardArrowLeftIcon className={classes.icons}/>
          </IconButton>
          <Typography className={classes.title}>
            {dmObj.name}
          </Typography>
        </div>
        <DmMessages/>
        <SendText/>
      </Drawer>
    </div>
  );
}

export default DMChat;
