import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchData } from './../../../redux/resto';
import { fetchCategoryData } from './../../../redux/category';
import { fetchCategoryDataById } from './../../../redux/category';
import RestoList from './../../component/RestoList/RestoList';
import TopNav from './../../component/TopNav/TopNav';


class Category extends Component {

  componentDidMount() {
    const { params } = this.props.match;
      this.props.catFetchAction();
      this.props.catFetchIdAction(params.id);
  }
 

  render() {
    const { category } = this.props;

    return (
      <div>
        <TopNav category={category.list} />
        <RestoList resto={category.restolist} />
      </div>
    );
  }
}

Category.propTypes = {
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
  catFetchAction: fetchCategoryData,
  catFetchIdAction: fetchCategoryDataById,
};

export default connect(mapStateToProps, mapActionsToProps)(Category);
