import React, { Component } from "react";
import Header from "../views/layouts/header";
import axios from "axios";
class Home extends Component {
    state = {
        file: "",
        filename: "",
        uploadedFile: {},
        post: ""
    };

    onChange = (e) => {
        this.setState({
            file: e.target.files[0],
            filename: e.target.files[0].name
        });

    }

    findHashtags(searchText) {

        var regexp = /\B\#\w\w+\b/g;
        let result = searchText.match(regexp);
        console.log(result);
        if (result) {
            console.log(result);
            return result;
        } else {
            return false;
        }
    }
    onPostChange = (e) => {

        // let commentString = e.target.value;
        // var pattern = /#/ig;
        // let formatedStr = this.findHashtags(commentString);
        // let string = e.target.value;
        // if (formatedStr.length > 0) {
        //     let finalString = formatedStr.map((item) => {
        //         return string.replace(item, `<b class="text-success"> ${item} </b> `);
        //     });

        //     this.setState({
        //         post: finalString
        //     })
        // }

        // console.log(data);

    }
    onSubmit = async (e) => {
        e.preventDefault();
        console.log("filename", e.target);

        let formData = new FormData();
        let res = '';
        let postStr = e.target[0].value;
        if (postStr === "") {
            alert("Please insert the comment");
            e.preventDefault();
            return false;
        }
        if (this.state.file.length === 0) {
            alert("Please select the image");
            e.preventDefault();
            return false;
        }

        formData.set('posts', postStr);
        formData.append('file', this.state.file);

        // formData.append('post', e.target[0].value);
        try {
            res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            e.preventDefault();

            console.log("response", res.data);
            const { fileName, filePath } = res.data;
            if (res.data.status === 200) {
                alert("Updated Succesfully");
                // e.preventDefault();

            } else {
                alert(res.data.msg);
                window.location.reload();

            }

        } catch (error) {
            if (error.response.status === 500) {
                console.log('There was a problem with the server');
                return res.status(500).send(error);
            } else {
                console.log(error.response.data.msg);
                return res.status(500).send(error.response.data.msg);

            }
        }
    }
    render() {
        console.log(this.state.filename);
        return (
            <React.Fragment>
                <Header></Header>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 well">
                        <h1><center>Posts</center></h1>
                        <p>Add Post</p>
                        <form onSubmit={this.onSubmit}>
                            <textarea class="form-control" name="posts" onChange={this.onPostChange} rows="3"></textarea>
                            <br></br>

                            <div class="form-group">
                                <label for="exampleInputFile">File input</label>
                                <input type="file" id="exampleInputFile" onChange={this.onChange} />
                            </div>
                            <input type="submit" className="btn btn-primary" value="Submit" />
                        </form>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
