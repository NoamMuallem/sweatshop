import React, { useState, useEffect } from "react";
import { TamplateI } from "../../../types/interfaces";
import { Image, Button, Modal, Form } from "react-bootstrap";

export interface DesktopViewProps {
  tamplates: { [key: string]: TamplateI };
}

const DesktopView: React.SFC<DesktopViewProps> = (props: DesktopViewProps) => {
  const [show, setShow] = useState<boolean>(false);

  const [name, setName] = useState<string>("");

  const [picture, setPicture] = useState<File | null>(null);
  const [imgData, setImgData] = useState<any | null>(null);

  // const [image, setImage] = useState<File>();

  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onDrop = (files: File[]) => {
    if (files[0]) {
      console.log("picture: ", files);
      setPicture(files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        console.log(typeof reader.result, reader.result);
        setImgData(reader.result!);
      });
      reader.readAsDataURL(files[0]);
    }
  };

  const modal = () => (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>הוספת הדפס</Modal.Title>
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div>
      {/*in case there are no tamplates*/}
      {Object.keys(props.tamplates).length === 0 ? (
        <p>אין כרגע הדפסים במערכת</p>
      ) : (
        <div>
          ההדפסים שלי
          <Button variant="primary" onClick={handleShow}>
            Launch demo modal
          </Button>
          <p>
            {Object.values(props.tamplates).map((value) => (
              <Image
                key={value._id}
                style={{ width: "250px", height: "250px" }}
                src={value.imageURL}
                rounded
              />
            ))}
          </p>
        </div>
      )}
      {modal()}
      min width lower then 800
    </div>
  );
};

export default DesktopView;
