import React from "react";
import { Card, CardBody, CardText } from "react-bootstrap";

export const InputElement = ({ titlelabel, place,  val, identificator, names, events }) => {
  return (
    <Card className="bg-warning w-100 mt-4">
      <CardBody className="bg-black rounded">
        <CardText className="text-warning">
          {
            !titlelabel ? 
            "": (
              <label className="form-label text-white mb-1">
            <strong className="text-white">
            {titlelabel}
            </strong>
          </label>
            )
          }
          
          <input
            type="text"
            className="form-control"
            placeholder={place}
            value={val}
            id={identificator}
            name={names}
            onChange={events}
            required
          />
        </CardText>
      </CardBody>
    </Card>
  );
};
