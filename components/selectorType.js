import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import CardType from "./cardType";

const propTypes = {
  cardSelected: PropTypes.number,
  handleSelected: PropTypes.func.isRequired
};

const defaultProps = {
  cardSelected: 1
};

const SelectorType = props => {
  const { handleSelected, cardSelected } = props;
  return (
    <View style={styles.selectorContainer}>
      <CardType
        type={1}
        icon="car-side"
        title="Ficar em pé"
        value="R$5"
        description="Essa opção você entra na LIVE e poderá apenas assistir o show e enviar algum comentário durante a transmissão."
        handleSelected={handleSelected}
        selected={cardSelected === 1}
      />
      <CardType
        type={2}
        icon="motorcycle"
        title="Sentar à mesa"
        value="R$10"
        description="Essa opção você entra na LIVE e poderá convidar até 6 amigos para realizar uma vídeo chamada e cutir juntos em uma `mesa` reservada o show."
        handleSelected={handleSelected}
        selected={cardSelected === 2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  selectorContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});

SelectorType.propTypes = propTypes;
SelectorType.defaultProps = defaultProps;

export default SelectorType;
