// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'sometoken'

// GET REQUEST
function getTodos() {
  console.log("GET Request");
  axios
    .get("https://jsonplaceholder.typicode.com/todos/", {
      params: { _limit: 5 },
    })
    .then((res) => showOutput(res))
    .catch((e) => console.log(e));
}

// POST REQUEST
function addTodo() {
  console.log("POST Request");
  axios
    .post("https://jsonplaceholder.typicode.com/todos/", {
      data: { title: "New Todo", completed: false },
    })
    .then((res) => showOutput(res))
    .catch((e) => console.log(e));
}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log("PUT/PATCH Request");
  axios
    .put("https://jsonplaceholder.typicode.com/todos/1", {
      title: "Updated Todo",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((e) => console.log(e));
}

// DELETE REQUEST
function removeTodo() {
  console.log("DELETE Request");
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => showOutput(res))
    .catch((e) => console.log(e));
}

// SIMULTANEOUS DATA
function getData() {
  console.log("Simultaneous Request");
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
    ])
    .then((res) => {
      console.log(res);
      showOutput(res[1]);
    });
}

// CUSTOM HEADERS
function customHeaders() {
  console.log("Custom Headers");
  const config = {
    headers : {
      'Content-Type' : 'application/json',
      Authorization : 'sometoken'
    }
  }
  axios
  .post("https://jsonplaceholder.typicode.com/todos/", {
    data: { title: "New Todo", completed: false },
    config
  })
  .then((res) => showOutput(res))
  .catch((e) => console.log(e));

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log("Transform Response");
  const options ={
    method : 'post',
    url : 'https://jsonplaceholder.typicode.com/todos/',
    data: { title: "Hello Todo", completed: false },
    transformResponse : axios.defaults.transformResponse.concat(data=>{
      data.title = data.title.toUpperCase()
      return data
    })
  }

  axios(options).then(res=>showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  console.log("Error Handling");
  axios
  .get("https://jsonplaceholder.typicode.com/todoss", {
    params: { _limit: 5 },
  })
  .then((res) => showOutput(res))
  .catch((e) =>{
    if(e.response){
      // server responded with a status other than 200 range
      console.log(e.response.data)
      console.log(e.response.status)
      console.log(e.response.headers)

      if(e.response.status == 404){
        alert('Error : page not found')
      }
      else if(e.request){
        // request was made but no response
        console.error(e.request)
      }
      else console.error(e.message)

    }
  });
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");

  const source = axios.CancelToken.source()
  axios
  .get("https://jsonplaceholder.typicode.com/todos", {
    cancelToken : source.token
  })
  .then((res) => showOutput(res))
  .catch(thrown=>{
    if(axios.isCancel(thrown)){
      console.log('Request canceled' , thrown.message);
    }
  })
  if(true) source.cancel('Request canceled!!')
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request send to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (e) => {
    return Promise.reject(e);
  }
);

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL : 'https://jsonplaceholder.typicode.com'
})
axiosInstance.get('comments').then(res=>console.log('Instance comments' ,res))

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
