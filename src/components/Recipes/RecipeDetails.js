import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardHeader, CardContent, Typography, Divider, TextField, MenuItem, MySnackbarContentWrapper, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { getRecipe, postReview } from '../../store';
import { FacebookShareButton, GooglePlusShareButton, TwitterShareButton, PinterestShareButton } from 'react-share'
import { FacebookIcon, TwitterIcon, GooglePlusIcon, PinterestIcon } from 'react-share';

class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      rating: '',
      description: '',
      warningRating: false,
      warningDescription: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.postReview = this.postReview.bind(this)
  }

  componentDidMount() {
    this.props.getRecipe(this.props.id)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.recipe !== this.props.recipe) {
      this.setState({
        recipe: this.props.recipe
      })
    }
  }

  handleChange(e) {
    const state = this.state
    state[e.target.name] = e.target.value * 1 ? e.target.value * 1 : e.target.value
    this.setState({
      state 
    })
  }

  postReview() {
    let valid = true
    if(isNaN(this.state.rating) || this.state.rating === null || this.state.rating === '') {
      console.log('rating!!!!')
      valid = false;
      this.setState({
        warningRating: true
      })
    } else if(this.state.warningRating){
      this.setState({
        warningRating: false
      })
    }
    if(this.state.description === null || this.state.description === '') {
      console.log(`description!!!!  ${this.state.description}`)
      valid = false;
      this.setState({
        warningDescription: true
      })
    } else if(this.state.warningDescription){
      this.setState({
        warningDescription: false
      })
    }
    const review = {
      rating: this.state.rating,
      description: this.state.description
    }
    if(valid) {
      console.log('done!!!!')
      this.props.postReview( this.state.recipe.id, this.props.authenticatedUser.id, review )
    }
  }

  render() {
    const { classes } = this.props;
    const { recipe, rating, description, warningDescription, warningRating } = this.state
    const { handleChange, postReview } = this
    const ratings = [1, 2, 3, 4, 5]
    if(!recipe.id) return null;
    let numRatings = 0;
    let totalRating = 0;
    if(recipe.reviews) {
      console.log(recipe.reviews[0].relation)
      recipe.reviews.map( review => {
        numRatings += 1;
        totalRating += review.relation.rating
      })
    }
    const avgRating = Math.ceil(totalRating / numRatings)
    console.log(recipe.id)

    return (
      <Fragment>
        <div id="recipeBack" />
        <div className="recipeContainer">
        <h1>{recipe.name}</h1>
        <Typography component="p" id="recipeInfo" variant="subheading" gutterBottom={true} >
        Avg. Rating: <img src={`/dist/rating/${avgRating}.png`} className="avgRating" />  |  Cuisine: {recipe.cuisine[0].properties.name}  |  Category: {recipe.category[0].properties.name}
        </Typography>
        <div className={"topRecipe"}>
          <img src={recipe.imageUrl} style={{ width: "575px", maxWidth: "70%", height: "auto", alignSelf: "start", padding: "25px", border: ".5px solid #bbb", marginTop: "25px" }} />
          <div style={{ width: "400px", marginTop: "25px" }}>
            <Card id="ingredientsPaper">
              <CardContent>
                <Typography component="div" variant="subheading" gutterBottom={true} >
                  <CardHeader title="Ingredients" style={{textAlign: "center"}} />
                </Typography>
                <Divider className={classes.divider}/>
                {
                  recipe.ingredients.map((ingredient, index) => 
                    <Typography key={index} component="p" variant="subheading" gutterBottom={true} >
                      {`${ingredient.relation.measure} ${ingredient.properties.name}`}
                    </Typography> )
                }
              </CardContent>
            </Card>
            <div className="socialContainer">
              <div style={{width: "40px"}}></div>
              <FacebookShareButton url={`https://fridge-raider-capstone.herokuapp.com/#/recipes/${recipe.id}`} quote='I just raided my fridge!'>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
  
              <TwitterShareButton url={`https://fridge-raider-capstone.herokuapp.com/#/recipes/${recipe.id}`} title="I just raided my fridge!">
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
  
              <GooglePlusShareButton url={`https://fridge-raider-capstone.herokuapp.com/#/recipes/${recipe.id}`}>
                <GooglePlusIcon size={32} round={true} />
              </GooglePlusShareButton>
              <div style={{width: "40px"}}></div>
            </div>
          </div>
        </div>


        <hr style={{ border: ".5px solid #ddd" }} />
          <div className="recipeInstructions">
            <div style={{ gridColumnEnd: 'span 12', fontSize: "1.3em" }}>
              Instructions:
            </div>
            <ul style={{ gridColumnEnd: 'span 12', fontSize: "1.0em" }}>
              {recipe.instructions.split(". ").map( (instruction, ix) => <li key={ix} className="instruction">{instruction}</li>)}
            </ul>
          </div>
        </div>
        <div className="reviewBlock recipeContainer">
          <div style={{ gridColumnEnd: 'span 12' }}>
            <h2 className="reviewHead">Reviews</h2>
              {this.props.authenticatedUser.id ?
              <form onSubmit={postReview} style={{ textAlign: "center", border: ".5px solid #666", padding: "25px", backgroundColor: "#f9f9f9", margin: 0}}>
                Rating:<br />
                <TextField
                  id="rating"
                  name="rating"
                  select
                  label="Select"
                  className="textField"
                  value={rating}
                  onChange={handleChange}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please rate the recipe."
                  margin="normal"
                  variant="outlined"
                >
                  {ratings.map(rating => (
                    <MenuItem key={rating} value={rating}>
                      {`${rating} Star${rating > 1 ? 's' : ''}`}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <TextField
                  id="description"
                  name="description"
                  label="Review the recipe"
                  placeholder="Placeholder"
                  onChange={handleChange}
                  value={description}
                  multiline
                  className="textFieldLarge"
                  margin="normal"
                  variant="outlined"
                  style={{ width: "1000px", maxWidth: "80%"}}
                />
                <br />
                <Button variant="contained" aria-label="Submit" onClick={postReview}>
                  Submit
                </Button>
              </form>
              :
              null}
              {
                recipe.reviews.map((review, index) => 
                  <div key={index} className="review">
                    <h3 className="reviewAuthor">{review.properties.name}</h3>
                    <img src={`/dist/rating/${review.relation.rating}.png`} className="rating" />
                    <p className="reviewBody">{review.relation.description}</p>
                  </div> )
              }
          </div>
        </div>
      </Fragment>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
    margin: theme.spacing.unit * 5,
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textFieldLarge: {
    width: "1000px",
    maxWidth: "80%",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const mapStateToProps = ({recipe, authenticatedUser},{ id }) => {
  return {
    recipe,
    authenticatedUser,
    id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipe: (id) => dispatch(getRecipe(id)),
    postReview: (recipeId, userId, review) => dispatch(postReview(recipeId, userId, review))
  }
}

RecipeDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RecipeDetails));
