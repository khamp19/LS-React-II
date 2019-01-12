import React, { Component } from 'react';
import './Comments.css'



class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            newComment: {
                username: '',
                text: ''
            }
        }
    }

    //save props.comments to localstorage
    //set comments to localstorage data
    persistComments = () => {
        let commentStorage = this.props.comments;
        localStorage.setItem("commentStorage", JSON.stringify(commentStorage));
        commentStorage = localStorage.getItem("commentStorage");
        commentStorage = JSON.parse(commentStorage);
        this.setState({
            comments: commentStorage,
        });
    }
    
    handleCommentInput = (e) => {
        this.setState({ 
            newComment: {
                username: this.state.newComment.username,
                text: e.target.value 
            }
        })
    }
    
    //update comments on localstorage when new comment is added
    AddComment = (e) => {
        e.preventDefault();
        const commentListArray = this.state.comments;
        const newComment = {
            username: this.state.newComment.username,
            text: this.state.newComment.text
        };
        commentListArray.push(newComment);
        this.setState({
            comments: commentListArray,
            newComment: {
                username: '',
                text: ''
            }
        })
        localStorage.setItem("commentStorage", JSON.stringify(commentListArray));
        console.log('with new comment', commentListArray);
    }
    

    //set comment username to logged in user from localstorage
    getUser = () => {
        let user = localStorage.getItem("loggedInUsersArray");
        user = JSON.parse(user);
        if (user) {
            this.setState({
                newComment: {
                    username: user[0].username
                }
            })
        } else {
            this.setState({
                newComment: {
                    username: 'a_new_user',
                }
            })
        }
    }

    componentDidMount() {
        this.persistComments();
        this.getUser();        
    }

    render() {
        const { comments } = this.state;
        const { text } = this.state.newComment;
        return (
            <div className="Comments">
                <div> {comments.length === 0 ? (
                    <p>"no props yet"</p>
                    ) : (
                        <div>
                            <div>{comments.map((comment, i) => {
                                return (
                                    <div key={i}>
                                    <div>{`${comment.username} says ${comment.text}`}</div>
                                    </div>
                                )
                            })}</div>
                            <div>
                                <form onSubmit={this.AddComment}>
                                    <input 
                                        placeholder="enter a comment"
                                        name="comment"
                                        type="text"
                                        value={text}
                                        onChange={this.handleCommentInput}
                                    />
                                </form>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
        )
    }
}
                
export default Comments;