import "../Styles/ApplicantViewer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ApplicantViewer(props) {
  return (
    <>
      <tr className="tableRow">
        <td>{props.itemInfo.advertTitle}</td>
        <td>{props.itemInfo.fullName}</td>
        <td>{props.itemInfo.date}</td>
        <td>{props.itemInfo.education}</td>
        <td>{props.itemInfo.skillLevel}</td>
        <td>{props.itemInfo.website}</td>
        <td>
          <FontAwesomeIcon
            icon="fa-solid fa-circle-arrow-down"
            className="arrowDown"
            onClick={() => {
              getFile();
            }}
            title="Download CV"
          />
        </td>
        <td>
          <input
            type="checkbox"
            name="selectCV"
            value={props.itemInfo.id}
            className="selectCV"
          />
        </td>
      </tr>
    </>
  );

  function getFile() {
    let dataObject = {};

    dataObject.cVid = props.itemInfo.cVid;

    fetch(`https://localhost:7171/downloadCVEmployer`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(dataObject),
    })
      .then((r) => r.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = props.itemInfo.fileNameType;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }
}

export default ApplicantViewer;
