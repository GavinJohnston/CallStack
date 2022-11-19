import "./Home.css";

import React from "react";

import Header from "./HomeComponents/Header.js";
import SearchContainer from "./HomeComponents/SearchContainer.js";
import ListPanel from "./HomeComponents/ListPanel.js";
import ViewPanel from "./HomeComponents/ViewPanel.js";
import Footer from "./HomeComponents/Footer.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      approved: [],
      selected: [],
    };
  }

  render() {
    return (
      <div>
        <Header />
        <SearchContainer />

        <div className="container container-main">
          <ListPanel
            approved={this.state.approved}
            onViewItem={(obj) => {
              this.viewItem(obj);
            }}
          />
          <ViewPanel itemInfo={this.state.selected} />
        </div>
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    this.populateState();
  }

  async populateState() {
    const responseApproved = await fetch(
      `https://localhost:7171/approvedList`,
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const Approved = await responseApproved.json();

    this.setState({
      approved: Approved,
      selected: Approved[0],
    });
  }

  viewItem = (obj) => {
    this.setState({
      selected: obj,
    });
  };
}

export default App;
