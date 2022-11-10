import "antd/dist/antd.css";
import PropTypes from "prop-types";
import Head from "next/head";
import styles from "./style.css";
import wrapper from "../_store/configureStore";
// import withReduxSaga from './next-redux-saga'; nextjs 이제 기본적으로 제공해줌

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
// export default wrapper.withRedux(withReduxSaga(App));
