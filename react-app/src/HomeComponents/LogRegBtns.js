import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LogRegBtns() {
  return (
    <>
      <div className="d-none d-sm-block d-sm-none d-md-block">
        <a href="Register" className="linkBtns">
          Register
        </a>
        <a href="Login" className="linkBtns">
          Login
        </a>
      </div>

      <FontAwesomeIcon
        icon="fa-solid fa-bars"
        id="burgerMenu"
        className="d-md-none d-lg-block d-lg-none d-xl-block d-xl-none"
      />
    </>
  );
}

export default LogRegBtns;
