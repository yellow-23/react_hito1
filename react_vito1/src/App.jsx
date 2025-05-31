import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CardPizza from "./components/CardPizza";

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (pizza) => {
    setCart([...cart, pizza]);
    setTotal(total + pizza.price);
    alert(`${pizza.name} agregada al carrito`);
  };

  return (
    <>
      <Navbar cartTotal={total} />
      <Header />
      <main className="container my-5">
        <h2 className="section-title text-center mb-4">Nuestras Pizzas</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <CardPizza
              name="Pizza Napolitana"
              price={5950}
              ingredients={["Mozzarella", "Tomates", "Jamón", "Orégano"]}
              img="https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=500"
              onAddToCart={addToCart}
              onViewDetails={() => alert("Detalles de Pizza Napolitana")}
            />
          </div>
          <div className="col-md-4 mb-4">
            <CardPizza
              name="Pizza Española"
              price={6950}
              ingredients={[
                "Mozzarella",
                "Gorgonzola",
                "Parmesano",
                "Provolone",
              ]}
              img="https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=500"
              onAddToCart={addToCart}
              onViewDetails={() => alert("Detalles de Pizza Española")}
            />
          </div>
          <div className="col-md-4 mb-4">
            <CardPizza
              name="Pizza Pepperoni"
              price={6950}
              ingredients={["Mozzarella", "Pepperoni", "Orégano"]}
              img="https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=500"
              onAddToCart={addToCart}
              onViewDetails={() => alert("Detalles de Pizza Pepperoni")}
            />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <CardPizza
              name="Pizza Vegetariana"
              price={7200}
              ingredients={[
                "Mozzarella",
                "Pimientos",
                "Cebolla",
                "Aceitunas",
                "Champiñones",
              ]}
              img="https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=500"
              onAddToCart={addToCart}
              onViewDetails={() => alert("Detalles de Pizza Vegetariana")}
            />
          </div>
          <div className="col-md-4 mb-4">
            <CardPizza
              name="Pizza BBQ"
              price={7500}
              ingredients={["Mozzarella", "Pollo", "Cebolla", "Salsa BBQ"]}
              img="https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=500"
              onAddToCart={addToCart}
              onViewDetails={() => alert("Detalles de Pizza BBQ")}
            />
          </div>
          <div className="col-md-4 mb-4">
            <CardPizza
              name="Pizza Hawaiana"
              price={6500}
              ingredients={["Mozzarella", "Jamón", "Piña"]}
              img="https://images.pexels.com/photos/6697469/pexels-photo-6697469.jpeg?auto=compress&cs=tinysrgb&w=500"
              onAddToCart={addToCart}
              onViewDetails={() => alert("Detalles de Pizza Hawaiana")}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
