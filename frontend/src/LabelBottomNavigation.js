import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import ForumTwoToneIcon from '@material-ui/icons/ForumTwoTone';
import AlternateEmailTwoToneIcon
  from '@material-ui/icons/AlternateEmailTwoTone';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';

import {WorkspaceContext} from './Homepage';

// https://material-ui.com/components/material-icons/

const useStyles = makeStyles(() => ({
  bottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 1302,
  },
}));

/**
 * @return {object} JSX
 */
function LabelBottomNavigation() {
  const classes = useStyles();

  const {value3, value6} = React.useContext(WorkspaceContext);
  const [, setMessageDrawerOpen] = value3;
  const [, setdmDrawerOpen] = value6;

  const goToHome = () => {
    setMessageDrawerOpen(false);
    setdmDrawerOpen(false);
  };

  return (
    <BottomNavigation
      className={classes.bottom}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        onClick={goToHome}
        icon={<HomeTwoToneIcon />}
      />
      <BottomNavigationAction
        label="Messages"
        value="messages"
        icon={<ForumTwoToneIcon />}
        disabled={true}
      />
      <BottomNavigationAction
        label="Mentions"
        value="mentions"
        icon={<AlternateEmailTwoToneIcon />}
        disabled={true}
      />
      <BottomNavigationAction
        label="Search"
        value="search"
        icon={<SearchTwoToneIcon />}
        disabled={true}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<PersonOutlineTwoToneIcon />}
        disabled={true}
      />
    </BottomNavigation>
  );
}

export default LabelBottomNavigation;
