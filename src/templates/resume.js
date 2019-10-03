import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import moment from 'moment';
import Heading from '../components/Heading';
import Page from '../components/Page';
import Middot from '../components/Middot';
import striptags from 'striptags';
import Layout from '../components/Layout';

const MAX_PAGE_HEIGHT = 1600
const PAGE_ONE_ID = 'page-1';
const PAGE_TWO_ID = 'page-2';


const Education = ({title, entries}) => <section className="section text-right" id="education">
  <h2 className="section__title">{title}</h2>
  {entries.map(entry => {
    const {degree, description, endDate, institution, startDate} = entry;

    return <article className='entry' key={degree}>
      <h5 className="entry__title">{degree}</h5>
      <p
        className="entry__summary">{institution}<Middot/>{moment(startDate).format('YY')}-{endDate ? moment(endDate).format('YY') : 'current'}
      </p>
      <div className="entry__description" dangerouslySetInnerHTML={{__html: description}}/>
    </article>
  })}
</section>

const Experience = ({title, entries}) => <section className="section" id="experience">
  <h2 className="section__title">{title}</h2>
  {entries.map(entry => {
    const {title, subtitle, description, dateStart, dateEnd} = entry;

    return <article className='entry' key={title}>
      <h5 className="entry__title">{title}</h5>
      <p className="entry__summary mb-1">
        <b>{subtitle}</b><Middot/>
        {moment(dateStart).format('MMM YYYY')}-{dateEnd ? moment(dateEnd).format('MMM YYYY') : 'current'}
      </p>
      <div className="entry__description" dangerouslySetInnerHTML={{__html: description}}/>
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


const GenericSection = ({title, entries, id}) => <section className="section section-generic mb-2" id={id}>
  <h2 className="section__title text-center">{title}</h2>
  {entries.map(entry => {
    const {key, value} = entry;

    return <article className='row' key={key}>
      <Col xs={4} className="text-right pr-0"><b>{key}</b></Col>
      <Col xs={8} className="pl-2" dangerouslySetInnerHTML={{__html: value}}/>
    </article>
  })}
</section>

const TechSection = ({title, entries, id}) => <section className="section section-generic mb-2" id={id}>
  <h2 className="section__title">{title}</h2>
  {entries.map(entry => {
    const {key, value} = entry;

    return <article key={key}>
      <b className="text-uppercase">{key}</b>: {striptags(value)}
    </article>
  })}
</section>

const References = ({title, referenceSection}) => <section id="references" className="section">
  <h2 className="section__title">{title}</h2>
  <article className="references" dangerouslySetInnerHTML={{__html: referenceSection}}/>
</section>


export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const pageOne = document.getElementById(PAGE_ONE_ID);
    const pageOneHeight = pageOne.clientHeight;
    if (pageOneHeight && pageOneHeight > MAX_PAGE_HEIGHT) {
      console.error(`Page 1 is ${pageOneHeight - MAX_PAGE_HEIGHT}px too tall!`)
    } else {
      const printSpacer = document.getElementById("print-spacer");
      printSpacer.style.paddingBottom = `${MAX_PAGE_HEIGHT - pageOneHeight}px`;
    }

    const pageTwoHeight = document.getElementById(PAGE_TWO_ID).clientHeight;
    if (pageTwoHeight && pageTwoHeight > MAX_PAGE_HEIGHT) {
      console.error(`Page 2 is ${pageTwoHeight - MAX_PAGE_HEIGHT}px too tall!`)
    }
  }

  render() {
    const {heading, education, experience, publicSpeakingEvents, openSourceProjects, otherSections, references} = this.props.pageContext

    const otherInterests = otherSections.find(section => section.id === 'otherInterests')
    const technologies = otherSections.find(section => section.id === 'technologies')
    const spokenLanguages = otherSections.find(section => section.id === 'spokenLanguages')

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
            <Row className="mb-4">
              <Col>
                <Experience {...experience}/>
              </Col>
            </Row>
          </Container>
        </Page>
        <div id="print-spacer" className="d-print-block d-none"/>
        <Page id={PAGE_TWO_ID}>
          <Container fluid className="px-5 pb-5">
            <Row className="mb-4 justify-content-center">
              <Col xs>
                <PublicSpeakingEvents {...publicSpeakingEvents} id="publicSpeakingEvents"/>
              </Col>
            </Row>
            <Row className="mb-4 justify-content-center">
              <Col xs>
                <OpenSourceProjects {...openSourceProjects} id="openSourceProjects"/>
              </Col>
            </Row>
            <Row>
              <Col xs={3}>
                <GenericSection {...spokenLanguages}/>
              </Col>
              <Col xs={9}>
                <GenericSection {...otherInterests}/>
              </Col>
            </Row>
            <Row className="justify-content-center mt-5">
              <Col xs={4} offset={4}>
                <References {...references} />
              </Col>
            </Row>
          </Container>
        </Page>
      </Layout>
    );
  }
}
