import React, { useState, useEffect } from "react";
import { TamplateI } from "../../../types/interfaces";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import TamplateMash from "./tamplate-view";
import Compress from "compress.js";

export interface DesktopViewProps {
  tamplates: { [key: string]: TamplateI };
  addTamplate?: (tamplate: TamplateI, image: File) => void;
  update?: (tamplate: TamplateI, image: File) => void;
}

const DesktopView: React.SFC<DesktopViewProps> = (props: DesktopViewProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [_id, set_id] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [imgData, setImgData] = useState<any | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [tamplates, setTamplates] = useState<{ [key: string]: TamplateI }>({
    ...props.tamplates,
  });

  useEffect(() => {
    console.log("in useEffect, got from props: ", props.tamplates);
    setTamplates({ ...props.tamplates });
  }, [props.tamplates]);

  const handleClose = () => {
    setError(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const onDrop = async (files: File[]) => {
    if (files[0]) {
      const compress = new Compress();

      await compress
        .compress([files[files.length - 1]], {
          size: 0.09, // the max size in MB, defaults to 2MB
          quality: 1, // the quality of the image, max is 1,
          maxWidth: 250, // the max width of the output image, defaults to 1920px
          maxHeight: 300, // the max height of the output image, defaults to 1920px
          resize: true, // defaults to true, set false if you do not want to resize the image width and height
        })
        .then((data) => {
          const file = Compress.convertBase64ToFile(data[0].data, data[0].ext);
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setImgData(reader.result!);
          });
          reader.readAsDataURL(file);
        });
    }
  };

  const flushForm = () => {
    set_id("");
    setName("");
    setImgData(undefined);
    setError(null);
  };

  const onSubmit = () => {
    //construce new tamplate
    const newTamplate: TamplateI = { name, ...(_id ? { _id } : {}) };
    //to update tamplate
    if (newTamplate._id) {
      props.update!(newTamplate, imgData);
      flushForm();
    } else {
      //new tamplate verify uniqu name and that ther is an image
      if (
        Object.values(tamplates).some((tamplate) => {
          return tamplate.name == newTamplate.name;
        })
      ) {
        setError("כבר יש הדפס עם השם הזה");
      } else if (!imgData) {
        setError("נא לבחור תמונה קודם");
      } else {
        //send new tamplate and close modal
        props.addTamplate!(newTamplate, imgData);
        flushForm();
      }
    }
    handleClose();
  };

  const modal = () => (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>הוספת הדפס</Modal.Title>
        {error ? <Alert>{error}</Alert> : null}
      </Modal.Header>
      <Modal.Body>
        <h5>שם ההדפס</h5>
        <Form.Control
          autoComplete="off"
          value={name}
          as="input"
          name="name"
          type="text"
          onChange={(e: any) => setName(e.target.value)}
        />
        <Form.File>
          <Form.File.Label>תמונת ההדפב</Form.File.Label>
          <Form.File.Input
            type="file"
            accept="image/png"
            onChange={async (e: any) => onDrop(e.target.files)}
          />
        </Form.File>
        {imgData ? (
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <img width="250" height="250" src={imgData} alt="" />
          </span>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => onSubmit()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div
      style={{
        margin: "auto",
        padding: "0px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <p style={{ margin: "auto", fontSize: "8rem", marginBottom: "1rem" }}>
        ההדפסים שלי
      </p>
      {/* for regular costumers, adding removing and updating templates is not an option */}
      {props.addTamplate ? (
        <Button
          variant="primary"
          style={{ margin: "auto" }}
          onClick={handleShow}
        >
          הוספת הדפס חדש
        </Button>
      ) : null}
      {/*in case there are no tamplates*/}
      {Object.keys(tamplates).length > 0 ? (
        <div
          style={{
            margin: "auto",
            padding: "0px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              margin: "auto",
              display: "flex",
              flexDirection: "row",
              width: "80%",
              flexWrap: "wrap",
            }}
          >
            {Object.values(tamplates).map((value) => {
              return (
                <div
                  style={{
                    width: "fit-content",
                    height: "fit-content",
                    margin: "0.5rem",
                    borderRadius: "2.725rem",
                  }}
                  key={value._id!}
                  onClick={
                    //if admin give update option
                    props.update
                      ? () => {
                          //set old tamplate data in state
                          set_id(value._id!);
                          setName(value.name);
                          setImgData(value.imageBuffer!.toString());
                          handleShow();
                        }
                      : undefined
                  }
                >
                  <TamplateMash imageBuffer={value.imageBuffer!.toString()} />
                  <p>{value.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p style={{ margin: "auto" }}>אין הדפסים כרגע במערכת</p>
      )}
      {modal()}
      min width lower then 800
    </div>
  );
};

export default DesktopView;
