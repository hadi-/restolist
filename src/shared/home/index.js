import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchData } from './../../../redux/resto';
import { fetchCategoryData } from './../../../redux/category';
import RestoList from './../../component/RestoList/RestoList';
import TopNav from './../../component/TopNav/TopNav';

class Home extends Component {
  static initialAction() {
    return fetchData();
    return fetchCategoryData();
  }

  componentDidMount() {
    if (!this.props.resto.fetched) {
      this.props.dataFetchAction();
    }
    if (!this.props.category.fetched) {
      this.props.catFetchAction();
    }
  }

  render() {
    const { resto, category } = this.props;
    return (
      <div>
        <TopNav category={category.list} />
        <RestoList resto={resto.list} category={category.list} />
      </div>
    );
  }
}

Home.propTypes = {
  resto: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  category: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  dataFetchAction: PropTypes.func.isRequired,
  catFetchAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  resto: state.resto,
  category: state.category,
});

const mapActionsToProps = {
  dataFetchAction: fetchData,
  catFetchAction: fetchCategoryData,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
