import React from "react";
import MuiPagination from "@material-ui/lab/Pagination";
import { withStyles } from "@material-ui/core/styles";
import { animateScroll as scroll } from "react-scroll";

const Pagination = (props) => {
  const { totalPageNum, pageNum, setPageNum, getThisSeasonAnimes } = props;
  const Pagination = withStyles({
    root: {
      display: "inline-block", //中央寄せのためインラインブロックに変更
    },
  })(MuiPagination);
  return (
    <div style={{ textAlign: "center" }}>
      <Pagination
        count={totalPageNum}
        onChange={(e, page) => {
          scroll.scrollToTop({
            delay: 100,
            smooth: false,
          });
          setPageNum(page);
          getThisSeasonAnimes(page);
        }}
        color="secondary"
        page={pageNum}
      />
    </div>
  );
};

export default Pagination;
