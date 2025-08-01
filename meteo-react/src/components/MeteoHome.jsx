import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Image, Spinner, Alert, Card } from "react-bootstrap"

const MeteoHome = (props) => {

    const navigate = useNavigate()

    const apiKey = 'e682f93aa9548563db7cca91d648b460'

    const language = props.language

    const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${props.city},ITA&appid=${apiKey}&lang=${language}&units=metric`

    const [results, setResults] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)


    useEffect(() => {
        getResults()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.city, props.language])


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


    {/* Funzione per recuperare l'ora del meteo */ }
    const getCurrentTime = (timestamp, timezoneOffset) => {
        // timestamp dall'API è UTC, timezoneOffset è in secondi dall'UTC
        const date = new Date((timestamp + timezoneOffset) * 1000);
        return date.toUTCString().slice(17, 22); // Estrae solo HH:MM
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
            {results && (
                <Card className="text-body rounded-5 h-100 shadow-sm w-100" onClick={() => {navigate('/detail/' + results.id)}}>
                    <Card.Body className="p-4 d-flex flex-column">
                        <div className="d-flex mb-auto">
                            <h6 className="flex-grow-1">{results.name}, {results.sys.country}</h6>
                            <h6>{getCurrentTime(results.dt, results.timezone)}</h6>
                        </div>

                        <div className="d-flex flex-column text-center mt-5 mb-4">
                            <h6 className="display-4 mb-0 font-weight-bold">
                                {results.main.temp}°C
                            </h6>
                            <span className="small text-muted text-capitalize">{results.weather[0].description}</span>
                        </div>

                        <div className="d-flex align-items-center mt-auto">
                            <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
                                <div>
                                    <i className='bi bi-wind text-muted'></i>
                                    <span className="ms-1">{results.wind.speed} m/s</span>
                                </div>
                                <div>
                                    <i className='bi bi-moisture text-muted'></i>
                                    <span className="mx-2">{results.main.humidity}%</span>
                                </div>
                            </div>
                            <div>
                                <Image
                                    src={`https://openweathermap.org/img/wn/${results.weather[0].icon}@2x.png`}
                                    width="100px"
                                    alt={results.weather[0].description}
                                />
                            </div>
                        </div>
                    </Card.Body>
                </Card>

            )}
        </>
    )
}

export default MeteoHome