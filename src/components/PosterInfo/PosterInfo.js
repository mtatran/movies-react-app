import React, {Component} from 'react';
import classes from './PosterInfo.module.css'
import axios from 'axios';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import {Atoms, Organisms, Molecules, Form, InputDropdown} from "@we.org/shared-component-library";


class PosterInfo extends Component {
    state = {
        loadedMovie: null
    }
    componentDidMount(){
        console.log(this.props.match.params.id);
        if (this.props.match.params.id){
            //new movie
            if (!this.state.loadedMovie || (this.state.loadedMovie && this.state.loadedMovie.id !== this.props.match.params.id)) {
                axios.get('https://api.themoviedb.org/3/movie/' + this.props.match.params.id + '?api_key=0233eeb82ef3714df67f7e2db8e6ea28')
                .then(response => {
                    console.log(response.data)
                    this.setState({loadedMovie: response.data});
                }).catch(error => {

                });

                //go through promises and async

            //     axios.get('1').then(get('2')).then(get('3')).catch(console.log(err))

            //     axios.get('1', function() => { 
            //         axios.get('2', function() {
            //             axios.get('3', function() {}, function(){fdsfdsfdsf}
            //         }, function(fdsfdsfds))
            //     }, function() => {fdsfdsf})

            //     async function() {
            //     try {
            //         await axios.get(1)
            //         await axios.get(2)
            //         await axios.get(3)
            //     } catch(error)
            }
           
        }
    }
    render() {
        let content = null;
        // const [element1, element2] = [1,2]
        // const {element1, element2} = {element1: 1, element2: 2}
        // const foo = {element1: 1, element2: 2}
        // const {element1, element2} = foo

        if (this.props.match.params.id){
            content = null;
        }
        //check due to asynchronous nature
        const { loadedMovie } = this.state
        if (loadedMovie) {
            content = (
                <div>
                {/* <Atoms.Container>
                        <Atoms.Col md={{span: 6}} > 
                            <div style={{backgroundColor: "red", height: "50px", marginTop: "100px"}}> 6 </div>
                        </Atoms.Col>
                        <Atoms.Col md={{span: 6}} > 
                            <div style={{backgroundColor: "blue", height: "50px", marginTop: "100px"}}> 6 </div>
                        </Atoms.Col>
                </Atoms.Container> */}
                
                <div className={classes.PosterInfo}>
                    <h1>{this.state.loadedMovie.title}</h1>   

            
                    <div className={classes.Columns}>
                        <img 
                            className={classes.img} 
                            src={'http://image.tmdb.org/t/p/w342/' + this.state.loadedMovie.poster_path} 
                            alt={this.state.loadedMovie.title}/>

                        <div className={classes.TextContainer}>

                            <h2>{this.state.loadedMovie.release_date.substring(0,4)}</h2> 
                            <h3>{this.state.loadedMovie.runtime} mins</h3> 
                            <h3>{this.state.loadedMovie.vote_average + '/10'}</h3>

                            <p>{this.state.loadedMovie.overview}</p> 

                            <button className={classes.Buttons}>MARK AS FAVOURITE</button>
                            <button className={classes.Buttons}>REVIEW</button>
                            <button className={classes.Buttons}>SHARE</button>

                            {/* <div style={{display: 'inline-block'}}>
                                <div style={{width: "20px"}} >
                                    <Atoms.Button className={classes.Buttons} size="M" onClickHandler={() => alert('Marked as favourite')} >MARK AS FAVOURITE</Atoms.Button>
                                </div>
                                <div style={{width: '20px'}}  >
                                    <Atoms.Button className={classes.Buttons} size="M" onClickHandler={() => alert('Reviewed')} >REVIEW</Atoms.Button>
                                </div>
                                <div style={{width: '20px'}}  >
                                    <Atoms.Button className={classes.Buttons} size="M" onClickHandler={() => alert('Shared')} >SHARED</Atoms.Button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    
                    <div className={classes.Trailer}>
                        <hr/>
                        <h2>Trailers:</h2> 
                        <ul>
                            <li>Trailer 1</li>
                            <Atoms.VideoPlayer title="Movie1" videoId="123123" />
                        </ul>
                        <hr/>


                        {/* Review */}
                        <Organisms.TabSection
                            tabs={[
                                {
                                    key: "Reviews",
                                    text: "Reviews",
                                    content: [
                                        <Molecules.Accordion>
                                            <Molecules.AccordionItem
                                                title="Review 1"
                                                id={1}
                                                name="accordion">
                                                Body text. Word limit: 250 words
                                            </Molecules.AccordionItem>
                                            <Molecules.AccordionItem
                                                title="Review 2"
                                                id={1}
                                                name="accordion">
                                                Body text. Word limit: 250 words
                                            </Molecules.AccordionItem>
                                            <Molecules.AccordionItem
                                                title="Review 3"
                                                id={1}
                                                name="accordion">
                                                Body text. Word limit: 250 words
                                            </Molecules.AccordionItem>
                                        </Molecules.Accordion>
                                    ],
                                },
                                {
                                    key: "Leave a review",
                                    text: "Leave a review",
                                    content: [
                                        <div style={{ width: "600px", height: "300px" }}>
                                            <Molecules.InputTextArea
                                            name="text-area-input"
                                            title="This is a title"
                                            label="Labelled Text Area Input: Error"
                                            placeholder="Enter text here"
                                            />
                                        </div>
                                    ],
                                },
                                {
                                    key: "Leave a rating",
                                    text: "Leave a rating",
                                    content: [
                                        <Atoms.BodyText size="M">Select the number of stars you would like</Atoms.BodyText>
                                    ],
                                }
                            ]}
                        />
                        <InputDropdown
                            options={[
                                { value: 1, label: "one" },
                                { value: 2, label: "two" },
                                { value: 3, label: "three" },
                            ]}
                            name="foo"
                            value={2}
                            onChangeHandler={() => alert("hi")}/>

                        
                        
                    </div>
                    
                    
                </div>
            </div>
   
            );
        }
        return (
            <div>
                <Toolbar title="Movie Detail" back={true} />
                {content}
            </div>
        );
        //return <h1>Hi</h1>;
    }
};

export default PosterInfo;

