import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";

const propTypes = {
  showError: PropTypes.bool,
  errorMessage: PropTypes.string
};

const defaultProps = {
  showError: undefined,
  errorMessage: ""
};

const TextError = props => {
  const { showError, errorMessage } = props;
  return showError ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null;
};

const styles = StyleSheet.create({
  errorMessage: {
    color: "#FD7B85",
    fontSize: 12,
    fontWeight: "bold",
    paddingTop: 5,
    textAlign: "center"
  }
});

TextError.propTypes = propTypes;
TextError.defaultProps = defaultProps;

export default TextError;
