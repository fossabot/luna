/**
 * AppLayout
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import theme from 'styles/theme';

import AppSidebar from 'containers/AppSidebar';
import AppHeader from 'containers/AppHeader';
import SnackbarContent from 'components/common/SnackbarContent';

import { Packages } from 'components/views/packages';
import { Notifications } from 'components/views/notifications';
import { Audit } from 'components/views/audit';
import { Doctor } from 'components/views/doctor';
import { setSnackbar } from 'models/ui/actions';
import { switchcase, shrinkDirectory } from 'commons/utils';
import { drawerWidth } from 'styles/variables';

import styles from './styles/appLayout';

const mapState = ({
  npm: { auditData, doctorData },
  notifications: { notifications },
  common: { mode, directory, onlineStatus },
  ui: {
    activePage,
    loaders: {
      loader: { loading }
    },
    dialog,
    snackbar
  },
  packages: {
    project: { name, version, description },
    metadata: { lastUpdatedAt }
  }
}) => ({
  auditData,
  doctorData,
  dialog,
  onlineStatus,
  lastUpdatedAt,
  activePage,
  mode,
  directory,
  name,
  version,
  loading,
  description,
  notifications,
  snackbar
});

const AppLayout = ({ classes }) => {
  const [drawerOpen, toggleDrawer] = useState(false);
  const {
    activePage,
    snackbar,
    mode,
    auditData,
    doctorData,
    directory,
    onlineStatus
  } = useMappedState(mapState);

  const dispatch = useDispatch();

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <AppSidebar
            mode={mode}
            fullDirectory={directory}
            directory={directory && shrinkDirectory(directory)}
            PaperProps={{ style: { width: drawerWidth } }}
          />
        </nav>
        <div className={classes.appContent}>
          <AppHeader onDrawerToggle={() => toggleDrawer(!drawerOpen)} />
          <main className={classes.mainContent}>
            {switchcase({
              packages: () => <Packages />,
              problems: () => (
                <Notifications mode={mode} directory={directory} />
              ),
              audit: () => (
                <Audit mode={mode} directory={directory} data={auditData} />
              ),
              doctor: () => (
                <Doctor mode={mode} directory={directory} data={doctorData} />
              )
            })(<Packages />)(activePage)}
          </main>
        </div>
        {snackbar && snackbar.open && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            open={snackbar.open}
            autoHideDuration={onlineStatus === 'online' ? 55000 : 999999}
            onClose={() =>
              dispatch(
                setSnackbar({
                  open: false,
                  message: null,
                  type: 'info'
                })
              )
            }
            ClickAwayListenerProps={{
              onClickAway: () =>
                dispatch(
                  setSnackbar({
                    open: false,
                    message: null,
                    type: 'info'
                  })
                )
            }}
          >
            <SnackbarContent
              variant={snackbar.type}
              message={snackbar.message}
              onClose={() =>
                dispatch(
                  setSnackbar({
                    open: false,
                    message: null,
                    type: 'info'
                  })
                )
              }
            />
          </Snackbar>
        )}
      </div>
    </MuiThemeProvider>
  );
};

AppLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(AppLayout);
