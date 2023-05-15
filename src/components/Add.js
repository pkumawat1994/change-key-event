import React, { useEffect, useState } from "react";
import "../index.css";
const Add = () => {
  const [name, setName] = useState();
  const [data, setData] = useState([]);

  const focusElement = (id) => {
    // debugger;
    document.getElementById(id).focus();
  };

  const onKeyUp = (e, nextId, prevId, func, type) => {
    if (e.key === "Enter") {
      focusElement(nextId);
    } else if (e.key === "Escape") {
      if (prevId !== "") {
        focusElement(prevId);
      }
    } else if (e.key === "Spacebar" || e.key === " ") {
      if (type === "input") {
        func(e);
      }
    }
  };

  const add = () => {
    setData([...data, name]);
  };

  const handlerChange = (e) => {
    setName(e.target.value);
  };

  window.document.body.keyPress = function (e) {
    if (e.altKey && e.keyCode === 67) {
      alert(e.keyCode);
    }
  };

  useEffect(() => {
    function doc_keyUp(e) {
      //focuc on ADD BUTTON-
      if (e.altKey && e.keyCode === 65) {
        focusElement("myBtn1");
      }
      if (e.altKey && e.keyCode === 81) {
        focusElement("inpt");
      }
      //focus() on EDIT BUTTON-
      if (e.altKey && e.keyCode === 86) {
        focusElement("myBtn2");
      }
      //focus() on DELETE BUTTON-
      if (e.altKey && e.keyCode === 67) {
        focusElement("myBtn3");
      }
    }

    // register the handler
    document.addEventListener("keyup", doc_keyUp, false);
  }, []);

  const handleDelete = (id) => {
    alert(id);
    setData(data.filter((item, i) => i !== id));
  };
  return (
    <>
      <div>Add</div>
      <input
        type="text"
        onChange={(e) => handlerChange(e)}
        onKeyUp={(e) =>
          onKeyUp(
            e,
            "myBtn1",
            data.length > 0 ? `myBtn3-${data.length - 1}` : "inpt",
            null
          )
        }
        // onKeyUp={(e) => onKeyUp(e, "myBtn1", "", null, null)}
        placeholder="Enter Name"
        value={name}
        id="inpt"
      />
      <button
        type="button"
        onKeyUp={(e) => onKeyUp(e, "myBtn2-0", "inpt", add, "input")}
        id="myBtn1"
        className="myBtn1"
      >
        Add Name
      </button>

      <h1>{name}</h1>
      <hr />

      <table id="table">
        <tr id="table-row">
          <th>name</th>
          <th>Action</th>
        </tr>
        {data && data.length > 0 ? (
          data.map((item, id) => {
            return (
              <>
                <tr>
                  <td id="table-data">{item}</td>
                  <button
                    type="button"
                    onKeyUp={(e) =>
                      onKeyUp(
                        e,
                        `myBtn3-${id}`,
                        id ? `myBtn3-${id - 1}` : "myBtn1",
                        null
                      )
                    }
                    id={`myBtn2-${id}`}
                    className="myBtn2"
                  >
                    edit Name
                  </button>
                  <button
                    type="button"
                    onKeyUp={(e) =>
                      onKeyUp(
                        e,
                        id === data.length - 1 ? "inpt" : `myBtn2-${id + 1}`,
                        `myBtn2-${id}`,
                        null
                        // handleDelete(id)
                      )
                    }
                    // id="myBtn3"
                    className="myBtn3"
                    id={`myBtn3-${id}`}
                  >
                    delete Name
                  </button>
                </tr>
              </>
            );
          })
        ) : (
          <p>No Data in Table</p>
        )}
      </table>
    </>
  );
};

export default Add;
