import { Container, Row, Col, Card, Spinner, Alert, Image } from "react-bootstrap"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const MeteoDetail = () => {

    // ID passato come parametro
    const params = useParams()
    const cityId = params.id

    const apiKey = 'e682f93aa9548563db7cca91d648b460'

    //Link API per cercare tramite ID della città
    const apiLink = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`

    const [results, setResults] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)


    useEffect(() => {
        getResults()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id])


    //Funzione per recuperare i dati dall'api
    const getResults = () => {

        fetch(apiLink, {
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error('Errore nel recupero dei dati')
            })
            .then((meteo) => {
                console.log(meteo, 'dati meteo arrivati')
                setResults(meteo)
                setIsLoading(false)
            })
            .catch((error) => {

                console.error("Errore nel recupero dei dati:", error);
                setIsLoading(false)
                setIsError(true)
            })
    }


    const getCurrentTime = (timestamp, timezoneOffset) => {
        const date = new Date((timestamp + timezoneOffset) * 1000);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };


    return (

        <>
            {/* Spinner */}
            {isLoading && (
                <div className="text-center mb-3">
                    <Spinner animation="grow" />
                </div>
            )}
            {/* Errore se vado nel catch */}
            {isError && (
                <Alert variant="danger" className="text-center">
                    Errore nel recupero dei dati
                </Alert>
            )}
            {/* Risultato */}
            {results && (
                <Container fluid className="min-vh-100 bg-light">
                    <Row className="justify-content-center pt-5">
                        <Col xs={12} className="text-center">
                            <h1>Dettagli Meteo</h1>
                            <p className="lead">Informazioni dettagliate per {results.name}, {results.sys.country}</p>
                        </Col>
                    </Row>

                    <Row className="justify-content-center py-4">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="text-body rounded-5 shadow-lg">
                                <Card.Body className="p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="card-title mb-0">{results.name}, {results.sys.country}</h4>
                                        <small className="text-muted">{getCurrentTime(results.dt, results.timezone)}</small>
                                    </div>

                                    <div className="d-flex flex-column text-center my-4">
                                        <div className="d-flex align-items-center justify-content-center mb-3">
                                            <Image src={`https://openweathermap.org/img/wn/${results.weather[0].icon}@2x.png`} width="120px" alt={results.weather[0].description} className="me-3" />
                                            <h2 className="display-3 mb-0 font-weight-bold">{results.main.temp}°C</h2>
                                        </div>
                                        <span className="lead text-muted text-capitalize">{results.weather[0].description}</span>
                                    </div>

                                    <hr className="my-4" />

                                    <Row className="text-center">
                                        <Col xs={6} md={4} className="mb-3">
                                            <div className="d-flex flex-column align-items-center">
                                                <i className="bi bi-thermometer-half me-2 fs-4 text-primary"></i>
                                                <p className="mb-0">Percepita</p>
                                                <strong>{results.main.feels_like}°C</strong>
                                            </div>
                                        </Col>
                                        <Col xs={6} md={4} className="mb-3">
                                            <div className="d-flex flex-column align-items-center">
                                                <i className="bi bi-wind me-2 fs-4 text-info"></i>
                                                <p className="mb-0">Vento</p>
                                                <strong>{results.wind.speed} m/s</strong>
                                                <small className="text-muted">({results.wind.deg}°)</small>
                                            </div>
                                        </Col>
                                        <Col xs={6} md={4} className="mb-3">
                                            <div className="d-flex flex-column align-items-center">
                                                <i className="bi bi-moisture me-2 fs-4 text-success"></i>
                                                <p className="mb-0">Umidità</p>
                                                <strong>{results.main.humidity}%</strong>
                                            </div>
                                        </Col>
                                        <Col xs={6} md={4} className="mb-3">
                                            <div className="d-flex flex-column align-items-center">
                                                <i className="bi bi-speedometer2 me-2 fs-4 text-warning"></i>
                                                <p className="mb-0">Pressione</p>
                                                <strong>{results.main.pressure} hPa</strong>
                                            </div>
                                        </Col>
                                        <Col xs={6} md={4} className="mb-3">
                                            <div className="d-flex flex-column align-items-center">
                                                <i className="bi bi-eye me-2 fs-4 text-secondary"></i>
                                                <p className="mb-0">Visibilità</p>
                                                <strong>{(results.visibility / 1000).toFixed(1)} km</strong>
                                            </div>
                                        </Col>
                                        <Col xs={6} md={4} className="mb-3">
                                            <div className="d-flex flex-column align-items-center">
                                                <i className="bi bi-cloud-fill me-2 fs-4 text-muted"></i>
                                                <p className="mb-0">Nuvolosità</p>
                                                <strong>{results.clouds.all}%</strong>
                                            </div>
                                        </Col>
                                    </Row>

                                    <hr className="my-4" />

                                    <Row className="text-center small text-muted">
                                        <Col xs={6}>
                                            <i className="bi bi-sunrise me-1"></i>
                                            Alba: {getCurrentTime(results.sys.sunrise, results.timezone)}
                                        </Col>
                                        <Col xs={6}>
                                            <i className="bi bi-sunset me-1"></i>
                                            Tramonto: {getCurrentTime(results.sys.sunset, results.timezone)}
                                        </Col>
                                    </Row>

                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
            }
        </>
    )
}

export default MeteoDetail