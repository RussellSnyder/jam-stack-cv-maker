import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Layout from '../components/Layout';
import Container from 'react-bootstrap/Container';
import moment from 'moment';

const Heading = (props) => {
  let {address, email, jobDesired, phone, photo, title} = props

  return <Row className="h-100 p-5 mb-4" id="heading">
    <Col xs={3}>
      <Image src={photo.url} alt={photo.alt} fluid="false"/>
    </Col>
    <Col xs={9} className="my-auto">
      <h1 id="name">{title}</h1>
      <h2 id="job-title" className="mb-3">{jobDesired}</h2>
      <h5 id="personal-info" className="subtitle text-muted">{address} &middot; {phone} &middot; {email}</h5>
    </Col>
  </Row>
}

const Education = (props) => {
  let {title, entries} = props;

  return <section className="col-5 text-right" id="education">
    <h2 className="section__title">{title}</h2>
    {entries.map(entry => {
      const {degree, description, endDate, institution, startDate} = entry;

      return <article className='entry'>
        <h5 className="degree">{degree}</h5>
        <p className="summary">{institution} &middot; {moment(startDate).format('YY')}-{endDate ? moment(endDate).format('YY') : 'current'}</p>
        <div className="description text-muted" dangerouslySetInnerHTML={{__html: description}}/>
      </article>
    })}
  </section>
}

const Highlights = (props) => {
  let {title, entries} = props;

  console.log(entries)
  return <section className="col-6" id="highlights">
    <h2 className="section__title">{title}</h2>
    {entries.map(entry => {
      const {highlight, description} = entry;

      return <article className='entry'>
        <h5 className="highlight">{highlight}</h5>
        <div className="description text-muted" dangerouslySetInnerHTML={{__html: description}}/>
      </article>
    })}
  </section>
}


export default class Post extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.pageContext)
  }

  render() {
    const {heading, achievements, education, experience, highlights, otherSections, references} = this.props.pageContext


    return (
      <Layout className="resume">
        <Container fluid>
          <Heading {...heading}/>
        </Container>
        <Container>
          <Row>
            <Education {...education}/>
            <Highlights {...highlights}/>
          </Row>
        </Container>
      </Layout>
    );
  }
}
