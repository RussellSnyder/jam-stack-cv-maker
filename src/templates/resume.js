import moment from 'moment';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Heading from '../components/Heading';
import Layout from '../components/Layout';
import Middot from '../components/Middot';
import Page from '../components/Page';

const MAX_PAGE_HEIGHT = 1600
const PAGE_ONE_ID = 'page-1';
const PAGE_TWO_ID = 'page-2';


const Education = ({title, entries}) => <section className="section text-right mb-0" id="education">
  <h2 className="section__title">{title}</h2>
  {entries.map(entry => {
    let {degree, description, endDate, institution, startDate} = entry;

    startDate = moment(startDate).format('YYYY')
    endDate = moment(endDate).format('YYYY')
    const isSameYear = startDate === endDate
    endDate = !endDate ? "-current" : endDate && isSameYear ? "" : `-${endDate}`

    return <article className='entry' key={degree}>
      <h5 className="entry__title">{degree}</h5>
      <p
        className="entry__summary">{institution}<Middot/>{startDate}{endDate}
      </p>
      <div className="entry__description" dangerouslySetInnerHTML={{__html: description}}/>
    </article>
  })}
</section>

const Experience = ({title, entries}) => <section className="section" id="experience">
  <h2 className="section__title">{title}</h2>
  {entries.map(entry => {
    const {title, subtitle, description, dateStart, dateEnd, techStack} = entry;

    return <article className='entry' key={title}>
      <h5 className="entry__title">{title}</h5>
      <p className="entry__summary mb-1">
        <b>{subtitle}</b><Middot/>
        {moment(dateStart).format('MMM YYYY')}-{dateEnd ? moment(dateEnd).format('MMM YYYY') : 'current'}
      </p>
      <div className="entry__description" dangerouslySetInnerHTML={{__html: description}}/>
      <div className="tech-stack"><b>Techstack:</b>
        <span className="ml-2 tech">{techStack.join(", ")}</span>
      </div>
    </article>
  })}
</section>

const PublicSpeakingEvents = ({title, entries, id}) => <section id={id} className="section">
  <h2 className="section__title">{title}</h2>
  {entries.map(entry => {
    const {key, value} = entry;

    return <article className='entry' key={key}>
      <h5 className="entry__title">{key}</h5>
      <div className="entry__description" dangerouslySetInnerHTML={{__html: value}}/>
    </article>
  })}
</section>

const OpenSourceProjects = ({title, entries, id}) => <section id={id} className="section">
  <h2 className="section__title">{title}</h2>
  {entries.map(entry => {
    const {key, value} = entry;

    return <article className='entry' key={key}>
      <h5 className="entry__title">{key}</h5>
      <div className="entry__description" dangerouslySetInnerHTML={{__html: value}}/>
    </article>
  })}
</section>


const GenericSection = ({title, entries, id, center}) => {

  return <section className={`section section-generic mb-2 ${center ? "text-center" : ""}`} id={id}>
    <h2 className="section__title">{title}</h2>
    {entries.map(entry => {
      const {key, value} = entry;

      return <Row className='entry' key={key}>
        <Col xs={12}>
          <b className="entry__key">{key}:</b>
          <span className="entry__value" dangerouslySetInnerHTML={{__html: value}}/>
        </Col>
      </Row>
    })}
  </section>
}

const OtherInterests = ({title, entries, id}) => <section className="section mb-5" id={id}>
  <h2 className="section__title mb-2">{title}</h2>
  {entries.map(entry => {
    const {key, value} = entry;

    return <Row key={key} className="entry">
      <Col xs={12}>
        <b className="entry__key">{key}:</b>
        <span className="entry__value" dangerouslySetInnerHTML={{__html: value}}/>
      </Col>
    </Row>
  })}
</section>

const TechSection = ({title, entries, id}) => <section className="section section-generic mb-2" id={id}>
  <h2 className="section__title">{title}</h2>
  {entries.map(entry => {
    const {key, value} = entry;

    return <Row key={key} className="mb-1">
      <Col xs={12}>
        <b className="entry__key">{key.toUpperCase()}:</b>
        <span className="entry__value" dangerouslySetInnerHTML={{__html: value}}/>
      </Col>
    </Row>
  })}
