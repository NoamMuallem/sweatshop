import React, { useState } from "react";
import { TamplateI } from "../../../types/interfaces";
import { Image, Button, Modal, Form, Alert } from "react-bootstrap";
import TamplateMash from "./tamplate-view";

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

  const handleClose = () => {
    setError(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const onDrop = (files: File[]) => {
    if (files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result!);
      });
      reader.readAsDataURL(files[0]);
    }
  };

  const onSubmit = () => {
    //construce new tamplate
    const newTamplate: TamplateI = { name, ...(_id ? { _id } : {}) };
    //to update tamplate
    if (newTamplate._id) {
      props.update!(newTamplate, imgData);
    } else {
      //new tamplate verify uniqu name and that ther is an image
      if (
        Object.values(props.tamplates).some((tamplate) => {
          return tamplate.name == newTamplate.name;
        })
      ) {
        setError("כבר יש הדפס עם השם הזה");
      } else if (!imgData) {
        setError("נא לבחור תמונה קודם");
      } else {
        //send new tamplate and close modal
        props.addTamplate!(newTamplate, imgData);
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
            onChange={(e: any) => onDrop(e.target.files)}
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
    <div>
      {/*in case there are no tamplates*/}
      {Object.keys(props.tamplates).length === 0 ? (
        //for regular costumers, adding removing and updating templates is not an option
        props.addTamplate ? (
          <Button variant="primary" onClick={handleShow}>
            הוספת הדפס חדש
          </Button>
        ) : null
      ) : (
        <div>
          ההדפסים שלי
          {
            ////for regular costumers, adding removing and updating templates is not an option
            props.addTamplate ? (
              <Button variant="primary" onClick={handleShow}>
                הוספת הדפס חדש
              </Button>
            ) : null
          }
          {Object.values(props.tamplates).map((value) => {
            return (
              <div
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
              </div>
            );
          })}
          ;
        </div>
      )}
      {modal()}
      min width lower then 800
    </div>
  );
};

export default DesktopView;
