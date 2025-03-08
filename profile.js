
let page = 1;
let lastpage = 1;

// pagination
window.addEventListener("scroll", ()=>{
const endOfPage = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
if(endOfPage && lastpage > page){
    page++;
    getposts(page);
}
});

// end of infinte scroll //
navbarsetup();

function getposts(page = 1){
    toggleloader(true)
    axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=5&page=${page}`)
    .then((response) => {
        let posts =  response.data.data;
        lastpage = response.data.meta.last_page;
        for(let post of posts){
            let tags = ``;
            for(let tag of post.tags){
                tags += `<span class="text-light bg-secondary rounded p-1 mx-1">${tag.name}</span>`
            }
            let author = post.author;
            let user = getcurrentuser()
            let isMyPost = user != null && user == post.author.username;
            let editbuttoncontent =``;
            let deletebuttoncontent = ``;
            if(isMyPost){
                editbuttoncontent = `<button style="float:right;" class="btn btn-secondary" onclick="editpost('${encodeURIComponent(JSON.stringify(post))}')">Edit</button>`
                deletebuttoncontent = `<button style="float:right;" class="btn btn-danger mx-2" onclick="deletepost('${encodeURIComponent(JSON.stringify(post))}')">Delete</button>`
            }
            let theprofile = typeof author.profile_image == "string" ? author.profile_image : "profiles/1.jpg";
            let thepost = typeof post.image == "string" ? post.image : "photos/1.jpg";
            
            let content = ` <div class="card shadow my-3" style="cursor: pointer;">
            <div class="card-header">
            <img src= ${theprofile} class="rounded-circle border border-2" style="width: 50px; height: 50px;">
            <span style="font-weight: 700;" class="text-primary-emphasis"> @${author.username}</span>
            ${editbuttoncontent}
            ${deletebuttoncontent}
            </div>
            <div class="card-body" onclick="postdetails(${post.id})">
            <img src="${thepost}" class="w-100 img-fluid" style="max-height: 400px; object-fit: cover;">
            <h6 class="text-secondary mt-2">${post.created_at}</h6>
            <h5>${post.title !== null ? post.title :" "}</h5>
            <p>${post.body}</p>
            <hr class="solid">
            <div>
            <i class="bi bi-pen"></i>
            <span><b>(${post.comments_count})</b> Comments</span>
            ${tags}
            </div>
            </div>
            </div>`
            document.querySelector("#posts").innerHTML += content;
        }
    }).finally(()=>{
        toggleloader(false)
    })
}

function createNewPost() {
        let postid = document.getElementById("post-id-input").value;
        let isCreate = postid == null || postid =="";
        const title = document.querySelector("#postTitle").value.trim();
        const body = document.querySelector("#postBody").value.trim();
        const image = document.getElementById("postImage").files[0] ||null;

        let formdata = new FormData();
        formdata.append("body", body);
        formdata.append("image", image);
        formdata.append("title", title);
        let url = '';
        
        let token = localStorage.getItem("token");
        token = token.replace(/^"(.*)"$/, '$1');
        
        const headerss = {
            "Authorization": `Bearer ${token}`
        };

        if(isCreate){
            url = `https://tarmeezacademy.com/api/v1/posts`
        }else{
            formdata.append("_method","put")
            url = `https://tarmeezacademy.com/api/v1/posts/${postid}`
        }
        toggleloader(true)
        axios.post(url, formdata, { headers: headerss }
        ).then((response) => {
            const modalinstance = bootstrap.Modal.getInstance(document.querySelector("#postModal"))
            modalinstance.hide();
            showLoginAlert(response.data.message,'success');
            setTimeout(()=>{
                window.location.reload()
            },3000)
        }).catch((error) => {
            showLoginAlert(error.response.data.message,'danger');
        }).finally(()=>{
            toggleloader(false)
        })


}

function loginclicked(){
    const username = document.querySelector("#username_input").value;
    const passowrd = document.querySelector("#password_input").value;
    
    const json = {
        "username":username,
        "password":passowrd
    }
    toggleloader(true);
    axios.post("https://tarmeezacademy.com/api/v1/login", json).
    then((response)=>{
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('user', JSON.stringify(response.data.user.username));
        localStorage.setItem('image', JSON.stringify(response.data.user.profile_image));
        localStorage.setItem('id', JSON.stringify(response.data.user.id));
        const modalinstance = bootstrap.Modal.getInstance(document.querySelector("#loginModal"))
        modalinstance.hide();
        showLoginAlert("You are logged in Successfully !", "success");
        setTimeout(()=>{
            window.location.reload()
            navbarsetup();
        }, 2000)
    })
    .catch((error)=>{
        console.log("Sorry! there is an error here:" + error);
    }).finally(()=>{
        toggleloader(false);
    })
}

