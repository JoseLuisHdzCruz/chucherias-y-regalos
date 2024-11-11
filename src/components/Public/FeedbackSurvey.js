import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';

const FeedbackSurvey = () => {
    const [visible, setVisible] = useState(true);
    const [step, setStep] = useState(0);
    const [ratings, setRatings] = useState([null, null, null]);

    const [questions, setQuestions] = useState(null);

    // useEffect(() => {
    //     // Obtener categorías
    //     fetch("http://localhost:5000/feedback/get-questions")
    //       .then((response) => response.json())
    //       .then((data) => setQuestions(data))
    //       .catch((error) => console.error("Error fetching categories:", error));

    //       console.log("preguntas: ",questions)
    //   }, []);

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            console.log("Feedback recibido:", ratings);
            setVisible(false);
            setStep(0);
            setRatings([null, null, null]);
        }
    };

    const handleRatingChange = (e) => {
        const updatedRatings = [...ratings];
        updatedRatings[step] = e.value;
        setRatings(updatedRatings);
    };

    const handleClose = () => {
        setVisible(false); // Cierra el diálogo sin guardar
    };

    const footer = (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button label="Responder luego" onClick={handleClose} severity='secondary' outlined />
            <Button style={{ color: 'white' }} label={step < questions.length - 1 ? "Siguiente" : "Enviar"} onClick={handleNext} disabled={ratings[step] === null} raised />
        </div>
    );

    return (
        <div>
            <Dialog
                header="Encuesta de satisfacción"
                visible={visible}
                style={{ width: '30vw' }}
                footer={footer}
                onHide={handleClose}
                closable={true} // Activa el botón de cerrar incorporado
            >
                <p className="text-justify">{questions[step]}</p>
                <div className="text-center">
                    <Rating
                        value={ratings[step]}
                        onChange={handleRatingChange}
                        stars={5}
                        cancel={false}
                        cancelIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/cancel.png" alt="cancel-icon" width="50px" height="50px" />}
                        onIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/custom-icon-active.png" alt="active-icon" width="50px" height="50px" />}
                        offIcon={<img src="https://primefaces.org/cdn/primereact/images/rating/custom-icon.png" alt="inactive-icon" width="50px" height="50px" />}
                    />
                </div>
            </Dialog>
        </div>
    );
};

export default FeedbackSurvey;
