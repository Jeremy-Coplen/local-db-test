import React, { Component } from "react"
import axios from "axios"

import Image from "./Components/Image/Image"
import "./App.scss"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [],
      img: ""
    }
  }

  async componentDidMount() {
    try{
      let imagesRes = await axios.get("/api/get/images")
      this.setState({
        images: imagesRes.data
      })
    }
    catch(err) {
      console.log(err)
    }
  }

  onChange = async (e) => {
    try {
      const files = e.target.files
      const formData = new FormData()
      formData.append("myFile", files[0])
  
      let imageRes = await axios.post("/api/add/image", formData)
      this.setState({
        img: imageRes.data
      })
    }
    catch(err) {
      console.log(err)
    }
  }

  postImage = async () => {
    try {
      if(this.state.img === "") {
        alert("No Image to post")
        return
      }
      let postRes = await axios.post("/api/post/image", {img: this.state.img})
      await alert(`${postRes.data}`)

      let imagesRes = await axios.get("/api/get/images")
      this.setState({
        images: imagesRes.data,
        img: ""
      })
    }
    catch(err) {
      console.log(err)
    }
  }

  render() {
    console.log(this.state)
    let images
    if(this.state.images.length > 0) {
      images = this.state.images.map((img, i) => {
        return (
          <Image key={i} img={img.url} />
        )
      })
    }
    return (
      <div className="app">
        <div></div>
        <div className="upload_image_container">
          <p>Add Images</p>
          <input type="file" onChange={this.onChange}/>
          <img src={this.state.img} alt="upload"/>
          <button onClick={this.postImage}>Post</button>
        </div>
        <div className="posted_images">
          <div>
            <h1>Posted Images</h1>
            {images}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