function Registerclicked(){
    const username = document.querySelector("#register_username_input").value;
    const passowrd = document.querySelector("#register_password_input").value;
    const name = document.querySelector("#register_name_input").value;
    const profilePhoto = document.querySelector("#profilePhoto").files[0]|| null;

    let formdata = new FormData()
    formdata.append("name", name)
    formdata.append("username", username)
    formdata.append("password", passowrd)
    formdata.append("image", profilePhoto)
    toggleloader(true);
    axios.post("https://tarmeezacademy.com/api/v1/register", formdata).
    then((response)=>{
        localStorage.setItem('token', JSON.stringify(response.data.token));
        localStorage.setItem('user', JSON.stringify(response.data.user.username));
        localStorage.setItem('image', JSON.stringify(response.data.user.profile_image));
        localStorage.setItem('id', JSON.stringify(response.data.user.id));s
        const modalinstance = bootstrap.Modal.getInstance(document.querySelector("#registerModal"))
        modalinstance.hide();
        showLoginAlert("New User Registered Successfully !", "success");
        setTimeout(()=>{
            window.location.reload()
            navbarsetup();
        }, 2000)
    })
    .catch((error)=>{
        showLoginAlert(error.response.data.message, 'danger')
    }).finally(()=>{
        toggleloader(false)
    })
}

function navbarsetup(){
    const token = localStorage.getItem("token");
    const logoutButton = document.getElementById("logout_button");
    const loginButton = document.getElementById("login_button");
    const registerButton = document.getElementById("register_button");
    const addButton = document.getElementById("addButton");
    const userprofile = document.getElementById("userprofile");
    
    if(token === null){// user is not logged in;
        loginButton.style.visibility = "visible";
        registerButton.style.visibility = "visible";
        logoutButton.style.display = "none";
        addButton.style.display = "none";
        userprofile.style.display = "none";

    }else{ // user is logged in
        loginButton.style.visibility = "hidden";
        registerButton.style.visibility = "hidden";
        logoutButton.style.display = "block";
        addButton.style.display = "block";
        let theimage = localStorage.getItem("image");
        if (theimage) {
            try {
                theimage = JSON.parse(theimage);
                if (typeof theimage !== "string" || theimage.trim() === "") {
                    theimage = "profiles/2.jpg";
                }
            } catch (error) {
                theimage = "profiles/2.jpg";
            }
            document.getElementById("userimage").src = theimage;
        }

        document.getElementById("theusername").innerHTML = getcurrentuser();
    }
}

function getcurrentuser(){
    let user = null
    let storageuser = localStorage.getItem('user');
    if(storageuser !=null){
        user = JSON.parse(storageuser);
    }

    return user;
}

function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("image");
    localStorage.removeItem("id");
    showLoginAlert("You are logged out Successfully !",'danger');
    navbarsetup();
}

function showLoginAlert(theMessage, state){

    const alertPlaceholder = document.getElementById('myalert')
    const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
    }
        appendAlert(theMessage, state)

}

function newcomment(id) {
    let commentbody = document.getElementById("commentinput").value;
    let param = {
    "body": commentbody
    } 
    let token = localStorage.getItem("token").replace(/^"(.*)"$/, '$1');
    toggleloader(true)
    axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}/comments`, param,
    { headers:
            {"Authorization": `Bearer ${token}`}
    }).then((response)=>{
        showLoginAlert("Your comment is added Successfully!",'success');
        setTimeout(()=>{
            window.location.reload();
        },2000)
    }).catch((error)=>{
        showLoginAlert(error.response.data.message,'danger');
    }).finally(()=>{
        toggleloader(false)
    })
}

function editpost(post){
    let thepost = JSON.parse(decodeURIComponent(post))
    document.getElementById("post-modal-submit-btn").innerHTML = "Update"
    document.getElementById("post-id-input").value = thepost.id
    document.getElementById("modalTitle").innerHTML = "Edit Post";
    document.getElementById("postTitle").value = thepost.title;
    document.getElementById("postBody").value = thepost.body;
    let postModal = new bootstrap.Modal(document.getElementById("postModal"), {})
    postModal.toggle()
}

function createPostClicked(){
    document.getElementById("post-modal-submit-btn").innerHTML = "Create";
    document.getElementById("post-id-input").value = "";
    document.getElementById("modalTitle").innerHTML = "Create New Post";
    document.getElementById("postTitle").value = '';
    document.getElementById("postBody").value = '';
}

function deletepost(post){
    let thepost = JSON.parse(decodeURIComponent(post))
    document.getElementById("deleteIdInput").value = thepost.id;
    let postModal = new bootstrap.Modal(document.getElementById("deleteModal"), {})
    postModal.toggle()
}

function confirmDelete(){
    let id = document.getElementById("deleteIdInput").value;
    let url = `https://tarmeezacademy.com/api/v1/posts/${id}`

    let token = localStorage.getItem("token");
    token = token.replace(/^"(.*)"$/, '$1');
    const headerss = {
        "Authorization": `Bearer ${token}`
    };
    
    axios.delete(url,{headers:headerss})
    .then((response)=>{
        console.log(response);
        const modalinstance = bootstrap.Modal.getInstance(document.querySelector("#deleteModal"))
        modalinstance.hide();
        showLoginAlert("the post has been deleted successfully!", "success");
        setTimeout(()=>{
            window.location.reload()
        },3000)
    })
    .catch((error)=>{
        showLoginAlert(error.response.data.message, "danger");
    })
}







