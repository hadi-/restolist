import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class RestoList extends Component {
  render() {
    const { resto } = this.props;
    return (
      <div className="RestoList">
        <Helmet
          title="Resto List"
        />
        <ListGroup>
            {resto && resto.map((data) =>
              <ListGroupItem>{data.name}</ListGroupItem>
            )}
           
          </ListGroup>
      </div>
        );
      }
    }

RestoList.propTypes = {
          resto: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };
  
export default RestoList;
