import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Middot from './Middot';

export default ({address, email, jobDesired, phone, photo, title}) => <Row
  className="h-100 p-3 mb-4" id="heading">
  <Col xs={3}>
    <Image src={photo.url} alt={photo.alt} fluid="false"/>
  </Col>
  <Col xs={9} className="my-auto">
    <h1 id="name">{title}</h1>
    <h4 id="job-title" className="mb-3 text-uppercase">{jobDesired}</h4>
    <h6 id="personal-info" className="subtitle">{address}<Middot/>{phone}<Middot/>{email}</h6>
  </Col>
</Row>