function postdetails(id){
    window.open(`postdetails.html?postId=${id}`,'blank');
}

function getusercurrentid(){
    const urlparameter = new URLSearchParams(window.location.search);
    let id = urlparameter.get("userid");
    return id;
}

function getprofiledata(){
    const id = getusercurrentid();
    toggleloader(true)
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
    .then((response) => {
        const user = response.data.data;
        document.getElementById("userEmail").innerHTML = user.email;
        document.getElementById("userName").innerHTML = user.name;
        document.getElementById("userUsername").innerHTML = user.username;
        document.getElementById("postsCount").innerHTML = user.posts_count;
        document.getElementById("commentsCount").innerHTML = user.comments_count;
        document.getElementById("headerimages").src = user.profile_image;
        document.getElementById("namePosts").innerHTML = user.username;
    }).finally(()=>{
        toggleloader(false)
    })
}
getprofiledata()




function getposts(){
    const id=getusercurrentid();
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
    .then((response) => {
        let posts =  response.data.data;
        document.getElementById("userPosts").innerHTML = ``;
        for(let post of posts){
            let tags = ``;
            for(let tag of post.tags){
                tags += `<span class="text-light bg-secondary rounded p-1 mx-1">${tag.name}</span>`
            }
            let author = post.author;
            let user = getcurrentuser()
            let isMyPost = user != null && user == post.author.username;
            let editbuttoncontent =``;
            let deletebuttoncontent = ``;
            if(isMyPost){
                editbuttoncontent = `<button style="float:right;" class="btn btn-secondary" onclick="editpost('${encodeURIComponent(JSON.stringify(post))}')">Edit</button>`
                deletebuttoncontent = `<button style="float:right;" class="btn btn-danger mx-2" onclick="deletepost('${encodeURIComponent(JSON.stringify(post))}')">Delete</button>`
            }
            let theprofile = typeof author.profile_image == "string" ? author.profile_image : "profiles/1.jpg";
            let thepost = typeof post.image == "string" ? post.image : "photos/1.jpg";
            
            let content = ` <div class="card shadow my-3" style="cursor: pointer;">
            <div class="card-header">
            <img src= ${theprofile} class="rounded-circle border border-2" style="width: 50px; height: 50px;">
            <span style="font-weight: 700;" class="text-primary-emphasis"> @${author.username}</span>
            ${editbuttoncontent}
            ${deletebuttoncontent}
            </div>
            <div class="card-body" onclick="postdetails(${post.id})">
            <img src="${thepost}" class="w-100 img-fluid" style="max-height: 400px; object-fit: cover;">
            <h6 class="text-secondary mt-2">${post.created_at}</h6>
            <h5>${post.title !== null ? post.title :" "}</h5>
            <p>${post.body}</p>
            <hr class="solid">
            <div>
            <i class="bi bi-pen"></i>
            <span><b>(${post.comments_count})</b> Comments</span>
            ${tags}
            </div>
            </div>
            </div>`
            document.querySelector("#userPosts").innerHTML += content;
        }
    })
}

getposts();


function getcurrentuserid(){
    let storageuserid = localStorage.getItem('id');
    return storageuserid;
}


function userclickedprofile(id){
    window.location = `profile.html?userid=${id}`
}

function myprofileclicked(){
    let myid= getcurrentuserid();
    window.location = `profile.html?userid=${myid}`
}


function toggleloader(show=true){
    if(show){
        document.getElementById("loader").style.visibility="visible";
    }else{
        document.getElementById("loader").style.visibility="hidden";
    }
}