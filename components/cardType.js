import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Text, Platform, StyleSheet, Dimensions } from "react-native";
import IconAwesome from "react-native-vector-icons/FontAwesome5";

const { width: WIDTH } = Dimensions.get('window')

const propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  handleSelected: PropTypes.func.isRequired,
  type: PropTypes.number
};

const defaultProps = {
  type: undefined
};

const CardType = props => {
  const { icon, title, description, value, selected, handleSelected, type } = props;
  return (
    <TouchableOpacity
      onPress={() => handleSelected(type)}
      style={[styles.selectorCard, selected && { backgroundColor: 'rgba(255,255,255,0.1)' }]}
    >
      <View style={styles.cardValor}>
        <Text style={styles.textValor}>{value}</Text>
      </View>
      <View style={{marginLeft: 20}}>
        <Text style={styles.titleCard}>{title}</Text>
        <Text style={styles.textCard}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleCard: {
    fontSize: 18,
    color: "#fff",
    fontFamily: 'Roboto-Medium'
  },
  textCard: {
    fontSize: 12,
    color: "#fff",
    fontFamily: 'Roboto-Regular',
    width: 200,
  },
  selectorCard: {
    paddingTop: 40,
    paddingBottom: 40,
    width: WIDTH - 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  cardValor:{
    borderRadius: 10,
    width: 90,
    height: 90,
    maxHeight: 90,
    maxWidth: 90,
    borderWidth: 1,
    borderColor: '#6202F5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textValor:{
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 30
  }
});

CardType.propTypes = propTypes;
CardType.defaultProps = defaultProps;

export default CardType;
