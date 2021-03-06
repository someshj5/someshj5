import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import '../App.css'
import keep_icon from '../svg_icons/keep_icon.png'
import listView from '../svg_icons/listview.svg'
import gridView from '../svg_icons/gridview.svg'
import LeftDrawer from './LeftDrawer'
import Redirect from 'react-router-dom/Redirect'
// import GetAllNotesComponent from './GetAllNotesComponent';
import MenuComponent from './MenuComponent';
import AddNoteComponent from './AddNoteComponent';
import NoteSection from './NoteSection';
import NoteService from '../services/NoteService';



const get_NotesAll = new NoteService().getNotesAll
const getArchiveNotes = new NoteService().getArchives
const getPinnedNotes = new NoteService().getPinned
const getTrashNotes = new NoteService().getTrash
const getReminderNotes = new NoteService().getReminders
const DrawerLabelGet = new NoteService().getLabels
const SearchQuery = new NoteService().search
const LabelsNote = new NoteService().getLabelsNote






export class DashboardComponent extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            list: false,
            anchorEl: null,
            menuOpen: false,
            redirect: false,
            notes: [],
            name:null,
            searchArray:[],
            labels: [],
            search: null,
            is_search:false,

        }
        this.leftDfun = this.leftDfun.bind(this)
    }

    componentDidMount() {
        // this.PinnedGet();
        this.DrawerLabels();
        this.noteGetFunc();
        // this.DrawerLabels()

        if (sessionStorage.getItem('userdata') && (localStorage.getItem('token'))) {
            console.log("call user feed")
        }
        else {
            this.setState({ redirect: true })
        }
    }

    leftDfun = event => {
        this.setState({
            open: !this.state.open
        })
    }

    signOut = () => {
        this.setState({ redirect: true })
    }



    noteGetFunc = e => {
        get_NotesAll()
            .then(res => {
                this.setState({
                    notes: res.data
                })
            })

            .catch(error => {
                console.log("error data", error.response)

            })
    }

    DrawerLabels = () => {
        DrawerLabelGet()
            .then(res => {
                this.setState({
                    labels: res.data
                })

            })
            .catch(error => {
                console.log("label error", error.response.data)
            })
    }




    labelName(data){
    console.log("data label "+data);
    
    this.setState({
        name:data,
        notes:[]
    })
    console.log("label name from left drawer data",this.state.name)
    LabelsNote(data)
    .then(res=>{
        this.setState({
            notes: res.data.data
        })
        console.log("LAbeled note on dash data", res.data.data)
    })
    .catch(error=>{
        console.log("Labeled note on dash error", error.response.data)
    })
}



    LabelsOnDash=(data)=>{
       this.labelName(data)
    }




    ArchiveGet = () => {
        this.setState({ notes: [] })
        console.log("notes", this.state.notes);

        getArchiveNotes()
            .then(res => {
                this.setState({ notes: res.data })
            })
            .catch(error => {
                console.log("error archive ", error.response)
            })
    }

    TrashGet = () => {
        this.setState({ notes: [] })
        getTrashNotes()
            .then(res => {
                this.setState({ notes: res.data })
            })
            .catch(error => {
                console.log("error trash ", error.response)
            })
    }



    PinnedGet = () => {
        this.setState({ notes: [] })
        console.log("notes", this.state.notes);

        getPinnedNotes()
            .then(res => {
                this.setState({ notes: res.data })
            })
            .catch(error => {
                console.log("error pinned ", error.response)
            })
    }

    ReminderGet = () => {
        this.setState({ notes: [] })
        getReminderNotes()
            .then(res => {
                this.setState({ notes: res.data })
            })
            .catch(error => {
                console.log("error reminderget ", error.response)

            })

    }

    handleView = () => {
        this.setState({
            list: !this.state.list
        })

    }

    handleNoteid(data) {
        this.setState({
            id: data
        })
    }

    handleSearch = (event) => {
        this.setState({
            is_search:true,
            search: event.target.value
        })

        let query = event.target.value
   
    if(event.target.value === ""){
        this.setState({
            notes:[],
            is_search:false,
        })
        this.noteGetFunc()
    }
    else{
        this.setState({ notes: [] })
        SearchQuery(query)
        .then(res=>{
            this.setState({
                notes : res.data
            })
            console.log("search results", res.data)
            
        })
    
        .catch(error=>{
            console.log("serach errors", error)
        })
       
    }
    }
    

    
Search=()=>{
    let query = this.state.search
   
    if(this.state.search === ""){
        this.setState({
            is_search:false,
        })
    }
    if(this.state.is_search){
        this.setState({ notes: [] })
        SearchQuery(query)
        .then(res=>{
            this.setState({
                notes : res.data
            })
            console.log("search results", this.state.notes)
            
        })
    
        .catch(error=>{
            console.log("serach errors", error.response)
        })
       
    }
}


    render() {

        if (this.state.redirect) {
            return (<Redirect to={'/login'} />)
        }

        let viewIcon = listView

        if (this.state.list) {
            viewIcon = gridView
        }

       


        return (
            <div className='root' id="main">
                <AppBar position="fixed" color="default">

                    < Toolbar className='ToolBar' >

                        <IconButton onClick={this.leftDfun} edge="start" color="inherit" aria-label="menu" >
                            <MenuIcon />
                        </IconButton>

                        <div className='imgFundoo'>
                            <div>
                                <img src={keep_icon} alt='keep_icon'></img>
                            </div>
                            <div className='icon'>
                                <p>fundooNotes</p>
                            </div>
                        </div>

                        <div className='search'>
                            <InputBase

                                style={{ width: 390 }}
                                id="search"
                                onChange={this.handleSearch}
                                className="InputBase"
                                placeholder="Search" />

                            <div className='searchIcon'>
                                <SearchIcon onClick={this.Search} />
                            </div>

                        </div>
                        <div onClick={this.handleView} className="listviewIcon"><img src={viewIcon} alt="listicon" /></div>

                        <div><MenuComponent signOut={this.signOut} /></div>
                    </Toolbar>


                </AppBar>
                <LeftDrawer LabelsOnDash={this.LabelsOnDash} labelName={this.labelName} labels={this.state.labels} DrawerLabels={this.DrawerLabels} ReminderGet={this.ReminderGet} noteGetFunc={this.noteGetFunc} TrashGet={this.TrashGet} ArchiveGet={this.ArchiveGet} open={this.state.open} ClickSec={this.ClickSec} />
                <AddNoteComponent noteGetFunc={this.noteGetFunc} />
                <p id="pinnedTitle">Pinned</p>
                <NoteSection leftDfun={this.leftDfun} labelName={this.labelName} labelsArrayDash={this.state.labels} Search={this.Search} handleSearch={this.handleSearch} layout={this.state.list} DrawerLabels={this.DrawerLabels} ReminderGet={this.ReminderGet} TrashGet={this.TrashGet} ArchiveGet={this.ArchiveGet} noteGetFunc={this.noteGetFunc} note={this.state.notes} labels={this.state.labels} />

            </div>
        )
    }
}

export default DashboardComponent