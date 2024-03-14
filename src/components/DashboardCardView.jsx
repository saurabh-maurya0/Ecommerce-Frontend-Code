import React from "react";
import { Card, Col } from "react-bootstrap";

const DashboardCardView = ({ icon, number, text }) => {
  return (
    <Col className="mt-3 " md={6}>
      <Card className="border border-0 shadow rounded">
        <Card.Body className="text-center">
          {icon}

          <h3 className="mt-3">({number})</h3>
          <h3 className="text-muted mt-3">{text}</h3>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DashboardCardView;
