import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Check,
  ChevronDown,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import "./styles.css";

const photos = {
  Fries:
    "http//images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=1200&q=88",
  "Loaded Fries":
    "htt://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=1200&q=88",
  "Chicken Caesar":
    "/menu-images/chicken-caesar.jpg",
  Fajita:
    "/menu-images/fajita.jpg",
  "Philly Steak":
    "/menu-images/philly-steak.jpg",
  "Nato's Beef Burger":
    "/menu-images/nato-beef-burger.jpg",
  "Royal Chicken Burger":
    "/menu-images/royal-chicken-burger.jpg",
  "Chicken Sub":
    "htt/images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=1200&q=88",
  Tawook:
    "https/images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=88",
  "The NATO":
    "https/images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1200&q=88",
};
const menu = [
  {
    name: "APPETIZERS",
    items: [
      ["Fries", 200000],
      ["Loaded Fries", 350000],
    ],
  },
  {
    name: "SANDWICHES",
    items: [
      ["Chicken Caesar", 550000, true],
      ["Fajita", 550000, true],
      ["Chicken Sub", 450000, true],
      ["Philly Steak", 700000, true],
      ["Tawook", 400000, true],
      ["The NATO", 600000, true],
    ],
  },
  {
    name: "BURGERS",
    items: [
      ["Nato's Beef Burger", 500000],
      ["Royal Chicken Burger", 450000],
    ],
  },
];
const format = (n) => n.toLocaleString("en-US") + " L.L.";

