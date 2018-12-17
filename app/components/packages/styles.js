/* eslint-disable */

export const listStyles = theme => ({
  root: {
    width: '100%'
  },
  none: {
    display: 'none'
  },
  toolbar: {
    width: '100%'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  tableRow: {
    border: 'none',
    padding: 10,
    lineHeight: '1.4',
    verticalAlign: 'middle',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  tablelist: {
    visibility: 'visible',
    overflowX: 'hidden',
    overflowY: 'auto',
    clear: 'both',
    maxHeight: 850
  },
  table: {
    marginBottom: 0,
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: 0,
    borderCollapse: 'collapse'
  },
  tableCell: {
    fontSize: 14,
    lineHeight: '1.4em',
    padding: '12px 8px',
    verticalAlign: 'middle'
  }
});

export const tableHeaderStyles = () => ({
  tableHeadCell: {
    color: 'inherit',
    fontSize: 14
  },
  tableCell: {
    lineHeight: '1.50',
    padding: '0px 13px',
    verticalAlign: 'middle'
  }
});

export const tableToolbarStyles = theme => ({
  root: {
    width: '100%'
  },
  tableListToolbar: {
    paddingRight: 8
  },
  highlight: {
    color: '#ccc'
  },
  spacer: {
    flex: '1 1 100%'
  },

  header: {
    flex: '0 0 auto'
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    '& > h1': {
      fontSize: 18
    }
  },
  directory: {
    fontSize: 12
  }
});