import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';

const FeedbackSurvey = () => {
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState(0);
    const [ratings, setRatings] = useState([null, null, null]);
    const questions = [
        "¿Qué tan satisfecho estás con el producto?",
        "¿Recomendarías este producto a un amigo?",
        "¿Qué tan satisfecho estás con nuestro servicio?"
    ];

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

    const footer = (
        <div>
            <Button label={step < questions.length - 1 ? "Siguiente" : "Enviar"} onClick={handleNext} disabled={ratings[step] === null} />
        </div>
    );

    return (
        <div>
            <Button label="Dar Feedback" icon="pi pi-comment" onClick={() => setVisible(true)} />
            <Dialog header="Encuesta de Feedback" visible={visible} style={{ width: '30vw' }} footer={footer} onHide={() => setVisible(false)} closable={false}>
                <p>{questions[step]}</p>
                <Rating value={ratings[step]} onChange={handleRatingChange} stars={5} cancel={false} />
            </Dialog>
        </div>
    );
};

export default FeedbackSurvey;
