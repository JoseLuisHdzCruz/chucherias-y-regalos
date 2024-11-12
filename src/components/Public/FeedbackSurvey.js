// FeedbackSurvey.js

import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { useAlert } from '../../context/AlertContext';
import axios from 'axios';

const FeedbackSurvey = () => {
    const { token } = useAuth();
    const showAlert = useAlert();
    const [visible, setVisible] = useState(true);
    const [step, setStep] = useState(0);
    const [ratings, setRatings] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setCustomer(decoded);
        }

        // Carga las preguntas de la encuesta
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("https://backend-c-r-production.up.railway.app/feedback/get-questions");
                const questionTexts = response.data.map((question) => question.text);
                setQuestions(questionTexts);
                setRatings(new Array(questionTexts.length).fill(null));
            } catch (error) {
                showAlert("error", "Error al cargar las preguntas de la encuesta");
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, [token, showAlert]);

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // Enviar el feedback al backend cuando todas las preguntas estén respondidas
            submitFeedback();
        }
    };

    const submitFeedback = async () => {
        const feedbackData = ratings.map((rating, index) => ({
            questionId: index + 1,
            rating: rating,
        }));

        try {
            const response = await axios.post("https://backend-c-r-production.up.railway.app/feedback/submit-feedback", {
                customerId: customer.customerId,
                feedback: feedbackData,
            });
            showAlert("success", response.data.message);
            setVisible(false);
            setStep(0);
            setRatings(new Array(questions.length).fill(null));
        } catch (error) {
            showAlert("error", error.response?.data?.message || "Error al enviar el feedback");
            console.error("Error submitting feedback:", error);
        }
    };

    const handleRatingChange = (e) => {
        const updatedRatings = [...ratings];
        updatedRatings[step] = e.value;
        setRatings(updatedRatings);
    };

    const handleClose = () => {
        setVisible(false);
    };

    const footer = (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button label="Responder luego" onClick={handleClose} severity='secondary' outlined />
            <Button label={step < questions.length - 1 ? "Siguiente" : "Enviar"} onClick={handleNext} disabled={ratings[step] === null} raised style={{ color: 'white' }} />
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
                closable={true}
            >
                {questions.length > 0 ? (
                    <>
                        <p className="text-justify">{questions[step]}</p>
                        <div className="text-center">
                            <Rating
                                value={ratings[step]}
                                onChange={handleRatingChange}
                                stars={5}
                                cancel={false}
                            />
                        </div>
                    </>
                ) : (
                    <p>Cargando preguntas...</p>
                )}
            </Dialog>
        </div>
    );
};

export default FeedbackSurvey;
