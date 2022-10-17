import "antd/dist/antd.css";
import PropTypes from "prop-types";
import Head from "next/head";
import styles from "./style.css";
import wrapper from "../_store/configureStore";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <title>BONGRAM</title>
      </Head>
      <Component styles={styles} />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
