import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Layout from '../components/Layout';
import Container from 'react-bootstrap/Container';
import moment from 'moment';
import slugify from 'slugify';

const Heading = (props) => {
  let {address, email, jobDesired, phone, photo, title} = props

  return <Row className="h-100 p-3 mb-4" id="heading">
    <Col xs={3}>
      <Image src={photo.url} alt={photo.alt} fluid="false"/>
    </Col>
    <Col xs={9} className="my-auto">
      <h1 id="name">{title}</h1>
      <h2 id="job-title" className="mb-3">{jobDesired}</h2>
      <h5 id="personal-info" className="subtitle">{address}<Middot/>{phone}<Middot/>{email}</h5>
    </Col>
  </Row>
}

const Education = (props) => {
  let {title, entries} = props;

  return <section className="text-right" id="education">
    <h2 className="section__title">{title}</h2>
    {entries.map(entry => {
      const {degree, description, endDate, institution, startDate} = entry;

      return <article className='entry' key={degree}>
        <h5 className="entry__title mb-0">{degree}</h5>
        <p
          className="entry__summary">{institution}<Middot/>{moment(startDate).format('YY')}-{endDate ? moment(endDate).format('YY') : 'current'}</p>
        <div className="entry__description" dangerouslySetInnerHTML={{__html: description}}/>
      </article>
    })}
  </section>
}

const Highlights = (props) => {
  let {title, entries} = props;

  return <section className="section" id="highlights">
    <h2 className="section__title">{title}</h2>
    {entries.map(entry => {
      const {highlight, description} = entry;

      return <article className='entry' key={highlight}>
        <h5 className="entry__title mb-0">{highlight}</h5>
        <div className="entry__description" dangerouslySetInnerHTML={{__html: description}}/>
      </article>
    })}
  </section>
}

const Middot = () => <i className="fas fa-circle middot mx-1"/>

const Experience = (props) => {
  let {title, entries} = props;

  return <section className="section" id="experience">
    <h2 className="section__title">{title}</h2>
    {entries.map(entry => {
      const {title, subtitle, description, dateStart, dateEnd} = entry;

      return <article className='entry mb-2' key={title}>
        <h3 className="entry__title m-0">{title}</h3>
        <p className="entry__summary m-0">
          {subtitle}<Middot/>
          {moment(dateStart).format('MMM YYYY')}-{dateEnd ? moment(dateEnd).format('MMM YYYY') : 'current'}
        </p>
        <div className="entry__description" dangerouslySetInnerHTML={{__html: description}}/>
      </article>
    })}
  </section>
}

const Achievements = (props) => {
  let {title, entries, id} = props;

  return <section id={id}>
    <h2 className="section__title">{title}</h2>
    {entries.map(entry => {
      const {key, value} = entry;

      return <article className='entry mb-2' key={key}>
        <h3 className="entry__title m-0">{key}</h3>
        <div className="entry__description" dangerouslySetInnerHTML={{__html: value}}/>
      </article>
    })}
  </section>
}

const GenericSection = (props) => {
  let {title, entries, id} = props;

  return <section className="section section-generic mb-2" id={id}>
    <h2 className="section__title text-center">{title}</h2>
    {entries.map(entry => {
      const {key, value} = entry;

      return <article className='row' key={key}>
        <Col xs={4} className="text-right pr-0"><b>{key}</b></Col>
        <Col xs={8} className="pl-2" dangerouslySetInnerHTML={{__html: value}}/>
      </article>
    })}
  </section>
}

const References = (props) => {
  let {title, referenceSection} = props;
  return <section id="references">
    <h2 className="section__title">{title}</h2>
      <article className="references" dangerouslySetInnerHTML={{__html: referenceSection}}/>
  </section>
}


export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {heading, achievements, education, experience, highlights, otherSections, references} = this.props.pageContext

    const otherInterests = otherSections.find(section => section.id === "otherInterests")
    const technologies = otherSections.find(section => section.id === "technologies")
    const spokenLanguages = otherSections.find(section => section.id === "spokenLanguages")

    return (
      <Layout className="resume">
        <Container fluid>
          <Heading {...heading}/>
        </Container>
        <Container fluid className="px-5 mb-5 pb-5">
          <Row className="mb-4">
            <Col xs={6}>
              <Education {...education}/>
            </Col>
            <Col xs={6} className="border-left">
              <Highlights {...highlights}/>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Experience {...experience}/>
            </Col>
          </Row>
        </Container>
        <Container fluid className="px-5 mt-5 mb-5 pb-5">
          <Row className="mb-4 justify-content-center">
            <Col>
              <Achievements {...achievements} id="achievements"/>
            </Col>
          </Row>
          <Row>
            <Col xs={7}>
              <GenericSection { ...technologies }/>
            </Col>
            <Col xs={5}>
              <GenericSection { ...spokenLanguages }/>
              <GenericSection { ...otherInterests }/>
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            <Col xs={4} offset={4}>
              <References { ...references } />
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}
