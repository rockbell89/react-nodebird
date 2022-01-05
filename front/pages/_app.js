import "antd/dist/antd.css";
import PropTypes from "prop-types";
import Head from "next/head";
import styles from "./style.css";
import AppLayout from "../_components/layout/AppLayout";
import wrapper from "../_store/configureStore";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <title>BONGRAM</title>
      </Head>
      <AppLayout>
        <Component styles={styles} />
      </AppLayout>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
