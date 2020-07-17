

// var filters = {
//     all: function (todos) {
//         return todos;
//     },
//     active: function (todos) {
//         return todos.filter(function (todo) {
//             return !todo.completed;
//         });
//     },
//     completed: function (todos) {
//         return todos.filter(function (todo) {
//             return todo.completed;
//         });
//     }
// };


new Vue({
    el: '.todoapp',
    data: {
        newTodo: '',
        todos: [
            { title: "test1", compeleted : true } ,
            { title: "test2", compeleted : false } ,
        ],
        visibility: 'all',
    },
    computed: {
        // filtersTodos: function(){
            
        // }
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
                { title: this.newTodo , compeleted : false }
            );
            this.newTodo = '';
        },
    },
});