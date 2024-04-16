import React from "react";
import PageTitle from "../../components/PageTitle";

const FAQs = () => {
  return (
    <div className="wrapper row3 m-5">
      <PageTitle title="Chucherias & Regalos | Preguntas Frecuentes" />

      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <h2 className="title-pag fw-bold text-center">
              Preguntas Frecuentes
            </h2>
            <hr className="hr-primary" />
            <div className="content">
              <h3>¿Cuánto tarda en llegar mi pedido?</h3>
              <p>
                El tiempo de entrega varía según tu ubicación y el método de
                envío seleccionado. Por lo general, los pedidos se despachan
                dentro de 2-5 días hábiles.
              </p>
              <h3>¿Cuáles son los métodos de pago aceptados?</h3>
              <p>
                Aceptamos pagos con tarjetas de crédito y transferencias
                bancarias.
              </p>
              <h3>¿Puedo cambiar un producto?</h3>
              <p>
                Aceptamos cambios dentro de los 15 días posteriores a la
                entrega. Los artículos deben estar sin usar, en su empaque
                original y con todos los accesorios.
              </p>
              <h3>¿Ofrecen descuentos?</h3>
              <p>
                Sí, ofrecemos descuentos especiales durante fechas significativas, como lo son dias del niño, dia del amor y la amistad, navidad, entre otras.
              </p>
              <h3>¿Puedo cancelar mi pedido?</h3>
              <p>
                Puedes cancelar tu pedido siempre y cuando aún no haya sido
                procesado para envío.
              </p>
              <h3>¿Qué sucede si realizo muchas compras y no las concreto?</h3>
              <p>
                Entendemos que, en ocasiones, los clientes pueden agregar
                productos al carrito de compras sin la intención de concretar
                la compra de inmediato. Sin embargo, si notamos un patrón de
                este comportamiento y no se concreta ninguna compra, nos
                reservamos el derecho de suspender temporalmente tu cuenta para
                evitar abusos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
