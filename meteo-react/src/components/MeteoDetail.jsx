import { Container, Row, Col, Card, Spinner, Alert, Image } from "react-bootstrap"
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const MeteoDetail = (props) => {

    // Recupero il Parametro dal path
    const params = useParams()

    // Linguaggio
    const language = props.language

    // Api Key
    const apiKey = 'e682f93aa9548563db7cca91d648b460'

    const [results, setResults] = useState(null)
    const [resultsPrev, setResultsPrev] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    // Quando avviamo il componente o cambia una props 
    useEffect(() => {

        let queryParam = '';

        // Determina se stiamo cercando per ID o per Nome
        if (params.cityId) {
            queryParam = `id=${params.cityId}`;
        } else {
            queryParam = `q=${params.cityName}`;

        }

        //Link API
        const apiLink = `https://api.openweathermap.org/data/2.5/weather?${queryParam}&appid=${apiKey}&lang=${language}&units=metric`;

        //Link Previsioni
        const apiLinkForecast = `http://api.openweathermap.org/data/2.5/forecast?${queryParam}&appid=${apiKey}&lang=${language}&units=metric`

        // Chiama getResults passandogli l link completi dell'api
        getResults(apiLink, apiLinkForecast);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.cityId, params.cityName, language]);


    //Funzione per recuperare i dati dall'api
    const getResults = (apiLink, apiLinkForecast) => {

        //API Dettagli
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

        //API Previsioni
        fetch(apiLinkForecast, {
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error('Errore nel recupero dei dati')
            })
            .then((prev) => {
                console.log(prev, 'dati meteo previsioni arrivati')
                setResultsPrev(prev)
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


    // Funzione helper per formattare data e ora delle previsioni
    const formatForecastDateTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Il timestamp dal forecast è già locale
        const options = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString(language, options);
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
                <Container fluid className="min-vh-100 bg-light background-image">
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

                                        {/* Se la temperatura sale sopra i 27° compare un Alert */}
                                        {results.main.temp > 27 && (
                                        <Alert key='danger' variant='danger' className="mt-3">
                                        <i class="bi bi-exclamation-triangle-fill"></i> Allerta moderata per temperature elevate!
                                        </Alert>
                                    )}

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
            )}

            {/* Previsioni */}
            {resultsPrev && resultsPrev.list && resultsPrev.list.length > 0 && (
                <Container fluid>
                    <Row className="justify-content-center py-4">
                        <Col xs={12}>
                            <h3 className="text-center mb-4">Previsioni per le prossime ore</h3>
                            <Card className="text-body rounded-4 shadow-lg mx-3">
                                <Card.Body className="p-3 w-100">
                                    <Row className="g-2 flex-nowrap overflow-x-auto pb-2">
                                        {resultsPrev.list.map(forecast => (
                                            <Col key={forecast.dt} className="text-center" xs={6} sm={4} md={3} lg={2}>
                                                <Card className="h-100 p-2 d-flex flex-column justify-content-between align-items-center">
                                                    <small className="text-muted mb-1">
                                                        {formatForecastDateTime(forecast.dt)}
                                                    </small>
                                                    <Image src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                                        width="50px" alt={forecast.weather[0].description} className="mx-auto my-1"
                                                    />
                                                    <p className="mb-0"><strong>{forecast.main.temp}°C</strong></p>
                                                    <small className="text-muted text-capitalize">{forecast.weather[0].description}</small>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default MeteoDetail