import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


class Node {
    constructor(val) {
        this.data = val;
        this.next = null;
        this.prev = null;
    }
}

class DoubleNode {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    isEmpty() {
        if (this.head == null) return true;
        return false;
    }
    addItem(val) {
        let temp = new Node(val)
        if(this.head == null) {
            this.head = temp
            this.tail = temp
        } else {
            temp.prev = this.tail;
            this.tail.next = temp;
            this.tail = this.tail.next;
        }
    }
    display() {
        if(!this.isEmpty()) {
            let curr = this.head;
            while (curr !== null) {
                console.log(curr.data)
                curr = curr.next;
            }
        }
    }
    complete(val) {
        if(!this.isEmpty()) {
            let curr = this.head;
            while (curr !== null) {
                if(curr.data.date == val) {
                    curr.data.completed = !curr.data.completed
                    curr = null
                } else {
                    curr = curr.next;   
                }
            }
        }
    }
    deleteItem(val) {
        if(!this.isEmpty()) {
            let curr = this.head;
            while (curr !== null) {
                if(curr.data.date == val) {
                    if(this.head.data.date == this.tail.data.date) {
                        this.head = null
                        this.tail = null
                    } else if(curr.data.date == this.head.data.date) {
                        curr.next.prev = null
                        this.head = curr.next
                    } else if(curr.data.date == this.tail.data.date) {
                        curr.prev.next = null
                        this.tail = curr.prev
                    } else {
                        curr.prev.next = curr.next
                        curr.next.prev = curr.prev
                    }
                    curr = null
                } else {
                    curr = curr.next;   
                }
            }
        }
    }
}

export const useCounterStore = defineStore('tasks', () => {
  const count = ref(0)
  let dll = new DoubleNode()
  const tasks = ref([])

  if(!localStorage.todoTasks) {
    localStorage.todoTasks = JSON.stringify(tasks.value)
  } else {
    tasks.value = JSON.parse(localStorage.todoTasks)
  }

  if(tasks.value.length) {
    tasks.value.forEach((element) => {
        dll.addItem(element)
    })
  }

  function display() {
    dll.display()
  }
  function isEmpty() {
    return dll.isEmpty()
  }
  function createTask(task) {
    let arr = []
    dll.addItem(task)
    if(!dll.isEmpty()) {
        let item = dll.head
        while(item != null) {
            arr.push(item.data)
            item = item.next
        }
    }
    tasks.value = arr
    localStorage.todoTasks = JSON.stringify(tasks.value)
  }
  function deleteTask(date) {
    let arr = []
    dll.deleteItem(date)
    if(!dll.isEmpty()) {
        let item = dll.head
        while(item != null) {
            arr.push(item.data)
            item = item.next
        }
    }
    tasks.value = arr
    localStorage.todoTasks = JSON.stringify(tasks.value)
  }
  function complete(date) {
    let arr = []
    dll.complete(date)
    if(!dll.isEmpty()) {
        let item = dll.head
        while(item != null) {
            arr.push(item.data)
            item = item.next
        }
    }
    tasks.value = arr
    localStorage.todoTasks = JSON.stringify(tasks.value)
  }

  return { count, tasks, createTask, deleteTask, isEmpty, complete, display }
})
