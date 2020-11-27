import React, { Component } from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setYear } from "../actions/index.js";
import PropTypes from "prop-types";
import { Query, graphql } from "react-apollo";

const styles = {
  button: {
    margin: 20
  },
  img: {
    height: 80
  },
  container: {
    display: "grid",
    gridTemplateColumns: "400px 400px 400px",
    justifyContent: "center"
  }
};

const GET_CUPS = gql`
  {
    worldcups {
      year
      img
      country
    }
  }
`;

class Cups extends Component {
  render() {
    const { setYear } = this.props;
    return (
      <Query query={GET_CUPS}>
        {({ loading, error, data }) => {
          if (loading) return <h1> Loading...</h1>;
          if (error) return <h1>Error</h1>;

          return (
            <div style={styles.container}>
              {data.worldcups &&
                data.worldcups.map((par, idx) => (
                  <Button
                    variant="contained"
                    onClick={() => setYear(par.year)}
                    key={idx}
                    color="secondary"
                    component={Link}
                    to={`/${par.year}`}
                    style={styles.button}
                  >
                    <img alt={idx} style={styles.img} src={par.img} />
                    {par.country} {par.year}
                  </Button>
                ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setYear }, dispatch);

Cups.propTypes = {
  data: PropTypes.object.isRequired
};

export default graphql(GET_CUPS)(connect(null, mapDispatchToProps)(Cups));
