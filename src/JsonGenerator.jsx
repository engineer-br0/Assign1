import { useState } from "react";
import Card from "./Card";

const JsonGenerator = () => {
  const [json, setJson] = useState(null);

  function generateRandomJSON() {
    // Generate a random string of fixed length
    function randomString(length = 5) {
      const letters = "abcdefghijklmnopqrstuvwxyz";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
      }
      return result;
    }

    // Generate a random number up to max_value
    function randomNumber(maxValue = 100) {
      return Math.floor(Math.random() * maxValue) + 1;
    }

    // Recursive function to create an element with a minimum depth and width
    function createElement(depth) {
      if (depth === 0) {
        // Base case: return a random string or number
        return Math.random() < 0.5 ? randomString() : randomNumber();
      } else {
        // Decides to create a dictionary with random key-value pairs
        const dictLength = Math.max(Math.floor(Math.random() * width), 2); // Ensure minimum width of 2
        const obj = {};
        for (let i = 0; i < dictLength; i++) {
          obj[randomString()] = createElement(depth - 1);
        }
        return obj;
      }
    }

    // Generate random depth and width for the data structure with a minimum depth of 2
    const depth = Math.max(Math.floor(Math.random() * 10), 2); // Ensure minimum depth of 2
    const width = Math.max(Math.floor(Math.random() * 4), 2); // Ensure minimum width of 2

    // Create a top-level array containing dictionaries
    const listLength = Math.max(Math.floor(Math.random() * width), 2); // Ensure a minimum length of 2 for the outer list
    const randomData = Array.from({ length: listLength }, () =>
      createElement(depth - 1)
    ); // -1 because the outer list adds a level of depth

    // Convert the data to a JSON string
    console.log(randomData);
    console.log(JSON.stringify(randomData, null, 2));
    setJson(JSON.stringify(randomData, null, 2));
    //return JSON.stringify(randomData, null, 2);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "40px",
        }}
      >
        <button
          onClick={generateRandomJSON}
          style={{
            width: "50%",
            margin: "auto",
            backgroundColor: "#3498db",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            border: "none",
          }}
        >
          Generate JSON
        </button>
      </div>

      {json && (
        <div>
          <h1>Generated JSON Cards:</h1>
          {/* <div>{json}</div> */}
          <Card objArray={JSON.parse(json)} />
        </div>
      )}
    </>
  );
};

export default JsonGenerator;
