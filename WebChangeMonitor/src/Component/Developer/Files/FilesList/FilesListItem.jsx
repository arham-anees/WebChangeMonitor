import React from "react";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";

function FilesListItem(props) {
  return (
    <ListItem>
      <div className={classes.listItem}>
        <span style={styles.flex2}>
          <span className={classes.contentVerticalCenter}>
            <span>
              <InsertDriveFileIcon color="primary" />
            </span>
            <span className="d-inline-block">
              <span>{props.file.localName}</span>
              <div style={styles.fileLocalPath}>
                {props.file.localRelativePath}
              </div>
            </span>
          </span>
        </span>
        <span style={styles.flex1}>
          <span className={classes.status}>{props.fileStatus.name}</span>
          <span>
            <Link
              style={styles.link}
              className={
                props.fileStatusId === 2 ? classes.btnCompare : "invisible"
              }
              to={"/files/compare?" + props.file.encodedName}
            >
              Compare
            </Link>
            <Link
              style={styles.link}
              className={classes.btnView}
              to={"/files/content?" + props.file.encodedName}
            >
              View
            </Link>
          </span>
        </span>
      </div>
    </ListItem>
  );
}

export default FilesListItem;

const classes = {
  listItem: "d-flex justify-content-between w-100 align-items-center",
  contentVerticalCenter: "d-flex align-items-center",
  status: "alert alert-info d-inline-block m-0 p-1",
  btnView: "btn btn-sm btn-info ml-1",
  btnCompare: "btn btn-sm btn-primary ml-1",
};

const styles = {
  fileName: {},
  fileLocalPath: {
    fontSize: 10,
  },
  flex2: {
    flex: 1,
  },
  flex1: {
    flex: 1,
    justifyContent: "space-between",
    display: "flex",
  },
};