function Header({ openCart, count }) {
  return (
    <>
      <header>
        <a className="brand" href="#top">
          <span>NATO</span>
          <small>ON WHEELS</small>
        </a>
        <nav>
          <a href="#menu">Menu</a>
          <a href="#location">Location</a>
        </nav>
        <button className="cartTop" onClick={openCart}>
          <ShoppingBag size={19} />
          <span>Order</span>
          {count > 0 && <b>{count}</b>}
        </button>
      </header>
    </>
  );
}
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="heroCopy">
        <p className="eyebrow">SAIDA'S STREET FOOD TRUCK</p>
        <h1>
          GOOD FOOD.
          <br />
          <em>GOOD MOOD.</em>
        </h1>
        <p className="lead">
          Big flavors, bold bites, and the kind of food that keeps the wheels
          turning.
        </p>
        <div className="actions">
          <a className="button yellow" href="#menu">
            Explore menu <ArrowRight size={18} />
          </a>
          <a className="phone" href="tel:+96171222962">
            <Phone size={18} /> 71/222962
          </a>
        </div>
      </div>
      <div className="heroVisual">
        <div className="sun">★</div>
        <div className="foodStack">
          <img src={photos["Nato's Beef Burger"]} alt="Nato beef burger" />
          <div className="sticker">
            NATO
            <br />
            BITES
          </div>
        </div>
        <div className="stamp">
          EST.
          <br />
          <strong>2024</strong>
        </div>
      </div>
    </section>
  );
}
function CategoryNav() {
  return (
    <div className="categoryNav">
      {menu.map((c, i) => (
        <a key={c.name} href={"#" + c.name.toLowerCase()}>
          {String(i + 1).padStart(2, "0")} / {c.name}
        </a>
      ))}
    </div>
  );
}
function Item({ item, add, cart }) {
  let [name, price, breadOptions] = item;
  let [bread, setBread] = useState("Regular Bread (Submarine)");
  let cartName = breadOptions ? `${name} · ${bread}` : name;
  let qty = cart.find((y) => y.name === cartName)?.qty;
  return (
    <article className="item">
      <div className="itemImage" style={{ height: 220, minHeight: 220, maxHeight: 220, overflow: "hidden" }}>
        {photos[name] ? <img src={photos[name]} alt={name} style={{ width: "100%", height: "100%", maxWidth: "100%", maxHeight: "100%", objectFit: "contain", objectPosition: "center", display: "block" }} /> : <span>✦</span>}
      </div>
      <div className="itemInfo">
        <h3>{name}</h3>
        <strong>{format(price)}</strong>
        {breadOptions && <fieldset><legend>Choose your bread</legend>{["Regular Bread (Submarine)", "Whole Wheat Bread (Diet)"].map(option => <label key={option}><input type="radio" name={name} checked={bread === option} onChange={() => setBread(option)} />{option}</label>)}</fieldset>}
        <button onClick={() => add({ name: cartName, price })}>
          {qty ? (
            <>
              <Check size={15} /> Added · {qty}
            </>
          ) : (
            <>
              <Plus size={16} /> Add
            </>
          )}
        </button>
      </div>
    </article>
  );
}
function Menu({ add, cart }) {
  return (
    <section className="menuSection" id="menu">
      <div className="sectionIntro">
        <p className="eyebrow red">THE LINEUP</p>
        <h2>
          Pick your <span>fuel.</span>
        </h2>
        <p>
          Made fresh, served loud. Choose your favorite and build your order.
        </p>
      </div>
      <div className="menuGrid">
        {menu.map((c) => (
          <div className="category" id={c.name.toLowerCase()} key={c.name}>
            <div className="catTitle">
              <span className="catIcon">✦</span>
              <h2>{c.name}</h2>
            </div>
            <div className="productGrid">
              {c.items.map((x) => (
                <Item key={x[0]} item={x} add={add} cart={cart} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function Featured({ add }) {
  let items = [
    ["Chicken Caesar", 550000],
    ["Fajita", 550000],
    ["Philly Steak", 700000],
    ["Nato's Beef Burger", 500000],
    ["Royal Chicken Burger", 450000],
  ];
  return (
    <section className="featured" id="featured">
      <div className="sectionIntro light">
        <p className="eyebrow yellowText">FAN FAVORITES</p>
        <h2>
          Worth the <span>mess.</span>
        </h2>
      </div>
      <div className="featureRail">
        {items.map(([name, price]) => (
          <article className="foodCard" key={name}>
            <img src={photos[name]} alt={name} />
            <div>
              <p>{name}</p>
              <b>{format(price)}</b>
              <button onClick={() => add({ name, price })}>
                <Plus size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Bread() {
  return (
    <section className="bread">
      <div>
        <p className="eyebrow red">MAKE IT YOURS</p>
        <h2>
          Choose your <span>bread.</span>
        </h2>
        <p>Available for all sandwiches.</p>
      </div>
      <div className="breadCards">
        <div>
          <div className="breadArt bun" />
          <b>Regular Bread</b>
          <small>SUBMARINE</small>
        </div>
        <div>
          <div className="breadArt wheat" />
          <b>Whole Wheat Bread</b>
          <small>DIET</small>
        </div>
      </div>
    </section>
  );
}
function Delivery() {
  return (
    <>
      <section className="delivery">
        <div className="deliveryMark">✦</div>
        <div>
          <p className="eyebrow yellowText">HUNGRY YET?</p>
          <h2>
            JUST FOR <i>DELIVERY.</i>
          </h2>
          <p>Call us or send your order straight to WhatsApp.</p>
        </div>
        <a
          className="button yellow"
          href="https://wa.me/96171222962"
          target="_blank"
        >
          Order now <ArrowRight size={18} />
        </a>
      </section>
      <section className="location" id="location">
        <MapPin size={30} />
        <div>
          <p className="eyebrow red">FIND THE TRUCK</p>
          <h2>SAIDA</h2>
          <p>
            Natasha Saad Street,
            <br />
            Next to Falafel Al Rabieh
          </p>
        </div>
        <a
          className="button outline"
          href="https://maps.google.com/?q=Natasha+Saad+Street+Saida"
          target="_blank"
        >
          Get directions
        </a>
      </section>
    </>
  );
}
function Cart({ cart, setCart, close }) {
  let total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  let change = (name, d) =>
    setCart((c) =>
      c
        .map((x) => (x.name === name ? { ...x, qty: x.qty + d } : x))
        .filter((x) => x.qty > 0),
    );
  let order = () => {
    let text =
      "Hello NATO ON WHEELS! 👋\n\nI would like to order:\n\n" +
      cart.map((x) => `${x.qty}x ${x.name} — ${format(x.price)}`).join("\n") +
      `\n\nTotal: ${format(total)}\n\nThank you!`;
    window.open(
      "https://wa.me/96171222962?text=" + encodeURIComponent(text),
      "_blank",
    );
  };
  return (
    <div
      className="overlay"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <aside className="cart">
        <div className="cartHead">
          <div>
            <p className="eyebrow red">YOUR ORDER</p>
            <h2>
              Cart <span>({cart.reduce((s, x) => s + x.qty, 0)})</span>
            </h2>
          </div>
          <button className="iconBtn" onClick={close}>
            <X />
          </button>
        </div>
        {!cart.length ? (
          <div className="empty">
            <ShoppingBag size={42} />
            <h3>Your cart is empty</h3>
            <p>Pick something delicious to get started.</p>
            <button className="button dark" onClick={close}>
              Explore menu
            </button>
          </div>
        ) : (
          <>
            <div className="cartItems">
              {cart.map((x) => (
                <div className="cartRow" key={x.name}>
                  <div>
                    <b>{x.name}</b>
                    <small>{format(x.price)}</small>
                  </div>
                  <div className="qty">
                    <button onClick={() => change(x.name, -1)}>
                      <Minus size={14} />
                    </button>
                    <span>{x.qty}</span>
                    <button onClick={() => change(x.name, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <strong>{format(x.price * x.qty)}</strong>
                  <button
                    className="trash"
                    onClick={() =>
                      setCart((c) => c.filter((y) => y.name !== x.name))
                    }
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
            <div className="cartFoot">
              <div>
                <span>Total</span>
                <strong>{format(total)}</strong>
              </div>
              <button className="button whatsapp" onClick={order}>
                ORDER VIA WHATSAPP <ArrowRight size={17} />
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
function App() {
  let [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nato-cart")) || [];
    } catch {
      return [];
    }
  });
  let [cartOpen, setCartOpen] = useState(false);
  useEffect(
    () => localStorage.setItem("nato-cart", JSON.stringify(cart)),
    [cart],
  );
  let add = (x) => {
    setCart((c) =>
      c.some((y) => y.name === x.name)
        ? c.map((y) => (y.name === x.name ? { ...y, qty: y.qty + 1 } : y))
        : [...c, { ...x, qty: 1 }],
    );
    setCartOpen(false);
  };
  let count = cart.reduce((s, x) => s + x.qty, 0);
  return (
    <>
      <Header openCart={() => setCartOpen(true)} count={count} />
      <main>
        <Hero />
        <CategoryNav />
        <Menu add={add} cart={cart} />
        <Delivery />
      </main>
      <footer>
        <div className="brand">
          <span>NATO</span>
          <small>ON WHEELS</small>
        </div>
        <p>GOOD FOOD, GOOD MOOD · SAIDA, LEBANON</p>
        <a href="tel:+96171222962">71/222962</a>
        <small>© 2024 NATO ON WHEELS</small>
      </footer>
      <div className="devix"><span>Powered by </span><a href="https://devix-five.vercel.app/" target="_blank" rel="noreferrer">Devix LB</a></div>
      {count > 0 && (
        <button className="floatingCart" onClick={() => setCartOpen(true)}>
          <ShoppingBag size={19} /> View order <b>{count}</b>
        </button>
      )}
      {cartOpen && (
        <Cart cart={cart} setCart={setCart} close={() => setCartOpen(false)} />
      )}
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
