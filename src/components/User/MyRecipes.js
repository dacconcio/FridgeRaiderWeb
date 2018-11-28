import React, { Component, Fragment } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import MyUploadedRecipes from './MyUploadedRecipes';
import MySavedRecipes from './MySavedRecipes';
import NewRecipe from '../Recipes/NewRecipe';

class MyRecipes extends Component {
  constructor() {
    super();
    this.state = {
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    const { handleChange } = this;
    return (
      <Fragment>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            label={<span style={{ fontSize: 20 }}>Uploaded Recipes</span>}
          />
          <Tab
            label={<span style={{ fontSize: 20 }}>Saved Recipes</span>}
          />
          <Tab label={<span style={{ fontSize: 20 }}>New Recipe</span>} />
        </Tabs>
        {value === 0 && <MyUploadedRecipes />}
        {value === 1 && <MySavedRecipes />}
        {value === 2 && <NewRecipe />}
        <div id="main" />
      </Fragment>
    );
  }
}
export default MyRecipes;
