import React, { useState } from "react";
import { TamplateI } from "../../../types/interfaces";
import { Image, Modal, Button, Form } from "react-bootstrap";

export interface MobileViewProps {
  tamplates: { [key: string]: TamplateI };
}

const MobileView: React.SFC<MobileViewProps> = (props: MobileViewProps) => {
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modal = () => (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>הוספת הדפס</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          autoComplete="off"
          value={name}
          as="input"
          name="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
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
                style={{ width: "200px", height: "300px" }}
                src={value.imageURL}
                rounded
              />
            ))}
          </p>
        </div>
      )}
      min width of 800
      {modal()}
    </div>
  );
};

export default MobileView;
