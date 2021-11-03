import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

import {WorkspaceContext} from '../Homepage';

// https://material-ui.com/components/app-bar/
// https://material-ui.com/api/typography/
// https://material-ui.com/components/material-icons/

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
    flexGrow: 1,
    width: `100%`,
    margin: `0`,
    background: `#4A154B`,
    height: `50px`,
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    fontSize: `20px`,
    height: 40,
    fontFamily: 'Verdana',
  },
}));

/**
 * @param {*} setWorkspaceList
 * @param {*} setWorkspace
 */
const fetchWorkspace = (setWorkspaceList, setWorkspace) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch('/v0/workspace', {
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
      setWorkspaceList(arr);
      setWorkspace(arr[0].name);
    })
    .catch((error) => {
      console.log(error);
      setWorkspaceList([]);
      setWorkspace('');
    });
};

/**
 * @return {*}
 */
function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const {value, value2} = React.useContext(WorkspaceContext);
  const [workspaceList, setWorkspaceList] = value;
  const [workspace, setWorkspace] = value2;

  React.useEffect(() => {
    fetchWorkspace(setWorkspaceList, setWorkspace);
  }, [setWorkspaceList, setWorkspace]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setNewWorkspace = (name) => {
    setWorkspace(name);
    setAnchorEl(null);
  };

  const workspaceMenu = () => {
    const arr = [];
    for (let i = 0; i < workspaceList.length; i++) {
      const name = workspaceList[i]['name'];
      const jsx =
        <MenuItem
          key={name}
          onClick={() => setNewWorkspace(name)}
        >
          {name}
        </MenuItem>;
      arr.push(jsx);
    }
    return arr;
  };

  return (
    <div>
      <AppBar
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title} noWrap>
            {workspace}
          </Typography>
          <ArrowDropDownCircleIcon
            className={classes.menuButton}
            onClick={handleMenu}
          >
            <AccountCircle/>
          </ArrowDropDownCircleIcon>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {workspaceMenu()}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuAppBar;
