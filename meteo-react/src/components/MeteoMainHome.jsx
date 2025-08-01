import { Container, Row, Col } from "react-bootstrap"
import MeteoHome from './MeteoHome'

const MeteoMainHome = (props) => {
    return (
        <Container fluid className="min-vh-100">
            <Row >
                <Col xs={12} md={6} lg={12}>
                    <div className="text-center my-3">
                        <h1>Meteo Epicode</h1>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center py-2">

                <Col xs={12} sm={6} md={4} className="mb-4 d-flex">
                    <MeteoHome city='Biancavilla' language={props.language} />
                </Col>
                <Col xs={12} sm={6} md={4} className="mb-4 d-flex">
                    <MeteoHome city='Daiano' language={props.language} />
                </Col>
                <Col xs={12} sm={6} md={4} className="mb-4 d-flex">
                    <MeteoHome city='Tokyo' language={props.language} />
                </Col>
            </Row>

        </Container>
    )
}

export default MeteoMainHome