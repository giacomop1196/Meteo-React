import { Container, Row, Col, Button } from "react-bootstrap"

const MeteoFooter = () => {

    return (
        <footer className="py-5 footer-color">
            <Container>
                <Row>
                    <Col xs={12} className="text-center">
                        &copy; 2025 Meteo Epicode
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default MeteoFooter