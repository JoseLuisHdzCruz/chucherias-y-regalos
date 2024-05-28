import React from "react";
import PageTitle from "../../components/Public/PageTitle";

function AcercaDe() {
  return (
    <div className="container mt-3 mb-4">
      <PageTitle title="Chucherias & Regalos | Acerca De" />
      <h3 className="title-pag fw-bold text-uppercase">Acerca de nosotros</h3>
      <hr className="hr-primary" />

      <div className="row justify-content-center">
        <div className="col-md-11 text-center mb-4">
          <img
            src="/images/Chucherias.png"
            className="img-fluid rounded-start mt-4"
            alt="Chucherias & Regalos"
            style={{ height: "100px" }}
          />
        </div>
        <div className="col-md-11">
          <p className="text-justify">
            Bienvenido al maravilloso mundo de Chucherías y Regalos, donde los
            sueños se hacen realidad y la magia cobra vida. Desde nuestro
            humilde inicio, nos hemos dedicado apasionadamente a la venta de
            regalos, juguetes y artículos para dama, pero para nosotros, va
            mucho más allá de simples productos; se trata de compartir alegría,
            emociones y momentos especiales con cada uno de nuestros clientes.
            En Chucherías y Regalos, nos esforzamos por ser mucho más que una
            tienda. Somos un lugar donde los corazones encuentran lo que desean,
            donde la imaginación se libera y donde los sueños toman forma. Cada
            artículo que ofrecemos es cuidadosamente seleccionado para inspirar
            la felicidad y satisfacer las necesidades más profundas de expresión
            y afecto.
          </p>
          <p className="text-justify">
            Nuestro compromiso va más allá de la venta; buscamos ser la
            principal referencia en la región de Huejutla de Reyes, Hidalgo, no
            solo en productos, sino también en experiencias. Nos enorgullece ser
            parte de la vida de nuestros clientes, celebrando cada ocasión
            especial y construyendo recuerdos que perduran toda la vida. En
            Chucherías y Regalos, no solo vendemos juguetes, vendemos sueños,
            aventuras y momentos mágicos. Únete a nosotros en este viaje lleno
            de color, diversión y sorpresas. ¡Te damos la bienvenida a nuestro
            mundo de fantasía!
          </p>
        </div>
      </div>
      <hr className="hr-primary" />

      <div className="row ml-4 align-items-center">
        <div className="col-md-5 text-center">
          <img
            src="/images/empresa1.png"
            className="img-fluid rounded-start mt-4"
            alt="Chucherias & Regalos"
            style={{ height: "300px" }}
          />
        </div>
        <div className="col-md-6">
          <h3 className="title-pag fw-bold text-uppercase mt-4 text-center">
            Misión
          </h3>
          <p className="ml-4 text-justify">
            Ofrecer a nuestros clientes experiencias únicas mediante la venta de
            juguetes, regalos y artículos para dama, proporcionando productos de
            calidad que inspiren la alegría y satisfagan sus necesidades de
            expresión y afecto.
          </p>
        </div>
      </div>

      <div className="row ml-4 align-items-center">
        <div className="col-md-6">
          <h3 className="title-pag fw-bold text-uppercase mt-4 text-center">
            Visión
          </h3>
          <p className="ml-4 text-justify">
            Convertirnos en la principal referencia de Chucherías & Regalos,
            expandiendo nuestra presencia a nivel regional para ser reconocidos
            como la opción preferida de compras, manteniendo nuestro compromiso
            con la calidad y la diversidad de productos.
          </p>
        </div>
        <div className="col-md-5 text-center">
          <img
            src="/images/empresa2.png"
            className="img-fluid rounded-start mt-4"
            alt="Chucherias & Regalos"
            style={{ height: "300px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default AcercaDe;
