import React from 'react';
import {createContext} from 'react';
import List from '@material-ui/core/List';
import {makeStyles} from '@material-ui/core/styles';
import MenuAppBar from './Homepage/MenuAppBar';
import Channels from './Homepage/Channels';
import ChannelFeed from './Homepage/ChannelFeed';
import DirectMessages from './Homepage/DirectMessages';
import DMChat from './Homepage/DMChat';
import LabelBottomNavigation from './LabelBottomNavigation';

export const WorkspaceContext = createContext();

// https://material-ui.com/components/lists/
// https://material-ui.com/components/material-icons/

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
  },
  list: {
    position: 'fixed',
    marginTop: 50,
    width: `100%`,
    backgroundColor: theme.palette.background.paper,
  },
}));

/**
 * @return {object} JSX
 */
function Homepage() {
  const classes = useStyles();
  const [workspaceList, setWorkspaceList] = React.useState([]);
  const [workspace, setWorkspace] = React.useState('');
  const [messageDrawerOpen, setMessageDrawerOpen] = React.useState(false);
  const [channelObj, setChannelObj] = React.useState({
    id: '',
    name: '',
  });
  const [channelFeed, setChannelFeed] = React.useState([]);
  const [dmDrawerOpen, setdmDrawerOpen] = React.useState(false);
  const [dmObj, setDmObj] = React.useState({
    id: '',
    name: '',
  });
  const [dmFeed, setDmFeed] = React.useState([]);

  // https://stackoverflow.com/questions/57840535/passing-multiple-value-and-setter-pairs-to-context-provider-in-react
  return (
    <div className={classes.root}>
      <WorkspaceContext.Provider
        value={{value: [workspaceList, setWorkspaceList],
          value2: [workspace, setWorkspace],
          value3: [messageDrawerOpen, setMessageDrawerOpen],
          value4: [channelObj, setChannelObj],
          value5: [channelFeed, setChannelFeed],
          value6: [dmDrawerOpen, setdmDrawerOpen],
          value7: [dmObj, setDmObj],
          value8: [dmFeed, setDmFeed],
        }}
      >
        <MenuAppBar/>
        <List
          className={classes.list}
          component="nav"
          aria-labelledby="nested-list-subheader">
          <Channels/>
          <DirectMessages/>
        </List>
        <ChannelFeed/>
        <DMChat/>
        <LabelBottomNavigation/>
      </WorkspaceContext.Provider>
    </div>
  );
}

export default Homepage;
