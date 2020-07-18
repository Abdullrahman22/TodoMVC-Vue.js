

var filters = {    // object of filters so i can use any funcs of filter when call this var
    all: function (todos) {
        return todos;
    },
    active: function (todos) {
        return todos.filter(function (todo) {
            return !todo.completed;
        });
    },
    completed: function (todos) {
        return todos.filter(function (todo) {
            return todo.completed;
        });
    }
};

var todos_storage = {  // object of todos_storage so i can use any funcs of todos_storage when call this var
    fetch: function(){
        var todos = localStorage.getItem('todos')  || '[]' ; // '[]' ==> beacause if is empty  // can't use return in one line because it will convert to if statment
        return  JSON.parse( todos ) // to convert todos from 'string' to 'object'
    },
    save: function(todos){
        localStorage.setItem(  'todos' , JSON.stringify(todos)  ) // to convert todos from 'object' to 'string'
    }

}

new Vue({

    el: '.todoapp',

    data: {
        newTodo: '',
        todos: todos_storage.fetch , // instead of create fixed object { title: "test1", completed : true }
        visibility: 'all',
        editingTodo: null ,
        oldEditingTodo: null ,
    },
    
    computed: {
        filtersTodos: function(){
            return  filters[ this.visibility ] (this.todos) ;
        },
        remainingTodos: function(){
            return filters.active( this.todos ).length;
        },
        remainingtext: function(){
            if( filters.active( this.todos ).length > 1 )
                return "items";

            return "item";
        },
        markAll : {
            get: function(){
                return this.remainingTodos == 0 ;  // return true if remainingTodos == 0
                // OR 
                // if( this.remainingTodos == 0 )
                //     return true;
            },
            set: function( value ){
                this.todos.forEach( function (todo) {
                    todo.completed = value
                });
            }
        }
    },

    methods: {
        destroyTodo: function(todo){
            var index = this.todos.indexOf(todo);
            this.todos.splice(index, 1);
        },
        addTodo: function(){
            var value = this.newTodo && this.newTodo.trim();  // trim() to removed whitespace
            if (!value) 
                return ;
            this.todos.push(
                { title: this.newTodo , completed : false }
            );
            this.newTodo = '';
        },
        clearCompleted: function(){
            this.todos = filters.active( this.todos ); // show only active todos 
        },
        editTodo: function(todo){
            this.editingTodo = todo   // equal editingTodo with specified
            this.oldEditingTodo = todo.title
        },
        saveEditingTodo: function(){
            if( this.editingTodo.title == '' )  
                this.destroyTodo( this.editingTodo );    // destroy this todo if todo.title empty
            
                this.editingTodo = null    // empty editingTodo (cancle edit)
            },
        cancleEditingTodo(){
            this.editingTodo.title = this.oldEditingTodo
            this.editingTodo = null    // empty editingTodo (cancle edit)
        }
    },

});