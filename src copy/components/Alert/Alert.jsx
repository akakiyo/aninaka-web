import { useAlert } from "react-alert";
import { customConfirm } from "./Confirmation";

const Alert = () => {
  const customAlert = useAlert();
  const confirmJudge = async () => {
    console.log("実行");
    if (await customConfirm("データを削除してもよろしいですか？")) {
      console.log("true");
    } else {
      console.log("false");
    }
  };
  const handleClose = () => {
    console.log("閉じる");
  };
  return (
    <>
      <button onClick={() => alert("処理に失敗しました")}>
        デフォルトのalert
      </button>
      <button
        onClick={() => window.confirm("データを削除してもよろしいですか？")}
      >
        デフォルトのconfirm
      </button>
      <button
        onClick={() =>
          customAlert.error("処理に失敗しました", {
            onOpen: () => {},
            onClose: () => {
              handleClose();
            },
          })
        }
      >
        失敗
      </button>
      <button
        onClick={() =>
          customAlert.success("処理が成功しました", {
            onClose: () => {
              handleClose();
            },
          })
        }
      >
        成功
      </button>
      <button
        onClick={() =>
          customAlert.info("新しい機能が追加されました", {
            onClose: () => {
              handleClose();
            },
          })
        }
      >
        情報
      </button>
      <button onClick={() => confirmJudge()}>確認</button>
    </>
  );
};

export default Alert;
