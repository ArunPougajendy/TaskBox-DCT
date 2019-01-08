import React from 'react';



class AddTasks extends React.Component {
    constructor(props) {
        super(props)
        this.tasks =[]
        this.state ={
            title: '',
            actionPlan:'',
            category:'',
            highPriority:false,
            mediumPriority:false,
            lowPriority:false,
            isCompleted: false
        }
        this.handleTitle = this.handleTitle.bind(this)
        this.handleActionPlan = this.handleActionPlan.bind(this)
        this.handleCategory = this.handleCategory.bind(this)
        this.handlePriority = this.handlePriority.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.removeHandle = this.removeHandle.bind(this)
        this.handleChange = this.handleChange.bind(this)
        if(!window.localStorage.tasks) {
            window.localStorage.setItem('tasks',[]);
        }
    }
    handleTitle(event) {
        this.setState({
            title: event.target.value
        })
    }
    handleActionPlan(event) {
        this.setState({
            actionPlan: event.target.value
        })
    }
    handleCategory(event){
        this.setState({
            category: event.target.value
        })
    }
    handlePriority(event){
        if(event.target.value === 'high') {
            this.setState({highPriority:true,mediumPriority:false,lowPriority:false})
        } else if(event.target.value === 'medium') {
            this.setState({highPriority:false,mediumPriority:true,lowPriority:false})
        } else {
            this.setState({highPriority:false,mediumPriority:false,lowPriority:true})
        }    
    }
    handleSubmit(event) {
        event.preventDefault()
        if(localStorage.tasks) {
            this.tasks = JSON.parse(localStorage.tasks)
            this.tasks.push(this.state)
            window.localStorage.setItem('tasks',JSON.stringify(this.tasks))
            this.setState({
                title: '',
                actionPlan:'',
                category:'',
                highPriority:false,
                mediumPriority:false,
                lowPriority:false,
                isCompleted: false                
            })
        } else {
            this.tasks.push(this.state)
            window.localStorage.setItem('tasks',JSON.stringify(this.tasks))
            this.setState({
                actionPlan:'',
                title: '',
                category:'',
                highPriority:false,
                mediumPriority:false,
                lowPriority:false,
                isCompleted: false                
            })
        }
    }
    removeHandle(tasks,deleteTask) {
          let newTasks = tasks.filter((task)=>{
             return task.title !== deleteTask
         })
         this.tasks = newTasks
         window.localStorage.setItem('tasks',JSON.stringify(this.tasks))
         this.setState({
            actionPlan:'',
            title: '',
            category:'',
            highPriority:false,
            mediumPriority:false,
            lowPriority:false,
            isCompleted: false                
        })
        
    }
    handleChange(tasks,updateTask,status) {
        this.setState({
            isCompleted: !status
        })
        let foundTask = tasks.find((task) =>{
            return task.title === updateTask.title
        })
        foundTask.isCompleted = status
        window.localStorage.setItem('tasks',JSON.stringify(tasks))
        this.setState({
            actionPlan:'',
            title: '',
            category:'',
            highPriority:false,
            mediumPriority:false,
            lowPriority:false,             
        })
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label> Title 
                        <input type="text" name="title" value={this.state.title} onChange = {this.handleTitle} />
                    </label><br/>
                    <label> ACtion Plan
                        <input type="textarea" name="actionPlan" value={this.state.actionPlan} onChange={this.handleActionPlan} />
                    </label> <br/>
                    <label> category
                        <select name="category" value={this.state.category} onChange={this.handleCategory} >
                            <option value="">Select</option>
                            <option value="person">Person</option>
                            <option value="office">Office</option>
                        </select>
                    </label><br/>
                    <label> Priority
                        <input type="radio" name="priority" value="high" checked={this.state.highPriority} onChange={this.handlePriority} /> High
                        <input type="radio" name="priority" value="medium" checked={this.state.mediumPriority} onChange={this.handlePriority} />Medium
                         <input type="radio" name="priority" value="low" checked={this.state.lowPriority} onChange={this.handlePriority} />Low
                    </label> <br/>
                    <input type="submit" />
                    <input type="reset" />
                </form>
                { localStorage.tasks.length > 0 && <DisplayTasks tasks={localStorage.tasks} removeHandle = {this.removeHandle} handleChange={this.handleChange} /> }  
            </div>
        )
    }
}

function DisplayTasks(props) {
    let tasks = JSON.parse(props.tasks)
    return (
        <div>
            <ul>
                {tasks.map((task) => {
                    return (<li key={task.title}>{task.title} : {task.actionPlan} : { (task.highPriority) ? 'High' : (task.mediumPriority) ? 'Medium' : 'Low' } <input type="checkbox" checked = {task.isCompleted} onChange = { ()=>{
                        props.handleChange(tasks,task,!task.isCompleted)
                    } }/>
                    <button onClick= {()=>{
                        props.removeHandle(tasks,task.title)
                    }}> Remove </button></li>)
                })}
            </ul>
        </div>
    )
}

export default AddTasks;