import { Container, Row, Col } from "react-bootstrap"
import MeteoHome from './MeteoHome'

const MeteoMainHome = (props) => {
    return (
        <Container fluid className="min-vh-100 background-image">
            <Row >
                <Col xs={12} md={6} lg={12}>
                    <div className="text-center my-3">
                        <h1>Meteo Epicode</h1>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center align-items-center py-2 h-100">

                <Col xs={12} sm={6} md={4}>
                    <MeteoHome city='Biancavilla' language={props.language} />
                    <MeteoHome city='New York' language={props.language} />
                </Col>
                
                <Col xs={12} sm={6} md={4} className="d-flex">
                    <MeteoHome city='Tokyo' language={props.language} />
                </Col>
            </Row>

        </Container>
    )
}

export default MeteoMainHome