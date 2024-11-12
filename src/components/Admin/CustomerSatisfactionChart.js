import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios"; // Para hacer solicitudes a la API
import { Card } from "react-bootstrap";

const CustomerSatisfactionChart = () => {
  const [chartData, setChartData] = useState([]);
  const [questions, setQuestions] = useState([]);

  // Función para cargar las preguntas desde la API
  const loadQuestions = async () => {
    try {
      const response = await axios.get("https://backend-c-r-production.up.railway.app/feedback/get-questions");
      setQuestions(response.data); // Guardamos las preguntas en el estado
    } catch (error) {
      console.error("Error al cargar las preguntas:", error);
    }
  };

  // Función para cargar las respuestas de feedback desde la API
  const loadFeedbackData = async () => {
    try {
      const response = await axios.get("https://backend-c-r-production.up.railway.app/feedback/"); // Ajusta la URL de tu API
      const feedbackData = response.data;
      processChartData(feedbackData);
    } catch (error) {
      console.error("Error al cargar los datos de feedback:", error);
    }
  };

  // Procesar los datos para usarlos en los gráficos de pastel
  const processChartData = (feedbackData) => {
    const groupedData = {};

    feedbackData.forEach((feedback) => {
      const { questionId, rating } = feedback;
      // Asegurarse de que el questionId es tratado como número
      const questionIdNumber = parseInt(questionId);

      if (!groupedData[questionIdNumber]) {
        groupedData[questionIdNumber] = { data: Array(5).fill(0) };
      }
      groupedData[questionIdNumber].data[rating - 1] += 1;
    });

    const chartData = Object.keys(groupedData).map((questionIdNumber) => {
      return {
        questionId: questionIdNumber,
        data: {
          labels: ["1 - Muy malo", "2 - Malo", "3 - Neutral", "4 - Bueno", "5 - Muy bueno"],
          datasets: [
            {
              data: groupedData[questionIdNumber].data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
            },
          ],
        },
      };
    });

    setChartData(chartData);
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    loadQuestions();
    loadFeedbackData();
  }, []);

  return (
    <Card>
      <h2 className="mt-2 ml-4">Satisfacción del Cliente</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {chartData.map(({ questionId, data }, index) => {
          // Buscar la pregunta correspondiente usando el questionId como número
          const questionText = questions.find((question) => question.questionId === parseInt(questionId))?.text;
          
          return (
            <div key={index} style={{ width: "300px", margin: "20px" }}>
              <h3 className="text-center">Pregunta {questionId}</h3>
              <Pie data={data} />
              <p>{questionText || "Pregunta no disponible"}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CustomerSatisfactionChart;
