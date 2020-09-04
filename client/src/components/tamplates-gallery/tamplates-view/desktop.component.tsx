import React, { useState } from "react";
import { TamplateI } from "../../../types/interfaces";
import { Image, Button, Modal, Form, Alert } from "react-bootstrap";

export interface DesktopViewProps {
  tamplates: { [key: string]: TamplateI };
  addTamplate: (tamplate: TamplateI, image: File) => void;
}

const DesktopView: React.SFC<DesktopViewProps> = (props: DesktopViewProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [picture, setPicture] = useState<File | null>(null);
  const [imgData, setImgData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // const [image, setImage] = useState<File>();

  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleClose = () => {
    setError(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const onDrop = (files: File[]) => {
    if (files[0]) {
      setPicture(files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result!);
      });
      reader.readAsDataURL(files[0]);
    }
  };

  const onSubmit = () => {
    //construce new tamplate
    const newTamplate: TamplateI = { name };
    //verify uniqu name and that ther is an image
    if (
      Object.values(props.tamplates).some((tamplate) => {
        return tamplate.name == newTamplate.name;
      })
    ) {
      setError("כבר יש הדפס עם השם הזה");
    } else if (!picture) {
      setError("נא לבחור תמונה קודם");
    } else {
      //send new tamplate and close modal
      props.addTamplate(newTamplate, imgData);
      handleClose();
    }
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
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
      ) : (
        <div>
          ההדפסים שלי
          <Button variant="primary" onClick={handleShow}>
            Launch demo modal
          </Button>
          <p>
            {Object.values(props.tamplates).map((value) => {
              return (
                <Image
                  key={value._id}
                  style={{ width: "250px", height: "250px" }}
                  src={value.imageBuffer!.toString()}
                  rounded
                />
              );
            })}
          </p>
        </div>
      )}
      {modal()}
      min width lower then 800
    </div>
  );
};

export default DesktopView;
