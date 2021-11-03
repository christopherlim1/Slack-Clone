import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import BlurOnOutlinedIcon from '@material-ui/icons/BlurOnOutlined';

import {WorkspaceContext} from '../Homepage';

// https://material-ui.com/components/lists/
// https://material-ui.com/components/material-icons/

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const fetchChannels = (setChannelList, workspaceID) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  if (workspaceID === undefined) {
    return;
  }
  fetch(`/v0/channel/${workspaceID}`, {
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
      setChannelList(arr);
    })
    .catch((error) => {
      console.log(error);
      setChannelList([]);
    });
};

/**
 * @return {object} JSX
 */
function Channels() {
  const classes = useStyles();

  const {value, value2, value3, value4} = React.useContext(WorkspaceContext);
  const [workspaceList] = value;
  const [workspace] = value2;
  const [, setMessageDrawerOpen] = value3;
  const [, setChannelObj] = value4;

  const [channelList, setChannelList] = React.useState([]);
  const [channelOpen, setChannelOpen] = React.useState(true);

  const toggleOpenChannels = () => {
    setChannelOpen(!channelOpen);
  };

  const workspaceID = () => {
    for (let i = 0; i < workspaceList.length; i++) {
      if (workspace === workspaceList[i].name) {
        return workspaceList[i].id;
      }
    }
  };

  const wsID = workspaceID();

  React.useEffect(() => {
    fetchChannels(setChannelList, wsID);
  }, [wsID]);

  const openMessages = (id) => {
    setMessageDrawerOpen(true);
  };

  const changeChannelObj = (chObj) => {
    setChannelObj(chObj);
  };

  const displayChannels = () => {
    const arr = [];
    for (let i = 0; i < channelList.length; i++) {
      const name = channelList[i]['name'];
      const jsx =
        <ListItem
          onClick={() => {
            openMessages(channelList[i]['id']);
            changeChannelObj(channelList[i]);
          }}
          key={name}
          button
          className={classes.nested}>
          <ListItemIcon>
            <BlurOnOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItem>;
      arr.push(jsx);
    }
    return arr;
  };

  // https://material-ui.com/components/lists/
  return (
    <div>
      <ListItem
        key={'channels'}
        button
        onClick={toggleOpenChannels}>
        {channelOpen ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary="Channels" />
      </ListItem>
      <Collapse in={channelOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {displayChannels()}
        </List>
      </Collapse>
    </div>
  );
}

export default Channels;
