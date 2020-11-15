import React, { Component } from "react"
import axios from "axios"

import "./App.scss"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: []
    }
  }

  onChange = async (e) => {
    try {
      const files = e.target.files
      const formData = new FormData()
      formData.append("myFile", files[0])
  
      let imageRes = await axios.post("/api/add/image", formData)
      console.log(imageRes.data)
    }
    catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="app">
        <p>Add Images</p>
        <input type="file" onChange={this.onChange}/>
        <img src="http://localhost/Data/images/eee1e54294a8cd39e55f9937a484cfc798893c27_full.jpg" alt="upload"/>
        <button>Post</button>
      </div>
    )
  }
}

export default App;
