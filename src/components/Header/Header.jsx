import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Peça aqui a seu prato preferido!</h2>
        <p>
          Escolha entre um menu diversificado com uma variedade de pratos
          elaborados com os melhores ingredientes e conhecimento culinários. Nosso
          A missão é satisfazer seu desejo e elevar sua experiência gastronômica,
          uma prato delicioso de cada vez.
        </p>
        <a href="#explore-menu">
          <button>Explore nosso cardápio</button>
        </a>
      </div>
    </div>
  );
};

export default Header;
