export default {
  mode: 'GLOBAL',
  directory: null,
  settings: null,
  snackbar: null,
  loading: false,
  settingsOpen: false,
  menuOpen: false,
  snackBarOpen: false,
  drawerOpen: false,
  npmCmd: '',
  messages: [],
  cmdOptions: [],
  packages: {
    isLoading: false,
    total: 0,
    active: null,
    packages: [],
    group: null,
    expanded: false,
    version: '',
    tabIndex: 0,
    defaultActions: [
      {
        text: 'Update',
        color: 'primary',
        iconCls: 'update'
      },
      {
        text: 'Uninstall',
        color: 'default',
        iconCls: 'trash'
      }
    ],
    actions: []
  },
  packageJSON: {
    license: null,
    author: '',
    name: '',
    dependencies: [],
    devDependencies: [],
    optionalDependencies: []
  }
}
