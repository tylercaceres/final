import React, { Component, Fragment } from "react";
import Card from "react-bootstrap/Card";
import { Button, Nav, Form, FormControl, Row } from "react-bootstrap";
import { RecipeView } from "./components/Recipe";
import uuidv4 from "uuid/v4";
import IngredientModal from "./components/IngredientModal";
import Navbar from "react-bootstrap/Navbar";
import "./styles/Card.css";
import NewUser from "./components/NewUser";
import Toggle from "./utilities/Toggle";

class NavCard extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.changeText = this.changeText.bind(this);
    this.onHide = this.onHide.bind(this);

    this.state = {
      name: this.currentUser,
      value: "",

      buttonText: false,
      savedIngredients: [],
      showIngredientModal: false
    };
  }
  changeText = () => {
    this.setState({
      buttonText: !this.state.buttonText
    });
  };

  onHide = () => {
    this.setState({ showIngredientModal: false });
  };
  getSavedIngredients = e => {
    e.preventDefault(console.log("display pantry"));

    fetch(`/api/user_ingredients/${this.currentUser}`)
      .then(response => response.json())
      .then(myjson => {
        console.log(myjson);
        this.setState({ savedIngredients: myjson });
      })
      .then(() => {
        this.setState({ showIngredientModal: true });
      })
      .catch(error => {
        console.log("error =>", error);
      });
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    fetch("/api/user_ingredients", {
      method: "POST",
      body: JSON.stringify({ name: this.state.name }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) alert("ingredient saved");
      })
      .then(() => this.setState({ name: "" }))

      .catch(error => console.error("Error:", error));
  };
  // Card key=... below could be an issue
  render() {
    return (
      <div>
        <Navbar className="Navbar" bg="light" expand="lg">
          {/* <Navbar.Brand href="#home">RecipEasy</Navbar.Brand> */}
          <h1 class="main-title">
            recip
            <font color="#42b25d">E</font>
            asy
          </h1>
          <Fragment>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto"></Nav>

              {this.props.currentUser ? (
                <Fragment>
                  <h5 class="logout-text" font-family="Helvetica Neue">
                    Logged in as: {this.props.currentUser}
                  </h5>
                  <Button
                    variant="outline-danger"
                    onClick={this.props.handleLogout}>
                    Logout
                  </Button>
                </Fragment>
              ) : (
                <Fragment>
                  <NewUser
                    HandleUpdate={this.props.HandleUpdate}
                    updateCurrentUser={this.props.updateCurrentUser}
                    name={this.props.name}
                  />
                </Fragment>
              )}
            </Navbar.Collapse>
          </Fragment>
        </Navbar>

        <div>
          <Card key={uuidv4} className="Card-container">
            <Card.Body>
              <Card.Title></Card.Title>
              <form class="pantry-textbox" onSubmit={this.handleSubmit}>
                <input
                  key={uuidv4}
                  placeholder="add item"
                  value={this.state.name}
                  type="text"
                  onChange={this.handleChange}
                />
              </form>
              <Button
                className="button-add-pantry"
                size="sm"
                variant="outline-success">
                +
              </Button>
              <Fragment>
                <Button
                  className="button-display-pantry"
                  variant="outline-success"
                  onClick={this.getSavedIngredients}
                  size="sm">
                  Display Pantry Items
                </Button>
              </Fragment>

              <Fragment>
                <IngredientModal
                  hide={() => this.setState({ showIngredientModal: false })}
                  show={this.state.showIngredientModal}
                  savedIngredients={this.state.savedIngredients}
                />
              </Fragment>
            </Card.Body>
          </Card>
        </div>

        <Toggle
          render={({ on, toggle }) => (
            <div>
              {on && (
                <div>
                  <Row style={{ justifyContent: "center" }}>
                    {this.props.savedRecipes.map(savedRecipe => {
                      return (
                        <Fragment>
                          <RecipeView
                            key={savedRecipe.id}
                            id={savedRecipe.id}
                            name={savedRecipe.name}
                            image={savedRecipe.image}
                          />
                        </Fragment>
                      );
                    })}
                  </Row>
                </div>
              )}
              <button
                onClick={() => {
                  toggle();
                  this.changeText();
                }}>
                {!this.state.buttonText
                  ? "Show Saved Recipes"
                  : "Hide Saved Recipes"}
              </button>
            </div>
          )}
        />
      </div>
    );
  }
}

export default NavCard;