</section>

const References = ({title, referenceSection}) => <section id="references" className="section">
  <h2 className="section__title">{title}</h2>
  <article className="references" dangerouslySetInnerHTML={{__html: referenceSection}}/>
</section>

const Recommendation = ({recommender, jobTitle, date, excerpt, recommendation }) => (
  <article className='entry'>
    <h5 className="entry__title">{recommender}</h5>
    <p className="entry__summary mb-1">
      <b>{jobTitle}</b><Middot/>
      {moment(date).format('MMM YYYY')}
    </p>
    <div className="entry__description" >
        <strong className="mr-2">Excerpt:</strong>
        <span>"{excerpt}"</span>
        <a className="float-right d-print-none" href={recommendation}>Read Full</a>
    </div>
  </article>
)

const Recomendations = ({title, recommendations}) => <section id="references" className="section">
  <h2 className="section__title">{title}</h2>
  {recommendations.map(recommendation => <Recommendation key={recommendation.recommender} {...recommendation} />)}
</section>


export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const pageOne = document.getElementById(PAGE_ONE_ID);
    // const pageOneHeight = pageOne.clientHeight;
    // if (pageOneHeight && pageOneHeight > MAX_PAGE_HEIGHT) {
    //   console.error(`Page 1 is ${pageOneHeight - MAX_PAGE_HEIGHT}px too tall!`)
    // } else {
    //   const printSpacer = document.getElementById("print-spacer");
    //   printSpacer.style.paddingBottom = `${MAX_PAGE_HEIGHT - pageOneHeight}px`;
    // }
    //
    // const pageTwoHeight = document.getElementById(PAGE_TWO_ID).clientHeight;
    // if (pageTwoHeight && pageTwoHeight > MAX_PAGE_HEIGHT) {
    //   console.error(`Page 2 is ${pageTwoHeight - MAX_PAGE_HEIGHT}px too tall!`)
    // }
  }

  render() {

    const {heading, education, experience, publicSpeakingEvents, openSourceProjects, otherSections, references, recommendations} = this.props.pageContext

    const otherInterests = otherSections.find(section => section.id === 'otherInterests')
    console.log({otherInterests});
    const technologies = otherSections.find(section => section.id === 'technologies')
    const spokenLanguages = otherSections.find(section => section.id === 'spokenLanguages')
    const socialMedia = otherSections.find(section => section.id === 'socialMedia')

    return (
      <Layout className="resume">
        <Page id={PAGE_ONE_ID}>
          <Container fluid>
            <Heading {...heading}/>
          </Container>
          <Container fluid className="px-5">
            <Row className="mb-4">
              <Col xs={5}>
                <Education {...education}/>
              </Col>
              <Col xs={7} className="border-left">
                <TechSection {...technologies}/>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Experience {...experience}/>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Recomendations { ...recommendations } />
              </Col>
            </Row>
          </Container>
        </Page>
        {/* <div id="print-spacer" className="d-print-block d-none"/> */}
        <Page id={PAGE_TWO_ID}>
          <Container fluid className="px-5">
            {/*<Row className="mb-4 justify-content-center">*/}
            {/*  <Col xs>*/}
            {/*    <PublicSpeakingEvents {...publicSpeakingEvents} id="publicSpeakingEvents"/>*/}
            {/*  </Col>*/}
            {/*</Row>*/}
            {/*<Row className="mb-4 justify-content-center">*/}
            {/*  <Col xs>*/}
            {/*    <OpenSourceProjects {...openSourceProjects} id="openSourceProjects"/>*/}
            {/*  </Col>*/}
            {/*</Row>*/}
            <Row>
              <Col xs={4}>
                <GenericSection {...spokenLanguages}/>
              </Col>
              <Col xs={8}>
                <OtherInterests {...otherInterests}/>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <References {...references} />
              </Col>
              <Col xs={8}>
                <GenericSection {...socialMedia}/>
              </Col>
            </Row>
          </Container>
        </Page>
      </Layout>
    );
  }
}
