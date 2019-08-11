import React from 'react';
import gql from 'graphql-tag'
import {Query, graphql} from "react-apollo"
import {connect} from "react-redux";
import Card from "./Card"
import {bindActionCreators} from "redux";
import {setYear} from  "../actions/index.js"
import PropTypes from 'prop-types';

const style = {
    listStyle: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "10%"

    },
    itemStyle: {
        margin: "2%",
    }

};

const GET_PLAYERS = gql`
    query ($cup:Int){
       players(cup:$cup){
            name
            position
            img
        }
    }
`

class Listgql extends React.Component {

   componentDidMount = () => {
        const year = this.props.match.params.year
        this.props.setYear(year)
    }

    render() {

        return (

            <Query query={GET_PLAYERS} variables={{cup: this.props.yearState}}>
                {({loading, error, data}) => {
                    if (loading) return <h1>Loading...</h1>;
                    if (error) return <h1>Error</h1>;

                    return (
                        <div style={style.listStyle}>
                            {data.players && data.players
                                .map((par, idx) => (
                                    <Card key={idx}
                                          name={par.name}
                                          position={par.position}
                                          img={par.img}
                                    />
                                ))}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

const mapStateToProps = store => ({
    yearState: store.playerState.yearState,

});

const mapDispatchToProps = dispatch =>
    bindActionCreators({setYear}, dispatch);

Listgql.propTypes = {
    data: PropTypes.object.isRequired,
    setYear:PropTypes.func,
};

export default graphql(GET_PLAYERS)(connect(mapStateToProps,mapDispatchToProps)(Listgql));