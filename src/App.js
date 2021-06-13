import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Form,
  FormGroup,
  Button,
  Col,
  Row,
  FormFeedback,
} from "reactstrap";
import { ADD_EDGE, ADD_MODULE, ADD_TAG, REMOVE_ITEM } from "./Redux/Type";
const Initial = { Name: "", type: "" };
const TagIntital = ["Completed", "Ongoing", "blocker"];
const Allmodals = ["Project", "Sides", "Modals", "Task"];

function App() {
  const dispatch = useDispatch();
  const Project = useSelector((state) => state.Flowreducer);
  const [type, settype] = useState("");
  const [error, setError] = useState("");
  const [formData, setformData] = useState(Initial);
  const [Id, setId] = useState("");
  const [tag, settag] = useState("");
  const onElementsRemove = (elementsToRemove) => {
    const Remove = removeElements(elementsToRemove, Project);
    dispatch({
      type: REMOVE_ITEM,
      payload: Remove,
    });
  };
  const onConnect = (connect) => {
    const edge = addEdge(connect, Project);
    dispatch({
      type: ADD_EDGE,
      payload: edge,
    });
  };

  const FormSubmit = (e) => {
    e.preventDefault();
    let InputType = {
      Project: {
        type: "input",
        data: { label: formData.Name },
        style: {
          background: "#5e7cf2",
          color: "#ffffff",
          border: "1px solid #e6f5e4",
          width: 180,
        },
      },
      Sides: {
        data: { label: formData.Name },
        style: {
          background: "#4ecef5",
          color: "#ffffff",
          border: "1px solid #e6f5e4",
          width: 180,
        },
      },
      Modals: {
        data: { label: formData.Name },
        style: {
          background: "#4ef5b2",
          color: "#ffffff",
          border: "1px solid #e6f5e4",
          width: 180,
        },
      },
      Task: { type: "output", data: { label: formData.Name } },
    };
    var sam = {};
    Object.entries(formData).forEach((e) => {
      if (e[1] === "") {
        sam[e[0]] = "Required";
      }
    });
    setError({ ...error, ...sam });
    if (!Object.keys(sam).length) {
      dispatch({
        type: ADD_MODULE,
        payload: {
          id: Date.now().toString(),
          ...InputType[formData.type],
          position: {
            x: Math.floor(Math.random() * 250) + 1,
            y: Math.floor(Math.random() * 250) + 1,
          },
        },
      });
      setformData(Initial);
    } else {
      console.log("NUll");
      return null;
    }
  };
  const TypeChange = (e) => {
    const { name, value } = e.target;
    setError({ ...error, [name]: "" });
    setformData((data) => ({ ...data, [name]: value }));
  };

  const Check = (e, data) => {
    setId(data.id);
  };

  const ChangeTag = (e) => {
    const { value } = e.target;
    settag(value);
  };

  const AddTag = () => {
    const TagType = {
      Completed: {
        background: "#4feb34",
        color: "#ffffff",
        border: "1px solid #e6f5e4",
        width: 180,
      },
      Ongoing: {
        background: "#ffb30f",
        color: "#ffffff",
        border: "1px solid #e6f5e4",
        width: 180,
      },
      blocker: {
        background: "#f55d5d",
        color: "#ffffff",
        border: "1px solid #e6f5e4",
        width: 180,
      },
    };

    dispatch({
      type: ADD_TAG,
      payload: { id: Id, color: TagType[tag] },
    });
    setId("");
  };

  return (
    <div>
      <Row>
        <Col>
          <div style={{ height: 300 }}>
            <ReactFlow
              onElementClick={Check}
              elements={Project}
              onElementsRemove={onElementsRemove}
              onConnect={onConnect}
            >
              <Controls />
              {/* <Background color="#aaa" gap={16} /> */}
            </ReactFlow>
          </div>
        </Col>
        <Col>
          <Form onSubmit={FormSubmit}>
            <FormGroup>
              <Input
                value={formData.Name}
                onChange={TypeChange}
                name="Name"
                type="text"
                placeholder="Type..."
              />
              <FormFeedback
                style={{
                  display: error.Name ? "block" : "none",
                }}
              >
                {error.Name ? error.Name : ""}
              </FormFeedback>
              <Input
                name="type"
                onChange={TypeChange}
                value={formData.type}
                type="select"
              >
                {" "}
                <option value="">select</option>
                {Allmodals.map((A, index) => (
                  <option value={A} key={index}>
                    {" "}
                    {A}
                  </option>
                ))}
              </Input>
              <FormFeedback
                style={{
                  display: error.type ? "block" : "none",
                }}
              >
                {error.type ? error.type : ""}
              </FormFeedback>
            </FormGroup>
            <Button type="submit" color="danger">
              {" "}
              Add{" "}
            </Button>
          </Form>
          {Id && (
            <>
              <Input onChange={ChangeTag} value={tag} type="select">
                <option value="">Select type</option>
                {TagIntital.map((t) => (
                  <option>{t}</option>
                ))}
              </Input>
              <Button disabled={!Id} onClick={AddTag}>
                Add Tag
              </Button>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default App;
