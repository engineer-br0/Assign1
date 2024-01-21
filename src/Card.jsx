const Card = ({ objArray }) => {
  //const obj = JSON.parse(json);
  console.log(objArray);
  const handleCopyToClipboard = () => {
    const textarea = document.createElement("textarea");
    textarea.value = JSON.stringify(objArray, null, 2);
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");

    document.body.removeChild(textarea);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(objArray, null, 2)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "generated.json";

    link.click();

    URL.revokeObjectURL(link.href);
  };

  const renderObjects = (obj) => {
    //console.log(typeof obj);

    if (typeof obj === "object") {
      return (
        <div>
          {Object.keys(obj).map((key) => {
            return (
              <>
                <div
                  style={{
                    marginLeft: 30,
                    paddingLeft: "5px",
                    borderLeft: "1px solid black",
                  }}
                >
                  <h4>{key}</h4>
                  {/* <p>{obj[key]}</p> */}
                  {/* {renderObjects(obj.key)} */}
                  {renderObjects(obj[key])}
                </div>
              </>
            );
          })}
        </div>
      );
    } else {
      return <p>{obj}</p>;
    }
  };

  return (
    <>
      {/* <h3>Card</h3> */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {objArray.map((obj, key) => {
          return (
            <div
              style={{
                minWidth: "40%",
                backgroundColor: "LightGray",
                border: "2px solid black",
                margin: 10,
                padding: 20,
                position: "relative",
              }}
            >
              <h4>{key}</h4>
              {renderObjects(obj)}
              <button
                onClick={handleCopyToClipboard}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  cursor: "pointer",
                }}
              >
                Copy to Clipboard
              </button>

              <button
                onClick={handleDownloadJson}
                style={{
                  position: "absolute",
                  top: 23,
                  right: 0,
                  cursor: "pointer",
                }}
              >
                Download JSON
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card;
